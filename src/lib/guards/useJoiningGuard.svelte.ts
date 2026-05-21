/**
 * useJoiningGuard — composable for the R&O joining flow.
 *
 * Integrates with the canonical Holo joining-service pathway:
 *   https://github.com/Holo-Host/joining-service
 *
 * R&O uses the joining-service + hc-auth-server, configured with the
 * hc_auth_approval auth method. Admin approval is mediated through the
 * hc-auth state machine (pending -> authorized -> blocked). Cryptographic
 * admittance is via membrane proofs signed by the joining-service's
 * ed25519 signing key, whose public key is burned into the R&O DNA
 * properties as the progenitor and validated at genesis_self_check.
 *
 * FLOW (per spec sections 3.2 - 3.5)
 *   1. Client generates AgentPubKey (lair-keystore)
 *   2. POST /v1/join { agent_key, claims } -> session + status
 *   3. If status === "pending", poll GET /v1/join/{session}/status until
 *      hc-auth transitions agent to "authorized" (status becomes "ready")
 *   4. GET /v1/join/{session}/provision -> membrane_proofs, linker_urls,
 *      happ_bundle_url, dna_modifiers
 *   5. Install hApp with provision data; genesis_self_check validates
 *      the membrane proof against the DNA's embedded progenitor
 *   6. R&O-internal: rules attestation on first sign-in
 *
 * CUSTOM CLAIMS (LOAD-BEARING ASSUMPTION)
 *   The spec types `claims` as Record<string, string> (spec section 9)
 *   and the documented `hc_auth.forward_claims` config forwards named
 *   claim keys to hc-auth as metadata. The spec's claim table only
 *   enumerates email/phone/evm_address/solana_address/invite_code — it
 *   does not explicitly document x_* prefixed custom keys. R&O assumes
 *   x_introduction, x_why_here, x_user_type, x_given_name, x_family_name,
 *   x_nickname will be accepted and forwarded; this MUST be confirmed
 *   with Holo before any production deployment. If custom claims do not
 *   work, R&O's pre-membership application data needs a different home
 *   (out-of-band admin tool, delegated_verification partner, etc.) and
 *   the claims form on the mockup needs redesign.
 *
 * REVOCATION
 *   Member suspension is sourced from hc-auth state. When hc-auth marks
 *   an agent "blocked", the joining-service returns 403 agent_revoked
 *   on /provision and /reconnect. The composable surfaces this as
 *   member-suspended after the agent is already bound.
 *
 * RULES ATTESTATION
 *   R&O-internal post-membership concern. Happens on the main R&O DHT
 *   after install. Separate from the joining-service flow.
 *
 * IDENTITY IMMUTABILITY
 *   After binding, x_given_name and x_family_name (and the mononym
 *   sentinel) are locked. x_nickname, bio, email, x_user_type remain
 *   editable on the main R&O DHT.
 *
 * THIS IS A MOCK IMPLEMENTATION for the design-system pass.
 * Methods are stubs that mimic the joining-service REST API. Real
 * implementation replaces each method body with the corresponding
 * fetch() call to the joining-service base URL.
 */

// ============================================================================
// TYPES (mirror spec section 9: TypeScript Type Definitions)
// ============================================================================

/** Spec-defined auth methods. */
export type AuthMethod =
  | "open"
  | "email_code"
  | "sms_code"
  | "evm_signature"
  | "solana_signature"
  | "invite_code"
  | "agent_allow_list"
  | "hc_auth_approval"
  | "delegated_verification"
  | `x-${string}`;

/** OR-group of auth methods. */
export type AuthMethodGroup = { any_of: AuthMethod[] };

/** Either a single method or an OR-group. */
export type AuthMethodEntry = AuthMethod | AuthMethodGroup;

/** Session status (spec section 3.2). */
export type JoinStatus = "ready" | "pending" | "rejected";

/** A single verification challenge (spec section 9). */
export type Challenge = {
  id: string;
  type: AuthMethod;
  description: string;
  expires_at?: string;
  metadata?: Record<string, unknown>;
  completed?: boolean;
  /** Challenges sharing the same group are OR alternatives. */
  group?: string;
};

/** Session record returned by POST /v1/join (spec section 9). */
export type JoinSession = {
  session: string;
  status: JoinStatus;
  challenges?: Challenge[];
  reason?: string;
  poll_interval_ms?: number;
};

