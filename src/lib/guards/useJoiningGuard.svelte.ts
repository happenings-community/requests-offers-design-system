/**
 * useJoiningGuard — Layer 0/1 composable for the R&O joining flow.
 *
 * Handles the pre-membership-to-bound-and-unlocked lifecycle:
 *   - Layer 0 (hard membrane): lobby DHT presence, application status, membrane proof
 *   - Layer 1 (instance gate): local lair-keystore password protection
 *
 * Layer 2 (post-bound capability) is handled by useUserAccessGuard.
 * The two are composed by useMembraneFlow for app-shell consumption.
 *
 * THREE-SIG BINDING PROTOCOL
 *   Sig 1: Applicant submission (lobby AgentID, lobby DHT)
 *   Sig 2: Admin approval (admin AgentID, lobby DHT, issues membrane proof)
 *   Sig 3: Member binding + rules attestation (new member AgentID, main R&O DHT)
 *
 * STATE MAP (eleven states, see JoiningStatus union)
 *   unknown -> access-issue
 *   unauthenticated -> join-welcome
 *   lobby-pending -> join-pending
 *   lobby-rejected -> join-rejected
 *   lobby-approved -> join-approved
 *   binding-in-progress -> join-approved (loading state)
 *   binding-needs-password -> join-set-password
 *   instance-locked -> password-gate
 *   member-suspended -> member-suspended
 *   rules-stale -> rules-reattestation
 *   authenticated -> defer to useUserAccessGuard / home
 *
 * IDENTITY IMMUTABILITY
 *   After "authenticated" status, given/family/mononym are locked.
 *   Nickname, bio, email, userType remain editable.
 *
 * AGENT ID BINDING
 *   The member AgentID is canonical post-binding. The lobby AgentID + application
 *   data persist as provenance via the Joining History view.
 *
 * SCHEMA VOCABULARY
 *   This composable uses the canonical schema vocabulary throughout:
 *   - status_type values: "pending" | "accepted" | "rejected" | "archived"
 *     | "suspended temporarily" | "suspended indefinitely"
 *   - field names match administration.schemas.ts (snake_case from DHT)
 *
 * THIS IS A MOCK IMPLEMENTATION for the design-system pass.
 * Methods are stubs; data is in-memory; __setStatusForDemo drives the FAB control.
 * Sacha lifts this into R&O by replacing the mock methods with real DHT calls.
 */

// ============================================================================
// TYPES
// ============================================================================

/** Provenance of how a member entered R&O. */
export type Provenance = "lobby" | "pre-lobby";

/** Schema-aligned status_type values (mirrors administration.schemas.ts). */
export type StatusType =
  | "pending"
  | "accepted"
  | "rejected"
  | "archived"
  | "suspended temporarily"
  | "suspended indefinitely";

/** Mirror of StatusInDHT from administration.schemas.ts. */
export type StatusInDHT = {
  status_type: StatusType;
  reason?: string;
  suspended_until?: string; // ISO date string per schema
  created_at?: number;
  updated_at?: number;
};

/** Eleven-state union for the joining lifecycle. */
export type JoiningStatus =
  | "unknown"
  | "unauthenticated"
  | "lobby-pending"
  | "lobby-rejected"
  | "lobby-approved"
  | "binding-in-progress"
  | "binding-needs-password"
  | "instance-locked"
  | "member-suspended"
  | "rules-stale"
  | "authenticated";

/** Data submitted at join-form (Sig 1 payload). */
export type ApplicationData = {
  givenName: string;
  familyName: string; // "." sentinel for mononym
  nickname: string;
  email: string;
  userType: "advocate" | "creator"; // mutually exclusive per existing user-create grammar
  reason: string; // free-text "what brings you here?"
};

/** Lobby-DHT application record (post-Sig-1). */
export type LobbyApplication = {
  applicationActionHash: string;
  lobbyAgentPubKey: string | null; // null for pre-lobby members
  data: ApplicationData;
  submitted_at: number;
};

/** Lobby-DHT admin approval record (Sig 2). */
export type ApprovalAttestation = {
  applicationActionHash: string;
  membraneProofHash: string | null; // null for pre-lobby members
  approved_at: number;
};

/** Main-DHT record committed by new member AgentID (Sig 3). */
export type LobbyOrigin = {
  lobbyApplicationActionHash: string;
  provenance: Provenance;
  rules_version: string; // semver of attested rules
  rules_document_hash: string; // anchor to the lobby-DHT rules doc
  bound_at: number;
};

/** Currently active rules version (lives in lobby DHT). */
export type RulesVersion = {
  version: string; // semver
  document_hash: string;
  effective_from: number;
  changelog: string[]; // bulleted changes from previous version
};

/** Action button shape (mirrors useUserAccessGuard.UserAccessAction). */
export type JoiningAction = {
  label: string;
  href?: string;
  action?: string;
  variant: string;
  primary?: boolean;
};

export type UseJoiningGuardOptions = {
  autoCheck?: boolean;
};