/** Provision data returned by GET /v1/join/{session}/provision (spec section 9). */
export type JoinProvision = {
  /** Each entry may carry its own expires_at. */
  linker_urls?: { url: string; expires_at?: string }[];
  /** Map of DnaHash (base64) to base64-encoded msgpack membrane proof. */
  membrane_proofs?: Record<string, string>;
  happ_bundle_url?: string;
  dna_modifiers?: {
    network_seed?: string;
    properties?: Record<string, unknown>;
  };
  /** Network service URLs for conductor configuration. */
  network_config?: {
    auth_server_url?: string;
    bootstrap_url?: string;
    relay_url?: string;
  };
};

// ============================================================================
// R&O-INTERNAL TYPES (post-membership; not part of the joining-service spec)
// ============================================================================

/** R&O status_type values (mirrors administration.schemas.ts in the main repo). */
export type StatusType =
  | "pending"
  | "accepted"
  | "rejected"
  | "archived"
  | "suspended temporarily"
  | "suspended indefinitely";

/** Mirror of StatusInDHT from R&O administration.schemas.ts. */
export type StatusInDHT = {
  status_type: StatusType;
  reason?: string;
  suspended_until?: string;
  created_at?: number;
  updated_at?: number;
};

/** Currently active rules version (lives on the main R&O DHT). */
export type RulesVersion = {
  version: string;
  document_hash: string;
  effective_from: number;
  changelog: string[];
};

// ============================================================================
// COMPOSABLE STATE UNION
// ============================================================================

/**
 * Composable state union — eleven states.
 *
 *   unknown                  -- async resolution gap on first render
 *   unauthenticated          -- no agent key generated yet
 *   join-pending             -- POST /v1/join returned status: "pending"
 *                               (one or more challenges await; for
 *                               hc_auth_approval the challenge is the
 *                               operator-decision poll)
 *   join-rejected            -- status: "rejected" OR agent_revoked
 *   join-ready               -- status: "ready"; /provision not yet called
 *   provisioning             -- /provision in flight; installing hApp
 *   binding-needs-password   -- install done; lair-keystore needs a
 *                               password set this session
 *   instance-locked          -- lair password is set; not unlocked this
 *                               session
 *   member-suspended         -- hc-auth marked agent "blocked" after
 *                               binding; surfaced via 403 agent_revoked
 *   rules-stale              -- R&O-internal; user has not attested to
 *                               current rules version
 *   authenticated            -- bound, currently authorised, attesting
 *                               to current rules
 */
export type JoiningStatus =
  | "unknown"
  | "unauthenticated"
  | "join-pending"
  | "join-rejected"
  | "join-ready"
  | "provisioning"
  | "binding-needs-password"
  | "instance-locked"
  | "member-suspended"
  | "rules-stale"
  | "authenticated";

// ============================================================================
// CLAIMS DATA (R&O's applicant form payload)
// ============================================================================

/**
 * Data the applicant submits via the join-form screen.
 *
 * These map to the `claims` field on POST /v1/join. The x_* prefixed
 * keys are custom claims forwarded to hc-auth as metadata (load-bearing
 * assumption — see docstring).
 *
 * `email` is also in `claims` because it satisfies email_code or
 * email_verification if used.
 */
export type ClaimsData = {
  email: string;
  x_given_name: string;
  x_family_name: string;
  x_nickname: string;
  x_user_type: "advocate" | "creator";
  x_introduction: string;
  /** Optional, if the hApp is configured with invite_code auth. */
  invite_code?: string;
};

/** Convert ClaimsData to the wire-format claims object. */
function toClaimsPayload(data: ClaimsData): Record<string, string> {
  const claims: Record<string, string> = {
    email: data.email,
    x_given_name: data.x_given_name,
    x_family_name: data.x_family_name,
    x_nickname: data.x_nickname,
    x_user_type: data.x_user_type,
    x_introduction: data.x_introduction
  };
  if (data.invite_code) {
    claims.invite_code = data.invite_code;
  }
  return claims;
}

// ============================================================================
// COMPOSABLE INTERFACE
// ============================================================================

export type UseJoiningGuardOptions = {
  autoCheck?: boolean;
};

export type UseJoiningGuard = {
  // ---- core state ----
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly status: JoiningStatus;
  readonly nextRoute: string;

  // ---- joining-service session lifecycle ----
  readonly claimsData: ClaimsData | null;
  readonly joinSession: JoinSession | null;
  readonly joinProvision: JoinProvision | null;

  // ---- R&O-internal post-membership ----
  readonly memberStatus: StatusInDHT | null;
  readonly currentRules: RulesVersion | null;
  readonly userLastAttestedVersion: string | null;

  // ---- methods (joining-service REST API + local lair operations) ----
  /** POST /v1/join — submits agent_key + claims, returns session. */
  submitJoinRequest: (data: ClaimsData) => Promise<void>;
  /** GET /v1/join/{session}/status — polls for hc-auth decision. */
  pollSessionStatus: () => Promise<void>;
  /** GET /v1/join/{session}/provision — fetches membrane proof + install data. */
  fetchProvision: () => Promise<void>;
  /** Local: set lair-keystore password for first time. */
  setInstancePassword: (password: string) => Promise<void>;
  /** Local: continue without lair password (passwordMode=optional). */
  skipInstancePassword: () => Promise<void>;
  /** Local: unlock lair-keystore for this session. */
  unlockInstance: (email: string, password: string) => Promise<void>;
  /** R&O-internal: attest to current rules version on main DHT. */
  attestCurrentRules: () => Promise<void>;
  /** Re-run state detection. */
  retry: () => Promise<void>;
  /** Clear all state, return to unauthenticated. */
  reset: () => void;

  // ---- demo-only escape hatch ----
  __setStatusForDemo: (status: JoiningStatus, opts?: { memberStatus?: StatusInDHT }) => void;
};

// ============================================================================
// ROUTE MAPPING
// ============================================================================

function routeForStatus(status: JoiningStatus): string {
  switch (status) {
    case "unknown":
      return "access-issue";
    case "unauthenticated":
      return "join-welcome";
    case "join-pending":
      return "join-pending";
    case "join-rejected":
      return "join-rejected";
    case "join-ready":
      return "join-approved";
    case "provisioning":
      return "join-approved";
    case "binding-needs-password":
      return "join-set-password";
    case "instance-locked":
      return "password-gate";
    case "member-suspended":
      return "member-suspended";
    case "rules-stale":
      return "rules-reattestation";
    case "authenticated":
      return "home";
  }
}

// ============================================================================
// MOCK DEFAULTS (overridden by __setStatusForDemo)
// ============================================================================

const MOCK_RULES_V1: RulesVersion = {
  version: "1.0.0",
  document_hash: "uhCAk_mock_rules_v1_hash",
  effective_from: Date.parse("2026-05-01T00:00:00Z"),
  changelog: [
    "Added explicit policy on respectful communication across cultural difference",
    "Clarified the harassment reporting process",
    "Added Consequences Ladder (Correction / Warning / Temporary Ban / Permanent Ban)"
  ]
};

const MOCK_SUSPENDED_TEMP: StatusInDHT = {
  status_type: "suspended temporarily",
  reason: "Sustained disruption of discussion across multiple threads.",
  suspended_until: "2026-06-15T00:00:00Z",
  created_at: Date.parse("2026-05-18T14:30:00Z"),
  updated_at: Date.parse("2026-05-18T14:30:00Z")
};

const MOCK_CLAIMS_DATA: ClaimsData = {
  email: "sam@example.org",
  x_given_name: "Sam",
  x_family_name: "Turner",
  x_nickname: "sam",
  x_user_type: "creator",
  x_introduction: "Mutual-aid practitioner exploring sovereign infrastructure."
};

// ============================================================================
// COMPOSABLE
// ============================================================================