export type UseJoiningGuard = {
  // ---- core state ----
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly status: JoiningStatus;
  readonly nextRoute: string;

  // ---- application / binding data ----
  readonly application: LobbyApplication | null;
  readonly approval: ApprovalAttestation | null;
  readonly binding: LobbyOrigin | null;

  // ---- member status (pass-through from would-be useUserAccessGuard) ----
  readonly memberStatus: StatusInDHT | null;

  // ---- rules ----
  readonly currentRules: RulesVersion | null;
  readonly userLastAttestedVersion: string | null;

  // ---- methods (Sig 1 / Sig 3 / unlock / rules) ----
  submitApplication: (data: ApplicationData) => Promise<void>;
  beginBinding: () => Promise<void>;
  setInstancePassword: (password: string) => Promise<void>;
  skipInstancePassword: () => Promise<void>;
  unlockInstance: (email: string, password: string) => Promise<void>;
  attestCurrentRules: () => Promise<void>;
  retry: () => Promise<void>;
  reset: () => void;

  // ---- demo-only escape hatch for FAB control ----
  __setStatusForDemo: (status: JoiningStatus, opts?: { memberStatus?: StatusInDHT }) => void;
};

// ============================================================================
// COPY HELPERS (route mapping)
// ============================================================================

function routeForStatus(status: JoiningStatus): string {
  switch (status) {
    case "unknown":
      return "access-issue";
    case "unauthenticated":
      return "join-welcome";
    case "lobby-pending":
      return "join-pending";
    case "lobby-rejected":
      return "join-rejected";
    case "lobby-approved":
      return "join-approved";
    case "binding-in-progress":
      return "join-approved"; // same screen, internal loading state
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

// ============================================================================
// COMPOSABLE
// ============================================================================

export function useJoiningGuard(options: UseJoiningGuardOptions = {}): UseJoiningGuard {
  const { autoCheck = false } = options;

  // ---- state ----
  let isLoading = $state(false);
  let error = $state<string | null>(null);
  let status = $state<JoiningStatus>("unauthenticated");

  let application = $state<LobbyApplication | null>(null);
  let approval = $state<ApprovalAttestation | null>(null);
  let binding = $state<LobbyOrigin | null>(null);
  let memberStatus = $state<StatusInDHT | null>(null);

  let currentRules = $state<RulesVersion | null>(MOCK_RULES_V1);
  let userLastAttestedVersion = $state<string | null>(null);

  // ---- derived ----
  const nextRoute = $derived(routeForStatus(status));

  // ---- methods ----

  async function submitApplication(data: ApplicationData): Promise<void> {
    // MOCK: Sig 1 — applicant commits LobbyApplication to lobby DHT.
    // Real implementation: callZome to lobby DNA "submit_application".
    isLoading = true;
    error = null;
    try {
      application = {
        applicationActionHash: "uhCkk_mock_application_" + Date.now(),
        lobbyAgentPubKey: "uhCAk_mock_lobby_agent",
        data,
        submitted_at: Date.now()
      };
      status = "lobby-pending";
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to submit application.";
      status = "unknown";
    } finally {
      isLoading = false;
    }
  }

  async function beginBinding(): Promise<void> {
    // MOCK: Sig 3 — user's conductor generates new member AgentID, commits
    // LobbyOrigin + RulesAttestation to main DHT.
    // Real implementation: callZome to main DNA "bind_member" with membrane proof,
    // which triggers conductor keypair generation and atomic cross-DHT commit.
    isLoading = true;
    error = null;
    status = "binding-in-progress";
    try {
      // Simulate keypair generation latency.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (!application || !approval || !currentRules) {
        throw new Error("Cannot bind without application, approval, and current rules.");
      }
      binding = {
        lobbyApplicationActionHash: application.applicationActionHash,
        provenance: "lobby",
        rules_version: currentRules.version,
        rules_document_hash: currentRules.document_hash,
        bound_at: Date.now()
      };
      userLastAttestedVersion = currentRules.version;
      memberStatus = {
        status_type: "accepted",
        created_at: Date.now(),
        updated_at: Date.now()
      };
      status = "binding-needs-password";
    } catch (err) {
      error = err instanceof Error ? err.message : "Binding failed.";
      status = "lobby-approved"; // back to retry-able state
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
    // MOCK: Sig 3.2 — commit new RulesAttestation referencing current rules hash.
    // Real implementation: callZome to main DNA "attest_rules" with version + hash.
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
    isLoading = true;
    error = null;
    try {
      // In real implementation: re-query lobby DHT, main DHT, lair status.
      // For demo, retry on "unknown" returns to whatever the FAB last set,
      // or "unauthenticated" if nothing has been set.
      if (status === "unknown") status = "unauthenticated";
    } finally {
      isLoading = false;
    }
  }

  function reset(): void {
    isLoading = false;
    error = null;
    status = "unauthenticated";
    application = null;
    approval = null;
    binding = null;
    memberStatus = null;
    userLastAttestedVersion = null;
  }

  function __setStatusForDemo(
    newStatus: JoiningStatus,
    opts: { memberStatus?: StatusInDHT } = {}
  ): void {
    // Demo escape hatch for the FAB control. Sets status and optionally seeds
    // member-status mock data for the member-suspended screen.
    // Setting to "unauthenticated" also clears application/binding state so
    // the demo can be re-run cleanly without F5'ing the browser.
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
      // Mock: user is on an older rules version than current.
      userLastAttestedVersion = "0.9.0";
    }
  }

  // ---- lifecycle ----
  if (autoCheck) {
    // In real implementation: querying DHTs to determine starting status.
    // For mock: no-op, defaults to "unauthenticated".
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
    get application() {
      return application;
    },
    get approval() {
      return approval;
    },
    get binding() {
      return binding;
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
    submitApplication,
    beginBinding,
    setInstancePassword,
    skipInstancePassword,
    unlockInstance,
    attestCurrentRules,
    retry,
    reset,
    __setStatusForDemo
  };
}