export function useJoiningGuard(options: UseJoiningGuardOptions = {}): UseJoiningGuard {
  const { autoCheck = false } = options;

  // ---- state ----
  let isLoading = $state(false);
  let error = $state<string | null>(null);
  let status = $state<JoiningStatus>("unauthenticated");

  let claimsData = $state<ClaimsData | null>(null);
  let joinSession = $state<JoinSession | null>(null);
  let joinProvision = $state<JoinProvision | null>(null);

  let memberStatus = $state<StatusInDHT | null>(null);
  let currentRules = $state<RulesVersion | null>(MOCK_RULES_V1);
  let userLastAttestedVersion = $state<string | null>(null);

  // ---- derived ----
  const nextRoute = $derived(routeForStatus(status));

  // ---- methods ----

  async function submitJoinRequest(data: ClaimsData): Promise<void> {
    // MOCK: Real implementation calls:
    //   const agentKey = await generateAgentPubKey();  // lair-keystore
    //   const res = await fetch(`${SERVICE_URL}/v1/join`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       agent_key: agentKey,
    //       claims: toClaimsPayload(data),
    //     }),
    //   });
    //   joinSession = await res.json();
    isLoading = true;
    error = null;
    try {
      claimsData = data;
      // Mocked spec-shaped response: hc_auth_approval returns
      // status: "pending" with a single challenge of type
      // "hc_auth_approval", description "Awaiting approval".
      joinSession = {
        session: "js_mock_" + Date.now().toString(36),
        status: "pending",
        challenges: [
          {
            id: "ch_hc_approval_1",
            type: "hc_auth_approval",
            description: "Awaiting community approval",
            completed: false
          }
        ],
        poll_interval_ms: 2000
      };
      status = "join-pending";
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to submit join request.";
      status = "unknown";
    } finally {
      isLoading = false;
    }
  }

  async function pollSessionStatus(): Promise<void> {
    // MOCK: Real implementation calls:
    //   const res = await fetch(`${SERVICE_URL}/v1/join/${joinSession.session}/status`);
    //   const updated = await res.json();
    //   joinSession = { ...joinSession, ...updated };
    //   if (updated.status === "ready") status = "join-ready";
    //   if (updated.status === "rejected") status = "join-rejected";
    isLoading = true;
    error = null;
    try {
      if (!joinSession) throw new Error("No active join session to poll.");
      // For mock: no-op. __setStatusForDemo drives transitions in demo mode.
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to poll session status.";
    } finally {
      isLoading = false;
    }
  }

  async function fetchProvision(): Promise<void> {
    // MOCK: Real implementation calls:
    //   const res = await fetch(`${SERVICE_URL}/v1/join/${joinSession.session}/provision`);
    //   joinProvision = await res.json();
    //   // Then: install the hApp via conductor admin API, passing
    //   // membrane_proofs from joinProvision into install-app
    //   // roles-settings (per CLI.md). genesis_self_check validates
    //   // the proof against the DNA progenitor at install time.
    isLoading = true;
    error = null;
    status = "provisioning";
    try {
      if (!joinSession || joinSession.status !== "ready") {
        throw new Error("Cannot fetch provision: session is not ready.");
      }
      // Simulate fetch + install latency.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      joinProvision = {
        membrane_proofs: {
          uhC0k_mock_requests_offers_dna_hash: "gqNzaWdtb2NrLW1lbWJyYW5lLXByb29mLXBheWxvYWQ="
        },
        happ_bundle_url: "https://example.org/requests-and-offers.happ",
        dna_modifiers: {
          network_seed: "ro-mainnet-2026"
        }
      };
      memberStatus = {
        status_type: "accepted",
        created_at: Date.now(),
        updated_at: Date.now()
      };
      // Post-install: rules attestation happens before reaching authenticated.
      userLastAttestedVersion = currentRules?.version ?? null;
      status = "binding-needs-password";
    } catch (err) {
      error = err instanceof Error ? err.message : "Provisioning failed.";
      // Rollback to retry-able state.
      status = "join-ready";
    } finally {
      isLoading = false;
    }
  }

  async function setInstancePassword(password: string): Promise<void> {
    // MOCK: lair-keystore is encrypted with password on this device.
    // Real implementation: IPC to Kangaroo main process to set lair password.
    isLoading = true;
    error = null;
    try {
      if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }
      status = "authenticated";
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to set password.";
    } finally {
      isLoading = false;
    }
  }

  async function skipInstancePassword(): Promise<void> {
    // MOCK: passwordMode=optional skip path. Lair keystore stored unencrypted.
    isLoading = true;
    error = null;
    try {
      status = "authenticated";
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to continue.";
    } finally {
      isLoading = false;
    }
  }

  async function unlockInstance(email: string, password: string): Promise<void> {
    // MOCK: lair-keystore unlock.
    // Real implementation: IPC to Kangaroo to unlock lair with password.
    isLoading = true;
    error = null;
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      // Mock failure for demo purposes if password is literally "wrong".
      if (password === "wrong") {
        throw new Error("That email and password did not unlock Requests & Offers.");
      }
      status = "authenticated";
    } catch (err) {
      error = err instanceof Error ? err.message : "Unlock failed.";
    } finally {
      isLoading = false;
    }
  }

  async function attestCurrentRules(): Promise<void> {
    // MOCK: R&O-internal, post-membership.
    // Real implementation: callZome to R&O main coordinator, commits a
    // RulesAttestation entry on the main DHT referencing the current
    // rules document hash and version.
    isLoading = true;
    error = null;
    try {
      if (!currentRules) throw new Error("No current rules to attest.");
      userLastAttestedVersion = currentRules.version;
      status = "authenticated";
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to attest rules.";
    } finally {
      isLoading = false;
    }
  }

  async function retry(): Promise<void> {
    // MOCK: re-run state detection.
    // Real implementation: check lair status, poll joining-service if a
    // session exists, query main R&O DHT for member + rules state.
    isLoading = true;
    error = null;
    try {
      if (status === "unknown") status = "unauthenticated";
    } finally {
      isLoading = false;
    }
  }

  function reset(): void {
    isLoading = false;
    error = null;
    status = "unauthenticated";
    claimsData = null;
    joinSession = null;
    joinProvision = null;
    memberStatus = null;
    userLastAttestedVersion = null;
  }

  function __setStatusForDemo(
    newStatus: JoiningStatus,
    opts: { memberStatus?: StatusInDHT } = {}
  ): void {
    // Demo escape hatch for the FAB control. Sets status and optionally
    // seeds member-status mock data for the member-suspended screen.
    // Setting to "unauthenticated" also clears session state so the
    // demo can be re-run cleanly without F5'ing the browser.
    if (newStatus === "unauthenticated") {
      reset();
      return;
    }
    status = newStatus;
    error = null;
    if (newStatus === "member-suspended") {
      memberStatus = opts.memberStatus ?? MOCK_SUSPENDED_TEMP;
    }
    if (newStatus === "rules-stale") {
      userLastAttestedVersion = "0.9.0";
    }
    // Statuses that imply a session + (sometimes) provision is already
    // on hand: seed the prior state so direct jumps in the demo do not
    // throw.
    const needsSession: JoiningStatus[] = [
      "join-pending",
      "join-rejected",
      "join-ready",
      "provisioning",
      "binding-needs-password",
      "instance-locked",
      "member-suspended",
      "rules-stale",
      "authenticated"
    ];
    if (needsSession.includes(newStatus)) {
      if (!claimsData) claimsData = MOCK_CLAIMS_DATA;
      if (!joinSession) {
        const sessionStatus: JoinStatus =
          newStatus === "join-rejected"
            ? "rejected"
            : newStatus === "join-pending"
              ? "pending"
              : "ready";
        joinSession = {
          session: "js_mock_demo",
          status: sessionStatus,
          ...(newStatus === "join-rejected"
            ? { reason: "Application not accepted at this time." }
            : newStatus === "join-pending"
              ? {
                  challenges: [
                    {
                      id: "ch_hc_approval_demo",
                      type: "hc_auth_approval",
                      description: "Awaiting community approval",
                      completed: false
                    }
                  ],
                  poll_interval_ms: 2000
                }
              : {})
        };
      }
    }
    const needsProvision: JoiningStatus[] = [
      "binding-needs-password",
      "instance-locked",
      "member-suspended",
      "rules-stale",
      "authenticated"
    ];
    if (needsProvision.includes(newStatus) && !joinProvision) {
      joinProvision = {
        membrane_proofs: {
          uhC0k_mock_requests_offers_dna_hash: "gqNzaWdtb2NrLW1lbWJyYW5lLXByb29mLXBheWxvYWQ="
        },
        happ_bundle_url: "https://example.org/requests-and-offers.happ",
        dna_modifiers: { network_seed: "ro-mainnet-2026" }
      };
    }
  }

  // ---- lifecycle ----
  if (autoCheck) {
    // Real implementation: query lair status + active joining-service
    // session (if cached) + main R&O DHT member state. For mock: no-op,
    // defaults to "unauthenticated".
  }

  // ---- return ----
  return {
    get isLoading() {
      return isLoading;
    },
    get error() {
      return error;
    },
    get status() {
      return status;
    },
    get nextRoute() {
      return nextRoute;
    },
    get claimsData() {
      return claimsData;
    },
    get joinSession() {
      return joinSession;
    },
    get joinProvision() {
      return joinProvision;
    },
    get memberStatus() {
      return memberStatus;
    },
    get currentRules() {
      return currentRules;
    },
    get userLastAttestedVersion() {
      return userLastAttestedVersion;
    },
    submitJoinRequest,
    pollSessionStatus,
    fetchProvision,
    setInstancePassword,
    skipInstancePassword,
    unlockInstance,
    attestCurrentRules,
    retry,
    reset,
    __setStatusForDemo
  };
}
