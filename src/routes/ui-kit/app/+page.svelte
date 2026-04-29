<script lang="ts">
  import { browser } from '$app/environment';

  // ── Mock data ──────────────────────────────────────────────────────────────
  const SERVICE_TYPES = [
    { id: 'st1', name: 'Mentoring',      technical: false },
    { id: 'st2', name: 'Software Dev',   technical: true  },
    { id: 'st3', name: 'Design',         technical: false },
    { id: 'st4', name: 'Translation',    technical: false },
    { id: 'st5', name: 'Legal Advice',   technical: false },
    { id: 'st6', name: 'Permaculture',   technical: false },
    { id: 'st7', name: 'Music / Audio',  technical: false },
    { id: 'st8', name: 'Data Analysis',  technical: true  },
  ];
  type Medium = { code: string; name: string; type: 'base' | 'currency'; status: 'pending' | 'approved' };
  const MEDIUMS: Medium[] = [
    { code:'TIME',  name:'Time Credits',   type:'base',     status:'approved' },
    { code:'SKILL', name:'Skill Exchange', type:'base',     status:'approved' },
    { code:'EUR',   name:'Euro',           type:'currency', status:'approved' },
    { code:'LOCAL', name:'Local Currency', type:'base',     status:'approved' },
    { code:'USD',   name:'US Dollar',      type:'currency', status:'pending'  },
  ];
  const MEDIUM_NAMES = MEDIUMS.map(m => m.name);
  const TZS = ['UTC', 'Europe/Paris', 'Europe/Madrid', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney', 'Pacific/Auckland'];

  type User = { id: string; name: string; nickname: string; type: string; location: string; bio: string; status: string; email?: string; timeZone?: string };
  type Org  = { id: string; name: string; email: string; location: string; description: string; members: number; status: 'active' | 'pending' | 'suspended' };
  type Item = { id: string; title: string; description: string; serviceTypes: string[]; mediums: string[]; interaction: string; timePreference: string; timeZone: string; status: string; creator: User; links: string[]; org: Org | null; timeEstimate?: number };

  const USERS: User[] = [
    { id:'u1', name:'Anya Kovaleva',  nickname:'anya_k',   type:'creator',  location:'Lyon, FR',      bio:'Holochain developer and permaculture designer.',  status:'accepted', email:'anya@happenings.example',   timeZone:'Europe/Paris'  },
    { id:'u2', name:'Marco Delgado',  nickname:'marco_d',  type:'advocate', location:'Barcelona, ES', bio:'UI/UX designer specialising in accessibility.',    status:'accepted', email:'marco@design.example',      timeZone:'Europe/Madrid' },
    { id:'u3', name:'Keiko Tanaka',   nickname:'ktan',     type:'creator',  location:'Tokyo, JP',     bio:'Full-stack developer and open-source contributor.', status:'accepted', email:'keiko@opentech.example',   timeZone:'Asia/Tokyo'    },
    { id:'u4', name:'Pierre Dubois',  nickname:'pierre_d', type:'advocate', location:'Paris, FR',     bio:'Language teacher and community organiser.',         status:'pending',  email:'pierre@langue.example',    timeZone:'Europe/Paris'  },
    { id:'u5', name:'Soushi Pignot',  nickname:'soushi',   type:'creator',  location:'Lyon, FR',      bio:'Building the Requests & Offers hApp.',              status:'accepted', email:'soushi@happenings.example', timeZone:'Europe/Paris'  },
  ];
  const ME = USERS[4];

  const ORGS: Org[] = [
    { id:'o1', name:'hAppenings CIC', email:'hello@happenings.org', location:'Lyon, FR',      description:'Community Interest Company running mutual aid programs across Europe.', members:12, status:'active' },
    { id:'o2', name:'Open Tech Coop', email:'info@opentech.coop',   location:'Barcelona, ES', description:'Worker cooperative developing open-source tools for cooperatives.',       members:7,  status:'active' },
  ];

  const ADMINS = USERS.slice(0, 3);

  const REQUESTS: Item[] = [
    { id:'r1', title:'Looking for a Holochain mentor',            description:'I am building my first hApp and need guidance on zome architecture, entry validation, and testing. Happy to exchange language tutoring.',          serviceTypes:['Mentoring','Software Dev'], mediums:['Skill Exchange'],           interaction:'Virtual',   timePreference:'Afternoon',     timeZone:'Europe/Paris', status:'active',   creator:USERS[1], links:[],                   org:null,     timeEstimate:3 },
    { id:'r2', title:'Need UI design for community app',          description:'Looking for a UI/UX designer to help wireframe a community exchange platform. Figma experience preferred.',                                            serviceTypes:['Design'],              mediums:['Time Credits'],             interaction:'Virtual',   timePreference:'Morning',       timeZone:'Europe/Paris', status:'active',   creator:USERS[0], links:['https://figma.com'], org:ORGS[0],  timeEstimate:8 },
    { id:'r3', title:'Spanish conversation practice partner',     description:'I am a B2 Spanish learner looking for weekly 1-hour conversation sessions. Can offer French lessons in return.',                                       serviceTypes:['Translation','Mentoring'], mediums:['Skill Exchange','Time Credits'], interaction:'Virtual', timePreference:'Evening',       timeZone:'Europe/Paris', status:'active',   creator:USERS[3], links:[],                   org:null,     timeEstimate:1 },
    { id:'r4', title:'Permaculture site assessment in Lyon',      description:'I have a 500m² garden in Lyon and would love a permaculture consultation to redesign the layout for food production.',                                  serviceTypes:['Permaculture'],        mediums:['Skill Exchange'],           interaction:'In Person', timePreference:'No Preference', timeZone:'Europe/Paris', status:'archived', creator:USERS[4], links:[],                   org:null,     timeEstimate:4 },
  ];

  const OFFERS: Item[] = [
    { id:'of1', title:'UI/UX design consultation — 2 sessions',  description:'I can help with wireframes, user flows, and visual design reviews. I specialise in accessibility-first design. Two 90-minute sessions included.',   serviceTypes:['Design'],              mediums:['Skill Exchange','Time Credits'], interaction:'Virtual',   timePreference:'Afternoon', timeZone:'Europe/Madrid', status:'active',   creator:USERS[1], links:['https://marcodelgado.design'], org:null     },
    { id:'of2', title:'Holochain zome development guidance',     description:'I can pair-program with you on Rust-based Holochain zomes, review your architecture, help set up Sweettest tests, and explain HDK/HDI patterns.',  serviceTypes:['Software Dev','Mentoring'], mediums:['Time Credits'],         interaction:'Virtual',   timePreference:'Morning',   timeZone:'Asia/Tokyo',    status:'active',   creator:USERS[2], links:[],                                org:null     },
    { id:'of3', title:'French lessons for beginners/intermediate',description:'Native French speaker offering structured lessons or conversational practice. Tailored to your level and goals. Skype or Jitsi.',                     serviceTypes:['Translation','Mentoring'], mediums:['Skill Exchange'],       interaction:'Virtual',   timePreference:'Evening',   timeZone:'Europe/Paris',  status:'active',   creator:USERS[3], links:[],                                org:ORGS[0]  },
    { id:'of4', title:'Open-source TypeScript code review',      description:'I will review your TypeScript project (up to 2000 lines), provide written feedback on architecture, type safety, and best practices.',               serviceTypes:['Software Dev'],        mediums:['Time Credits','EUR'],           interaction:'Virtual',   timePreference:'No Preference', timeZone:'Asia/Tokyo', status:'archived', creator:USERS[2], links:[],                                org:null     },
  ];

  // ── Navigation state ───────────────────────────────────────────────────────
  let route        = $state('home');
  let payload      = $state<string | null>(null);
  let adminSection = $state<'dashboard'|'users'|'organizations'|'requests'|'offers'|'service-types'|'mediums'|'administrators'>('dashboard');
  let hasProfile   = $state(true);
  let wrapper: HTMLElement;

  // ── Contact modal ──────────────────────────────────────────────────────────
  type ContactTarget = { user: User; org: Org | null; listingType: string; listingTitle: string };
  let contactModal = $state<ContactTarget | null>(null);

  function openContactModal(user: User, org: Org | null, listingType: string, listingTitle: string) {
    contactModal = { user, org, listingType, listingTitle };
  }
  function closeContactModal() { contactModal = null; }

  // ── Markdown renderer ──────────────────────────────────────────────────────
  function md(text: string): string {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
      .replace(/\n/g, '<br>');
  }

  // ── Confirm modal ──────────────────────────────────────────────────────────
  type ConfirmTarget = { message: string; onConfirm: () => void };
  let confirmModal = $state<ConfirmTarget | null>(null);
  function openConfirm(message: string, onConfirm: () => void) { confirmModal = { message, onConfirm }; }
  function closeConfirm() { confirmModal = null; }
  function executeConfirm() { confirmModal?.onConfirm(); confirmModal = null; }

  async function copyToClipboard(text: string) {
    try { await navigator.clipboard.writeText(text); } catch { /* silent */ }
  }

  const ADMIN_SECTION_MAP: Record<string, typeof adminSection> = {
    'admin': 'dashboard',
    'admin-users': 'users',
    'admin-orgs': 'organizations',
    'admin-organizations': 'organizations',
    'admin-requests': 'requests',
    'admin-offers': 'offers',
    'admin-service-types': 'service-types',
    'admin-mediums': 'mediums',
    'admin-administrators': 'administrators',
  };

  function navigate(r: string, p: string | null = null) {
    if (r in ADMIN_SECTION_MAP) adminSection = ADMIN_SECTION_MAP[r];
    route = r; payload = p;
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }

  $effect(() => {
    if (!browser || !wrapper) return;
    const handle = (e: Event) => {
      const detail = (e as CustomEvent).detail ?? {};
      if (detail.route) navigate(detail.route, detail.payload ?? null);
    };
    wrapper.addEventListener('ds-navigate', handle);
    (window as any).__dsNavigate = navigate;
    return () => {
      wrapper.removeEventListener('ds-navigate', handle);
      delete (window as any).__dsNavigate;
    };
  });

  // ── Derived ────────────────────────────────────────────────────────────────
  let isAdmin       = $derived(route === 'admin' || route.startsWith('admin-'));
  let currentReq    = $derived(REQUESTS.find(r => r.id === payload) ?? null);
  let currentOffer  = $derived(OFFERS.find(o => o.id === payload) ?? null);
  let currentUser   = $derived(USERS.find(u => u.id === payload) ?? ME);
  let currentOrg    = $derived(ORGS.find(o => o.id === payload) ?? ORGS[0]);

  // browse filters
  let reqTab    = $state<'active'|'archived'>('active');
  let reqFilter = $state<'all'|'my'|'org'>('all');
  let offerTab    = $state<'active'|'archived'>('active');
  let offerFilter = $state<'all'|'my'|'org'>('all');
  let myTab   = $state<'requests'|'offers'>('requests');
  let orgTab  = $state<'members'|'coordinators'|'requests'|'offers'>('requests');

  let filteredReqs = $derived(REQUESTS.filter(r => {
    if (reqTab === 'active' && r.status !== 'active') return false;
    if (reqTab === 'archived' && r.status !== 'archived') return false;
    if (reqFilter === 'my'  && r.creator.id !== ME.id) return false;
    if (reqFilter === 'org' && !r.org) return false;
    return true;
  }));
  let filteredOffers = $derived(OFFERS.filter(o => {
    if (offerTab === 'active' && o.status !== 'active') return false;
    if (offerTab === 'archived' && o.status !== 'archived') return false;
    if (offerFilter === 'my'  && o.creator.id !== ME.id) return false;
    if (offerFilter === 'org' && !o.org) return false;
    return true;
  }));

  // ── Form state ─────────────────────────────────────────────────────────────
  // Request form
  let rTitle=$state(''); let rDesc=$state(''); let rInteraction=$state('Virtual');
  let rTimePref=$state('No Preference'); let rTimePrefOther=$state('');
  let rContactPref=$state('Email'); let rContactPrefOther=$state('');
  let rTZ=$state('Europe/Paris'); let rST=$state<string[]>([]);
  let rMed=$state<string[]>([]); let rLinks=$state<string[]>([]); let rLinkIn=$state('');
  let rOrg=$state(''); let rEst=$state<number|null>(null);

  // Offer form
  let oTitle=$state(''); let oDesc=$state(''); let oInteraction=$state('Virtual');
  let oTimePref=$state('No Preference'); let oTimePrefOther=$state('');
  let oTZ=$state('Europe/Paris'); let oST=$state<string[]>([]);
  let oMed=$state<string[]>([]); let oLinks=$state<string[]>([]); let oLinkIn=$state('');
  let oOrg=$state('');

  // User form
  let pName=$state(''); let pNick=$state(''); let pBio=$state('');
  let pEmail=$state(''); let pPhone=$state(''); let pLoc=$state('');
  let pType=$state<'advocate'|'creator'>('creator'); let pTZ=$state('Europe/Paris');

  // Org form
  let orgName=$state(''); let orgLegal=$state(''); let orgEmail=$state('');
  let orgDesc=$state(''); let orgLoc=$state(''); let orgUrls=$state('');
  let orgIsContact=$state(false); let orgContactRole=$state('');

  // ── Helpers ────────────────────────────────────────────────────────────────
  function toggleArr(arr: string[], val: string): string[] {
    return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
  }
  function addLink(links: string[], inp: string): [string[], string] {
    return inp.trim() ? [[...links, inp.trim()], ''] : [links, inp];
  }
</script>

<!-- ══════════════════════════════════════════════════════════
     Wrapper — catches ds-navigate from ds-shell / ds-navbar
     ══════════════════════════════════════════════════════════ -->
<div bind:this={wrapper} style="display:contents">

<!-- ══════════════════════════════════════════════════════════
     ADMIN SHELL (dark sidebar layout)
     ══════════════════════════════════════════════════════════ -->
{#if isAdmin}
<div class="admin-wrap">

  <aside class="admin-sidebar">
    <div class="admin-logo">
      <img src="/assets/hAppeningsCIClogo.png" alt="" width="36" height="36" />
      <span>Admin</span>
    </div>
    <nav class="admin-nav">
      {#each [
        {key:'dashboard',      label:'Dashboard',           icon:'🏠'},
        {key:'users',          label:'Users',               icon:'👥'},
        {key:'organizations',  label:'Organizations',       icon:'🏢'},
        {key:'requests',       label:'Requests',            icon:'📝'},
        {key:'offers',         label:'Offers',              icon:'💡'},
        {key:'service-types',  label:'Service Types',       icon:'🏷️'},
        {key:'mediums',        label:'Mediums of Exchange', icon:'💱'},
        {key:'administrators', label:'Administrators',      icon:'🛡️'},
      ] as item}
        <button
          class="admin-nav-item {adminSection === item.key ? 'is-active' : ''}"
          onclick={() => {
            adminSection = item.key as typeof adminSection;
            route = item.key === 'dashboard' ? 'admin' : `admin-${item.key}`;
          }}
        ><span>{item.icon}</span>{item.label}</button>
      {/each}
    </nav>
    <div class="admin-sidebar-foot">
      <button class="admin-exit" onclick={() => navigate('home')}>← Exit Admin</button>
    </div>
  </aside>

  <main class="admin-main">

    <!-- Dashboard -->
    {#if adminSection === 'dashboard'}
      <div class="admin-page-header">
        <h1 class="admin-page-title">Admin Dashboard</h1>
        <ds-status-dot status="connected"></ds-status-dot>
      </div>
      <div class="stats-grid">
        {#each [{label:'Administrators',value:'3',icon:'🛡️'},{label:'Total Users',value:String(USERS.length),icon:'👥'},{label:'Organizations',value:String(ORGS.length),icon:'🏢'},{label:'Active Requests',value:String(REQUESTS.filter(r=>r.status==='active').length),icon:'📝'}] as s}
          <div class="stat-card"><span class="stat-icon">{s.icon}</span><div class="stat-value">{s.value}</div><div class="stat-label">{s.label}</div></div>
        {/each}
      </div>
      <!-- Moderation queue -->
      <section class="admin-section">
        <h2 class="admin-section-title">Moderation Queue</h2>
        <div class="admin-tabs">
          <button class="admin-tab is-active">Pending Users ({USERS.filter(u=>u.status==='pending').length})</button>
          <button class="admin-tab">Pending Orgs (0)</button>
        </div>
        {#each USERS.filter(u=>u.status==='pending') as u}
          <div class="moderation-row">
            <div class="av av--md">{u.name[0]}</div>
            <div class="moderation-info"><div class="moderation-name">{u.name}</div><div class="moderation-meta">{u.location} · {u.type}</div></div>
            <div class="moderation-actions">
              <button class="btn-ghost" onclick={() => navigate('user-profile', u.id)}>View</button>
              <button class="btn-ds btn-ds--error btn-ds--sm">Reject</button>
              <button class="btn-ds btn-ds--primary btn-ds--sm">Approve</button>
            </div>
          </div>
        {:else}
          <p class="empty-note">No pending users.</p>
        {/each}
      </section>

    <!-- Admin Users -->
    {:else if adminSection === 'users'}
      <div class="admin-page-header"><h1 class="admin-page-title">Users Management</h1><button class="btn-ghost">Status History</button></div>
      {#each [{label:'Pending Users',users:USERS.filter(u=>u.status==='pending'),color:'71 32 183'},{label:'Accepted Users',users:USERS.filter(u=>u.status==='accepted'),color:'132 204 22'}] as cat}
        <section class="admin-cat" style="border-left:3px solid rgb({cat.color})">
          <h3 class="admin-cat-label">{cat.label} ({cat.users.length})</h3>
          <table class="admin-table">
            <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th>Actions</th></tr></thead>
            <tbody>
              {#each cat.users as u}
                <tr>
                  <td><div class="av av--sm">{u.name[0]}</div></td>
                  <td class="td-name">
                    {u.name}
                    {#if u.status === 'pending'}<ds-chip tone="warning" style="margin-left:6px;font-size:10px">Pending</ds-chip>{/if}
                  </td>
                  <td><span class="badge-type">{u.type}</span></td>
                  <td class="td-muted">{u.location}</td>
                  <td><button class="btn-ghost" onclick={() => navigate('user-profile', u.id)}>View</button></td>
                </tr>
              {/each}
            </tbody>
          </table>
        </section>
      {/each}

    <!-- Admin Requests -->
    {:else if adminSection === 'requests'}
      <div class="admin-page-header"><h1 class="admin-page-title">Requests Management</h1><button class="btn-ghost">Refresh</button></div>
      <table class="admin-table">
        <thead><tr><th>Title</th><th>Creator</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {#each REQUESTS as r}
            <tr>
              <td class="td-name">{r.title}</td>
              <td class="td-muted">{r.creator.name}</td>
              <td><span class="status-badge {r.status === 'active' ? 'status-active' : 'status-archived'}">{r.status}</span></td>
              <td><button class="btn-ghost" onclick={() => navigate('request-detail', r.id)}>View</button></td>
            </tr>
          {/each}
        </tbody>
      </table>

    <!-- Admin Offers -->
    {:else if adminSection === 'offers'}
      <div class="admin-page-header"><h1 class="admin-page-title">Offers Management</h1><button class="btn-ghost">Refresh</button></div>
      <table class="admin-table">
        <thead><tr><th>Title</th><th>Creator</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {#each OFFERS as o}
            <tr>
              <td class="td-name">{o.title}</td>
              <td class="td-muted">{o.creator.name}</td>
              <td><span class="status-badge {o.status==='active'?'status-active':'status-archived'}">{o.status}</span></td>
              <td><button class="btn-ghost" onclick={() => navigate('offer-detail', o.id)}>View</button></td>
            </tr>
          {/each}
        </tbody>
      </table>

    <!-- Admin Service Types -->
    {:else if adminSection === 'service-types'}
      <div class="admin-page-header">
        <h1 class="admin-page-title">Service Types Management</h1>
        <button class="btn-ds btn-ds--primary btn-ds--sm">+ Create Type</button>
      </div>
      <table class="admin-table">
        <thead><tr><th>Name</th><th>Classification</th><th>Actions</th></tr></thead>
        <tbody>
          {#each SERVICE_TYPES as st}
            <tr>
              <td class="td-name">{st.name}</td>
              <td><ds-chip tone={st.technical?'tertiary':'surface'}>{st.technical?'Technical':'Non-Technical'}</ds-chip></td>
              <td>
                <button class="btn-ghost">Edit</button>
                <button class="btn-ghost" style="color:rgb(var(--color-error-600))"
                  onclick={() => openConfirm(`Delete "${st.name}"? This cannot be undone.`, () => {})}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

    <!-- Admin Mediums of Exchange -->
    {:else if adminSection === 'mediums'}
      <div class="admin-page-header">
        <h1 class="admin-page-title">Mediums of Exchange</h1>
        <button class="btn-ds btn-ds--primary btn-ds--sm">+ Create Medium</button>
      </div>
      <table class="admin-table">
        <thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {#each MEDIUMS as m}
            <tr>
              <td class="td-name">{m.code}</td>
              <td>{m.name}</td>
              <td><ds-chip tone={m.type === 'base' ? 'surface' : 'tertiary'}>{m.type === 'base' ? '📂 Base' : '💰 Currency'}</ds-chip></td>
              <td><ds-chip tone={m.status === 'approved' ? 'success' : 'warning'}>{m.status}</ds-chip></td>
              <td>
                {#if m.status === 'pending'}
                  <button class="btn-ghost btn-ghost--sm">Approve</button>
                  <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))">Reject</button>
                {/if}
                <button class="btn-ghost btn-ghost--sm">Edit</button>
                <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
                  onclick={() => openConfirm(`Delete medium "${m.name}"?`, () => {})}>Delete</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

    <!-- Admin Organizations -->
    {:else if adminSection === 'organizations'}
      <div class="admin-page-header">
        <h1 class="admin-page-title">Organizations Management</h1>
        <button class="btn-ghost">Status History</button>
      </div>
      <table class="admin-table">
        <thead><tr><th></th><th>Name</th><th>Location</th><th>Members</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {#each ORGS as o}
            <tr>
              <td><div class="org-logo" style="width:32px;height:32px;font-size:14px;border-radius:8px">{o.name[0]}</div></td>
              <td class="td-name">{o.name}</td>
              <td class="td-muted">{o.location}</td>
              <td class="td-muted">{o.members}</td>
              <td><ds-chip tone={o.status === 'active' ? 'success' : o.status === 'pending' ? 'warning' : 'error'}>{o.status}</ds-chip></td>
              <td>
                <button class="btn-ghost btn-ghost--sm" onclick={() => navigate('org-detail', o.id)}>View</button>
                <button class="btn-ghost btn-ghost--sm" onclick={() => navigate('org-edit', o.id)}>Edit</button>
                <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
                  onclick={() => openConfirm(`Suspend "${o.name}"?`, () => {})}>Suspend</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

    <!-- Admin Administrators -->
    {:else if adminSection === 'administrators'}
      <div class="admin-page-header">
        <h1 class="admin-page-title">Administrators</h1>
        <button class="btn-ds btn-ds--primary btn-ds--sm">+ Add Administrator</button>
      </div>
      <p class="ds-small" style="margin-bottom:16px;color:rgba(255,255,255,.5)">{ADMINS.length} network administrator{ADMINS.length !== 1 ? 's' : ''}</p>
      <table class="admin-table">
        <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th>Actions</th></tr></thead>
        <tbody>
          {#each ADMINS as u}
            <tr>
              <td><div class="av av--sm">{u.name[0]}</div></td>
              <td class="td-name">{u.name}</td>
              <td><span class="badge-type">{u.type}</span></td>
              <td class="td-muted">{u.location}</td>
              <td>
                <button class="btn-ghost btn-ghost--sm" onclick={() => navigate('user-profile', u.id)}>View</button>
                <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
                  onclick={() => openConfirm(`Remove ${u.name} as administrator?`, () => {})}>Remove</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

    {:else}
      <div class="placeholder"><div class="placeholder-icon">🚧</div><h2>Section coming soon</h2></div>
    {/if}

  </main>
</div>

<!-- ══════════════════════════════════════════════════════════
     USER APP SHELL (ds-shell with ds-navbar)
     ══════════════════════════════════════════════════════════ -->
{:else}
<ds-shell route={route} app-name="Requests & Offers" logo-src="/assets/hAppeningsCIClogo.png">

  <!-- ── HOME ── -->
  {#if route === 'home'}
    <div class="page">
      {#if !hasProfile}
        <!-- New user -->
        <div class="home-hero">
          <h1 class="ds-h2">Welcome to Requests &amp; Offers</h1>
          <p class="ds-p" style="color:rgb(var(--fg-2));max-width:520px;text-align:center">Connect with the hAppenings community to exchange skills, resources, and support.</p>
          <button class="btn-ds btn-ds--primary" onclick={() => navigate('user-create')}>👤 Join the Community</button>
        </div>
        <div class="action-grid">
          <button class="action-card" onclick={() => navigate('requests')}>
            <div class="action-card-icon">🔍</div>
            <h3 class="action-card-title">Discover Opportunities</h3>
            <p class="action-card-desc">Browse active requests from community members looking for skills.</p>
            <span class="action-card-cta cta--secondary">Browse Requests</span>
          </button>
          <button class="action-card" onclick={() => navigate('offers')}>
            <div class="action-card-icon">✨</div>
            <h3 class="action-card-title">Offer Your Skills</h3>
            <p class="action-card-desc">Share what you can contribute to the community.</p>
            <span class="action-card-cta cta--warning">Post an Offer</span>
          </button>
          <button class="action-card" onclick={() => navigate('users')}>
            <div class="action-card-icon">👥</div>
            <h3 class="action-card-title">Explore Community</h3>
            <p class="action-card-desc">Meet members and organisations working together.</p>
            <span class="action-card-cta cta--tertiary">Meet People</span>
          </button>
        </div>
      {:else}
        <!-- Existing user -->
        <div class="home-welcome">
          <div class="av av--lg">{ME.name[0]}</div>
          <div>
            <h2 class="ds-h3">Welcome back, {ME.nickname}!</h2>
            <p class="ds-small">{REQUESTS.filter(r=>r.creator.id===ME.id&&r.status==='active').length} active requests · {OFFERS.filter(o=>o.creator.id===ME.id&&o.status==='active').length} active offers</p>
          </div>
        </div>
        <div class="quick-cards">
          <button class="quick-card" onclick={() => navigate('my-listings')}>
            <span class="quick-card-icon">📋</span>
            <span class="quick-card-label">My Requests</span>
            <span class="quick-card-count">{REQUESTS.filter(r=>r.creator.id===ME.id).length}</span>
          </button>
          <button class="quick-card" onclick={() => navigate('my-listings')}>
            <span class="quick-card-icon">🎯</span>
            <span class="quick-card-label">My Offers</span>
            <span class="quick-card-count">{OFFERS.filter(o=>o.creator.id===ME.id).length}</span>
          </button>
          <button class="quick-card" onclick={() => navigate('user-profile', ME.id)}>
            <span class="quick-card-icon">👤</span>
            <span class="quick-card-label">My Profile</span>
            <span class="quick-card-count">→</span>
          </button>
        </div>
        <div class="home-primary-actions">
          <button class="btn-ds btn-ds--secondary" onclick={() => navigate('requests')}>📝 Browse Requests</button>
          <button class="btn-ds btn-ds--warning"   onclick={() => navigate('offers')}>💡 Browse Offers</button>
          <button class="btn-ds btn-ds--ghost"     onclick={() => navigate('admin')}>⚙️ Admin Panel</button>
        </div>
        <div class="home-community">
          <h3 class="ds-h4">Community Resources</h3>
          <div class="community-links">
            <button class="community-link" onclick={() => navigate('service-types')}>🏷️ Service Types</button>
            <button class="community-link" onclick={() => navigate('orgs')}>🏢 Organizations</button>
            <button class="community-link" onclick={() => navigate('users')}>👥 All Users</button>
          </div>
        </div>
      {/if}
    </div>

  <!-- ── BROWSE REQUESTS ── -->
  {:else if route === 'requests'}
    <div class="page">
      <div class="page-header">
        <div class="tab-group">
          <button class="tab {reqTab==='active'?'tab--primary':''}"   onclick={() => reqTab='active'}>📋 Active Requests</button>
          <button class="tab {reqTab==='archived'?'tab--warning':''}" onclick={() => reqTab='archived'}>📦 Archived Requests</button>
        </div>
        <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => navigate('request-create')}>+ Create Request</button>
      </div>
      <div class="filter-row">
        {#each [{k:'all',l:'All'},{k:'my',l:'My'},{k:'org',l:'Organization'}] as f}
          <button class="filter-chip {reqFilter===f.k?'filter-chip--active':''}" onclick={() => reqFilter = f.k as typeof reqFilter}>{f.l}</button>
        {/each}
      </div>
      {#if filteredReqs.length}
        <div class="listings-grid">
          {#each filteredReqs as req}
            <button class="listing-card" onclick={() => navigate('request-detail', req.id)}>
              <div class="listing-head">
                <ds-chip tone="secondary">📝 Request</ds-chip>
                {#if req.org}<ds-chip tone="surface">{req.org.name}</ds-chip>{/if}
                {#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
                <span class="listing-meta">{req.interaction}</span>
              </div>
              <h3 class="listing-title">{req.title}</h3>
              <p class="listing-desc">{req.description}</p>
              <div class="listing-tags">
                {#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}
              </div>
              <div class="listing-foot">
                <div class="av av--xs">{req.creator.name[0]}</div>
                <span class="listing-creator">{req.creator.name}</span>
                <span class="listing-pref">{req.timePreference}</span>
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <div class="empty">
          <p>No {reqTab} requests found.</p>
          <button class="btn-ds btn-ds--primary" onclick={() => navigate('request-create')}>Create your first request</button>
        </div>
      {/if}
    </div>

  <!-- ── REQUEST DETAIL ── -->
  {:else if route === 'request-detail'}
    {#if currentReq}
      {@const req = currentReq}
      <div class="page">
        <div class="detail-nav">
          <button class="btn-ghost" onclick={() => navigate('requests')}>← Back</button>
          {#if req.creator.id === ME.id}
            <button class="btn-ghost" onclick={() => navigate('request-edit', req.id)}>Edit</button>
            <button class="btn-ghost btn-ghost--danger">Delete</button>
          {/if}
        </div>
        <div class="detail-header">
          <div class="detail-header-top">
            <h1 class="ds-h2">{req.title}</h1>
            <div class="detail-badges">
              <ds-chip tone="secondary">📝 Request</ds-chip>
              <ds-chip tone="tertiary">{req.interaction}</ds-chip>
              {#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
            </div>
          </div>
          <p class="ds-p">{@html md(req.description)}</p>
        </div>
        <div class="detail-sections">
          <div class="detail-section">
            <h4 class="detail-section-label">Service Types</h4>
            <div class="tags-row">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
          </div>
          <div class="detail-section">
            <h4 class="detail-section-label">Mediums of Exchange</h4>
            <div class="tags-row">{#each req.mediums as m}<ds-chip tone="surface">{m}</ds-chip>{/each}</div>
          </div>
          <div class="detail-section detail-section--meta">
            <div class="meta-row"><span class="meta-label">Time Estimate</span><span class="meta-value">{req.timeEstimate ? `${req.timeEstimate}h` : '—'}</span></div>
            <div class="meta-row"><span class="meta-label">Time Preference</span><span class="meta-value">{req.timePreference}</span></div>
            <div class="meta-row"><span class="meta-label">Time Zone</span><span class="meta-value">{req.timeZone}</span></div>
            <div class="meta-row"><span class="meta-label">Interaction</span><span class="meta-value">{req.interaction}</span></div>
          </div>
          {#if req.links.length}
            <div class="detail-section">
              <h4 class="detail-section-label">Related Links</h4>
              {#each req.links as l}<a href={l} class="ds-link" target="_blank">{l}</a>{/each}
            </div>
          {/if}
        </div>
        <div class="creator-card">
          <div class="av av--md">{req.creator.name[0]}</div>
          <div class="creator-info">
            <button class="creator-name" onclick={() => navigate('user-profile', req.creator.id)}>{req.creator.name}</button>
            <span class="ds-small">{req.creator.type} · {req.creator.location}</span>
            <p class="ds-small">{req.creator.bio}</p>
          </div>
          <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => openContactModal(req.creator, req.org, 'request', req.title)}>🤝 Interested?</button>
        </div>
      </div>
    {:else}
      <div class="page"><div class="placeholder"><p>Request not found.</p><button class="btn-ghost" onclick={() => navigate('requests')}>← Back</button></div></div>
    {/if}

  <!-- ── CREATE / EDIT REQUEST FORM ── -->
  {:else if route === 'request-create' || route === 'request-edit'}
    <div class="page">
      <div class="detail-nav"><button class="btn-ghost" onclick={() => navigate('requests')}>← Back</button></div>
      <h1 class="ds-h2" style="margin-bottom:24px">{route === 'request-create' ? 'Create Request' : 'Edit Request'}</h1>
      <form class="form-card" onsubmit={(e) => e.preventDefault()}>
        <p class="ds-small form-note">* required fields</p>

        <div class="field"><label class="field-label">Title *</label>
          <input class="ds-input" bind:value={rTitle} placeholder="Enter request title" /></div>

        <div class="field"><label class="field-label">Description * <span class="field-hint">Markdown supported · max 1000 chars</span></label>
          <textarea class="ds-input" rows="5" bind:value={rDesc} placeholder="Describe your request in detail (Markdown supported)" maxlength="1000"></textarea>
          <div class="char-count">{rDesc.length}/1000</div></div>

        <div class="field"><label class="field-label">Service Types *</label>
          <div class="multi-chips">
            {#each SERVICE_TYPES as st}
              <button type="button" class="sel-chip {rST.includes(st.name)?'sel-chip--on':''}" onclick={() => rST = toggleArr(rST, st.name)}>{st.name}</button>
            {/each}
          </div>
          {#if rST.length === 0}<span class="field-error">Select at least one service type</span>{/if}</div>

        <div class="form-card-section"><label class="field-label">Mediums of Exchange</label>
          <div class="multi-chips">
            {#each MEDIUM_NAMES as m}
              <button type="button" class="sel-chip {rMed.includes(m)?'sel-chip--on':''}" onclick={() => rMed = toggleArr(rMed, m)}>{m}</button>
            {/each}
          </div>
          <p class="ds-small" style="margin-top:8px"><button type="button" class="btn-ghost btn-ghost--sm">💡 Suggest New Medium</button></p>
        </div>

        <div class="form-card-section"><label class="field-label">Interaction Type *</label>
          <div class="radio-group">
            {#each ['Virtual','In Person'] as opt}
              <label class="radio-opt"><input type="radio" name="r-interaction" value={opt} bind:group={rInteraction}/><span>{opt}</span></label>
            {/each}
          </div></div>

        <div class="form-row-2">
          <div class="form-card-section"><label class="field-label">Time Preference *</label>
            <div class="radio-group">
              {#each ['Morning','Afternoon','Evening','No Preference','Other'] as opt}
                <label class="radio-opt"><input type="radio" name="r-timepref" value={opt} bind:group={rTimePref}/><span>{opt}</span></label>
              {/each}
            </div>
            {#if rTimePref==='Other'}<input class="ds-input" style="margin-top:8px" bind:value={rTimePrefOther} placeholder="Specify time preference..."/>{/if}
          </div>
          <div class="form-card-section"><label class="field-label">Contact Preference *</label>
            <div class="radio-group">
              {#each ['Email','Phone','Other'] as opt}
                <label class="radio-opt"><input type="radio" name="r-contactpref" value={opt} bind:group={rContactPref}/><span>{opt}</span></label>
              {/each}
            </div>
            {#if rContactPref==='Other'}<input class="ds-input" style="margin-top:8px" bind:value={rContactPrefOther} placeholder="Specify contact preference..."/>{/if}
          </div>
        </div>

        <div class="field"><label class="field-label">Time Zone *</label>
          <select class="ds-input" bind:value={rTZ}>{#each TZS as tz}<option value={tz}>{tz}</option>{/each}</select></div>

        <div class="field"><label class="field-label">Time Estimate in Hours (optional) <span class="field-hint">0.5 hour steps</span></label>
          <input type="number" class="ds-input" style="max-width:180px" bind:value={rEst} placeholder="Estimated hours needed" min="0" step="0.5"/></div>

        <div class="field"><label class="field-label">Links</label>
          <div class="chip-input-row">
            <input class="ds-input" bind:value={rLinkIn} placeholder="Add links (press Enter to add)"
              onkeydown={(e)=>{if(e.key==='Enter'){e.preventDefault();[rLinks,rLinkIn]=addLink(rLinks,rLinkIn);}}}/>
            <button type="button" class="btn-ghost" onclick={() => {[rLinks,rLinkIn]=addLink(rLinks,rLinkIn);}}>Add</button>
          </div>
          <div class="chip-list">
            {#each rLinks as l,i}<span class="link-chip">{l}<button type="button" onclick={()=>rLinks=rLinks.filter((_,idx)=>idx!==i)}>×</button></span>{/each}
          </div></div>

        <div class="field"><label class="field-label">Organization (optional)</label>
          <select class="ds-input" bind:value={rOrg}>
            <option value="">No organization</option>
            {#each ORGS as o}<option value={o.id}>{o.name}</option>{/each}
          </select></div>

        <div class="form-actions">
          <button type="button" class="btn-ghost" onclick={() => navigate('requests')}>Cancel</button>
          <button type="button" class="btn-ds btn-ds--primary" onclick={() => navigate('requests')}>
            📝 {route === 'request-create' ? 'Create Request' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>

  <!-- ── BROWSE OFFERS ── -->
  {:else if route === 'offers'}
    <div class="page">
      <div class="page-header">
        <div class="tab-group">
          <button class="tab {offerTab==='active'?'tab--warning':''}"   onclick={() => offerTab='active'}>💡 Active Offers</button>
          <button class="tab {offerTab==='archived'?'tab--warning':''}" onclick={() => offerTab='archived'}>📦 Archived Offers</button>
        </div>
        <button class="btn-ds btn-ds--warning btn-ds--sm" onclick={() => navigate('offer-create')}>+ Create Offer</button>
      </div>
      <div class="filter-row">
        {#each [{k:'all',l:'All'},{k:'my',l:'My'},{k:'org',l:'Organization'}] as f}
          <button class="filter-chip {offerFilter===f.k?'filter-chip--warn':''}" onclick={() => offerFilter = f.k as typeof offerFilter}>{f.l}</button>
        {/each}
      </div>
      {#if filteredOffers.length}
        <div class="listings-grid">
          {#each filteredOffers as offer}
            <button class="listing-card" onclick={() => navigate('offer-detail', offer.id)}>
              <div class="listing-head">
                <ds-chip tone="warning">💡 Offer</ds-chip>
                {#if offer.org}<ds-chip tone="surface">{offer.org.name}</ds-chip>{/if}
                {#if offer.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
                <span class="listing-meta">{offer.interaction}</span>
              </div>
              <h3 class="listing-title">{offer.title}</h3>
              <p class="listing-desc">{offer.description}</p>
              <div class="listing-tags">{#each offer.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
              <div class="listing-foot">
                <div class="av av--xs">{offer.creator.name[0]}</div>
                <span class="listing-creator">{offer.creator.name}</span>
                <span class="listing-pref">{offer.timePreference}</span>
              </div>
            </button>
          {/each}
        </div>
      {:else}
        <div class="empty">
          <p>No {offerTab} offers found.</p>
          <button class="btn-ds btn-ds--warning" onclick={() => navigate('offer-create')}>Create your first offer</button>
        </div>
      {/if}
    </div>

  <!-- ── OFFER DETAIL ── -->
  {:else if route === 'offer-detail'}
    {#if currentOffer}
      {@const offer = currentOffer}
      <div class="page">
        <div class="detail-nav">
          <button class="btn-ghost" onclick={() => navigate('offers')}>← Back</button>
          {#if offer.creator.id === ME.id}
            <button class="btn-ghost" onclick={() => navigate('offer-edit', offer.id)}>Edit</button>
            <button class="btn-ghost btn-ghost--danger">Delete</button>
          {/if}
        </div>
        <div class="detail-header">
          <div class="detail-header-top">
            <h1 class="ds-h2">{offer.title}</h1>
            <div class="detail-badges">
              <ds-chip tone="warning">💡 Offer</ds-chip>
              <ds-chip tone="tertiary">{offer.interaction}</ds-chip>
              {#if offer.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
            </div>
          </div>
          <p class="ds-p">{@html md(offer.description)}</p>
        </div>
        <div class="detail-sections">
          <div class="detail-section">
            <h4 class="detail-section-label">Service Types</h4>
            <div class="tags-row">{#each offer.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
          </div>
          <div class="detail-section">
            <h4 class="detail-section-label">Mediums of Exchange</h4>
            <div class="tags-row">{#each offer.mediums as m}<ds-chip tone="surface">{m}</ds-chip>{/each}</div>
          </div>
          <div class="detail-section detail-section--meta">
            <div class="meta-row"><span class="meta-label">Time Preference</span><span class="meta-value">{offer.timePreference}</span></div>
            <div class="meta-row"><span class="meta-label">Time Zone</span><span class="meta-value">{offer.timeZone}</span></div>
            <div class="meta-row"><span class="meta-label">Interaction</span><span class="meta-value">{offer.interaction}</span></div>
          </div>
        </div>
        <div class="creator-card">
          <div class="av av--md">{offer.creator.name[0]}</div>
          <div class="creator-info">
            <button class="creator-name" onclick={() => navigate('user-profile', offer.creator.id)}>{offer.creator.name}</button>
            <span class="ds-small">{offer.creator.type} · {offer.creator.location}</span>
          </div>
          <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => openContactModal(offer.creator, offer.org, 'offer', offer.title)}>🤝 Interested?</button>
        </div>
      </div>
    {:else}
      <div class="page"><div class="placeholder"><p>Offer not found.</p><button class="btn-ghost" onclick={() => navigate('offers')}>← Back</button></div></div>
    {/if}

  <!-- ── CREATE / EDIT OFFER ── -->
  {:else if route === 'offer-create' || route === 'offer-edit'}
    <div class="page">
      <div class="detail-nav"><button class="btn-ghost" onclick={() => navigate('offers')}>← Back</button></div>
      <h1 class="ds-h2" style="margin-bottom:24px">{route === 'offer-create' ? 'Create Offer' : 'Edit Offer'}</h1>
      <form class="form-card" onsubmit={(e) => e.preventDefault()}>
        <p class="ds-small form-note">* required fields</p>
        <div class="field"><label class="field-label">Title *</label>
          <input class="ds-input" bind:value={oTitle} placeholder="What are you offering?"/></div>
        <div class="field"><label class="field-label">Description * <span class="field-hint">Markdown supported · max 1000 chars</span></label>
          <textarea class="ds-input" rows="5" bind:value={oDesc} placeholder="Describe your offer in detail (Markdown supported)" maxlength="1000"></textarea>
          <div class="char-count">{oDesc.length}/1000</div></div>
        <div class="field"><label class="field-label">Service Types *</label>
          <div class="multi-chips">
            {#each SERVICE_TYPES as st}
              <button type="button" class="sel-chip {oST.includes(st.name)?'sel-chip--on':''}" onclick={() => oST = toggleArr(oST, st.name)}>{st.name}</button>
            {/each}
          </div></div>
        <div class="form-card-section"><label class="field-label">Mediums of Exchange</label>
          <div class="multi-chips">
            {#each MEDIUM_NAMES as m}
              <button type="button" class="sel-chip {oMed.includes(m)?'sel-chip--on':''}" onclick={() => oMed = toggleArr(oMed, m)}>{m}</button>
            {/each}
          </div>
          <p class="ds-small" style="margin-top:8px"><button type="button" class="btn-ghost btn-ghost--sm">💡 Suggest New Medium</button></p>
        </div>
        <div class="form-card-section"><label class="field-label">Interaction Type *</label>
          <div class="radio-group">{#each ['Virtual','In Person'] as opt}<label class="radio-opt"><input type="radio" name="o-interaction" value={opt} bind:group={oInteraction}/><span>{opt}</span></label>{/each}</div></div>
        <div class="form-card-section"><label class="field-label">Time Preference *</label>
          <div class="radio-group">
            {#each ['Morning','Afternoon','Evening','No Preference','Other'] as opt}
              <label class="radio-opt"><input type="radio" name="o-timepref" value={opt} bind:group={oTimePref}/><span>{opt}</span></label>
            {/each}
          </div>
          {#if oTimePref==='Other'}<input class="ds-input" style="margin-top:8px" bind:value={oTimePrefOther} placeholder="e.g., Weekends only, Late night, etc."/>{/if}
        </div>
        <div class="field"><label class="field-label">Time Zone *</label>
          <select class="ds-input" bind:value={oTZ}>{#each TZS as tz}<option value={tz}>{tz}</option>{/each}</select></div>
        <div class="field"><label class="field-label">Links</label>
          <div class="chip-input-row">
            <input class="ds-input" bind:value={oLinkIn} placeholder="Add links (press Enter to add)"
              onkeydown={(e)=>{if(e.key==='Enter'){e.preventDefault();[oLinks,oLinkIn]=addLink(oLinks,oLinkIn);}}}/>
            <button type="button" class="btn-ghost" onclick={() => {[oLinks,oLinkIn]=addLink(oLinks,oLinkIn);}}>Add</button>
          </div>
          <div class="chip-list">
            {#each oLinks as l,i}<span class="link-chip">{l}<button type="button" onclick={()=>oLinks=oLinks.filter((_,idx)=>idx!==i)}>×</button></span>{/each}
          </div></div>
        <div class="field"><label class="field-label">Organization (optional)</label>
          <select class="ds-input" bind:value={oOrg}><option value="">No organization</option>{#each ORGS as o}<option value={o.id}>{o.name}</option>{/each}</select></div>
        <div class="form-actions">
          <button type="button" class="btn-ghost" onclick={() => navigate('offers')}>Cancel</button>
          <button type="button" class="btn-ds btn-ds--warning" onclick={() => navigate('offers')}>💡 {route === 'offer-create' ? 'Create Offer' : 'Save Changes'}</button>
        </div>
      </form>
    </div>

  <!-- ── MY LISTINGS ── -->
  {:else if route === 'my-listings'}
    <div class="page">
      <div class="page-header">
        <div><h1 class="ds-h2">My Listings</h1><p class="ds-small">Manage your requests and offers</p></div>
      </div>
      <div class="tab-group" style="margin-bottom:20px">
        <button class="tab {myTab==='requests'?'tab--primary':''}" onclick={() => myTab='requests'}>📝 My Requests ({REQUESTS.filter(r=>r.creator.id===ME.id).length})</button>
        <button class="tab {myTab==='offers'?'tab--warning':''}"   onclick={() => myTab='offers'}>💡 My Offers ({OFFERS.filter(o=>o.creator.id===ME.id).length})</button>
      </div>
      <div class="listings-grid">
        {#if myTab === 'requests'}
          {#each REQUESTS.filter(r=>r.creator.id===ME.id) as req}
            <div class="listing-card listing-card--managed">
              <div class="listing-head"><ds-chip tone="secondary">📝 Request</ds-chip>{#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}</div>
              <button class="listing-title-btn" onclick={() => navigate('request-detail', req.id)}>{req.title}</button>
              <p class="listing-desc">{req.description}</p>
              <div class="listing-managed-actions">
                <button class="btn-ghost btn-ghost--sm" onclick={() => navigate('request-edit', req.id)}>Edit</button>
                <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-warning-600))">{req.status==='active'?'Archive':'Restore'}</button>
                <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Delete</button>
              </div>
            </div>
          {/each}
        {:else}
          {#each OFFERS.filter(o=>o.creator.id===ME.id) as offer}
            <div class="listing-card listing-card--managed">
              <div class="listing-head"><ds-chip tone="warning">💡 Offer</ds-chip>{#if offer.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}</div>
              <button class="listing-title-btn" onclick={() => navigate('offer-detail', offer.id)}>{offer.title}</button>
              <p class="listing-desc">{offer.description}</p>
              <div class="listing-managed-actions">
                <button class="btn-ghost btn-ghost--sm" onclick={() => navigate('offer-edit', offer.id)}>Edit</button>
                <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-warning-600))">{offer.status==='active'?'Archive':'Restore'}</button>
                <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Delete</button>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>

  <!-- ── USERS ── -->
  {:else if route === 'users'}
    <div class="page">
      <div class="page-header">
        <h1 class="ds-h2">Users</h1>
        {#if !hasProfile}<button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => navigate('user-create')}>Create Profile</button>{/if}
      </div>
      <table class="data-table">
        <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th></th></tr></thead>
        <tbody>
          {#each USERS.filter(u=>u.status==='accepted') as u}
            <tr>
              <td><div class="av av--sm">{u.name[0]}</div></td>
              <td class="td-name">{u.name} {#if u.id===ME.id}<span class="badge-you">you</span>{/if}</td>
              <td><span class="badge-type">{u.type}</span></td>
              <td class="td-muted">{u.location}</td>
              <td><button class="btn-ghost btn-ghost--sm" onclick={() => navigate('user-profile', u.id)}>View Profile</button></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  <!-- ── USER PROFILE ── -->
  {:else if route === 'user-profile'}
    {@const u = currentUser}
    <div class="page">
      <div class="detail-nav">
        <button class="btn-ghost" onclick={() => navigate('users')}>← Back</button>
        {#if u.id === ME.id}<button class="btn-ghost" onclick={() => navigate('user-edit', u.id)}>Edit Profile</button>{/if}
      </div>
      <div class="profile-header">
        <div class="av av--xl">{u.name[0]}</div>
        <div class="profile-header-info">
          <h1 class="ds-h2">{u.name}</h1>
          <div class="profile-meta">
            <ds-chip tone="surface">{u.type}</ds-chip>
            <span class="ds-small">📍 {u.location}</span>
            {#if u.status === 'pending'}
              <ds-chip tone="warning">Pending Review</ds-chip>
            {:else}
              <span class="ds-small" style="color:rgb(var(--color-success-600))">● Accepted</span>
            {/if}
          </div>
          <p class="ds-p">{@html md(u.bio)}</p>
        </div>
      </div>
      <section style="margin-bottom:24px">
        <h3 class="ds-h4" style="margin-bottom:12px">Active Requests ({REQUESTS.filter(r=>r.creator.id===u.id&&r.status==='active').length})</h3>
        <div class="listings-grid">
          {#each REQUESTS.filter(r=>r.creator.id===u.id&&r.status==='active') as req}
            <button class="listing-card" onclick={() => navigate('request-detail', req.id)}>
              <h3 class="listing-title">{req.title}</h3>
              <div class="listing-tags">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            </button>
          {:else}<p class="ds-small">No active requests.</p>{/each}
        </div>
      </section>
      <section>
        <h3 class="ds-h4" style="margin-bottom:12px">Active Offers ({OFFERS.filter(o=>o.creator.id===u.id&&o.status==='active').length})</h3>
        <div class="listings-grid">
          {#each OFFERS.filter(o=>o.creator.id===u.id&&o.status==='active') as offer}
            <button class="listing-card" onclick={() => navigate('offer-detail', offer.id)}>
              <h3 class="listing-title">{offer.title}</h3>
              <div class="listing-tags">{#each offer.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            </button>
          {:else}<p class="ds-small">No active offers.</p>{/each}
        </div>
      </section>
    </div>

  <!-- ── CREATE / EDIT USER PROFILE ── -->
  {:else if route === 'user-create' || route === 'user-edit'}
    <div class="page">
      <div class="detail-nav"><button class="btn-ghost" onclick={() => navigate('home')}>← Back</button></div>
      <h1 class="ds-h2" style="margin-bottom:24px">{route === 'user-create' ? 'Create User Profile' : 'Edit User'}</h1>
      <form class="form-card" onsubmit={(e) => e.preventDefault()}>
        {#if route === 'user-create'}<p class="ds-small form-note">* required fields</p>{/if}
        <div class="file-drop-area">
          <div class="av av--xl" style="margin:0 auto 8px">{pName?pName[0]:'?'}</div>
          <button type="button" class="btn-ghost btn-ghost--sm">Upload Picture</button>
          <p class="ds-small" style="margin-top:4px;color:rgb(var(--fg-3))">Accepts: JPG, PNG, WebP</p>
        </div>
        <div class="form-row-2">
          <div class="field"><label class="field-label">Name *</label><input class="ds-input" bind:value={pName} placeholder="Your full name"/></div>
          <div class="field"><label class="field-label">Nickname *</label><input class="ds-input" bind:value={pNick} placeholder="@handle"/></div>
        </div>
        <div class="field"><label class="field-label">Bio <span class="field-hint">Markdown supported · max 1000 chars</span></label>
          <textarea class="ds-input" rows="4" bind:value={pBio} placeholder="Tell us about yourself... (Markdown supported)" maxlength="1000"></textarea>
          <div class="char-count">{pBio.length}/1000</div></div>
        <div class="form-card-section"><label class="field-label">User Type *</label>
          <div class="radio-group">
            <label class="radio-opt"><input type="radio" name="p-type" value="advocate" bind:group={pType}/><span><strong>Advocate</strong> — supports and promotes the community</span></label>
            <label class="radio-opt"><input type="radio" name="p-type" value="creator"  bind:group={pType}/><span><strong>Creator</strong>   — actively creates requests and offers</span></label>
          </div></div>
        <div class="form-row-2">
          <div class="field"><label class="field-label">Email *</label><input type="email" class="ds-input" bind:value={pEmail} placeholder="you@example.com"/></div>
          <div class="field"><label class="field-label">Phone</label><input type="tel" class="ds-input" bind:value={pPhone} placeholder="+33 6 12 34 56 78"/></div>
        </div>
        <div class="form-row-2">
          <div class="field"><label class="field-label">Location</label><input class="ds-input" bind:value={pLoc} placeholder="City, Country"/></div>
          <div class="field"><label class="field-label">Time Zone *</label><select class="ds-input" bind:value={pTZ}>{#each TZS as tz}<option value={tz}>{tz}</option>{/each}</select></div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-ghost" onclick={() => navigate('home')}>Cancel</button>
          <button type="button" class="btn-ds btn-ds--primary" onclick={() => { hasProfile = true; navigate('home'); }}>
            👤 {route === 'user-create' ? 'Create Profile' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>

  <!-- ── ORGANIZATIONS ── -->
  {:else if route === 'orgs'}
    <div class="page">
      <div class="page-header">
        <h1 class="ds-h2">Organizations</h1>
        <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => navigate('org-create')}>+ Create Organization</button>
      </div>
      <div class="listings-grid">
        {#each ORGS as org}
          <button class="listing-card" onclick={() => navigate('org-detail', org.id)}>
            <div class="org-logo">{org.name[0]}</div>
            <h3 class="listing-title">{org.name}</h3>
            <p class="listing-desc">{org.description}</p>
            <div class="listing-foot">
              <span class="ds-small">👥 {org.members} members</span>
              <span class="ds-small">📍 {org.location}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>

  <!-- ── ORG DETAIL ── -->
  {:else if route === 'org-detail'}
    {@const org = currentOrg}
    <div class="page">
      <div class="detail-nav">
        <button class="btn-ghost" onclick={() => navigate('orgs')}>← Back</button>
        <button class="btn-ghost" onclick={() => navigate('org-edit', org.id)}>Edit</button>
        <button class="btn-ghost btn-ghost--danger">Leave Organization</button>
      </div>
      <div class="org-detail-header">
        <div class="org-logo-lg">{org.name[0]}</div>
        <div>
          <h1 class="ds-h2">{org.name}</h1>
          <span class="ds-small">📍 {org.location} · ✉️ {org.email}</span>
        </div>
      </div>
      <p class="ds-p" style="margin-bottom:24px">{@html md(org.description)}</p>
      <div class="tab-group" style="margin-bottom:16px">
        {#each ['members','coordinators','requests','offers'] as t}
          <button class="tab {orgTab===t?'tab--primary':''}" onclick={() => orgTab = t as typeof orgTab}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        {/each}
      </div>
      {#if orgTab === 'members' || orgTab === 'coordinators'}
        <div class="page-header" style="margin-bottom:12px">
          <span class="ds-small">{orgTab === 'members' ? 'Members' : 'Coordinators'}</span>
          <button class="btn-ds btn-ds--primary btn-ds--sm">+ Add {orgTab === 'members' ? 'Member' : 'Coordinator'}</button>
        </div>
        <table class="data-table">
          <thead><tr><th></th><th>Name</th><th>Type</th><th></th></tr></thead>
          <tbody>
            {#each USERS.slice(0,3) as u}
              <tr>
                <td><div class="av av--sm">{u.name[0]}</div></td>
                <td class="td-name">{u.name}</td>
                <td><span class="badge-type">{u.type}</span></td>
                <td><button class="btn-ghost btn-ghost--sm" onclick={() => navigate('user-profile', u.id)}>View</button></td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if orgTab === 'requests'}
        <div class="page-header" style="margin-bottom:12px">
          <span class="ds-small">Requests from {org.name}</span>
          <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => navigate('request-create')}>+ New Request</button>
        </div>
        <div class="listings-grid">
          {#each REQUESTS.filter(r=>r.org?.id===org.id) as req}
            <button class="listing-card" onclick={() => navigate('request-detail', req.id)}>
              <h3 class="listing-title">{req.title}</h3>
              <div class="listing-tags">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            </button>
          {:else}<p class="ds-small">No requests from this organization.</p>{/each}
        </div>
      {:else}
        <div class="page-header" style="margin-bottom:12px">
          <span class="ds-small">Offers from {org.name}</span>
          <button class="btn-ds btn-ds--warning btn-ds--sm" onclick={() => navigate('offer-create')}>+ New Offer</button>
        </div>
        <p class="ds-small">No offers from this organization yet.</p>
      {/if}
    </div>

  <!-- ── CREATE / EDIT ORG ── -->
  {:else if route === 'org-create' || route === 'org-edit'}
    <div class="page">
      <div class="detail-nav"><button class="btn-ghost" onclick={() => navigate('orgs')}>← Back</button></div>
      <h1 class="ds-h2" style="margin-bottom:24px">{route === 'org-create' ? 'Create new Organization' : 'Edit Organization'}</h1>
      <form class="form-card" onsubmit={(e) => e.preventDefault()}>
        {#if route === 'org-create'}<p class="ds-small form-note">* required fields</p>{/if}
        <div class="file-drop-area">
          <div class="org-logo-lg" style="margin:0 auto 8px">?</div>
          <button type="button" class="btn-ghost btn-ghost--sm">Upload Logo</button>
        </div>
        <div class="field"><label class="field-label">Name *</label><input class="ds-input" bind:value={orgName} placeholder="Organization name"/></div>
        <div class="field"><label class="field-label">Full Legal Name *</label><input class="ds-input" bind:value={orgLegal} placeholder="Official legal name of your organization"/></div>
        <div class="field"><label class="field-label">Email *</label><input type="email" class="ds-input" bind:value={orgEmail} placeholder="contact@org.example"/></div>
        <div class="field"><label class="field-label">Vision / Mission * <span class="field-hint">Markdown supported · max 1000 chars</span></label>
          <textarea class="ds-input" rows="6" bind:value={orgDesc} placeholder="Describe your organization's vision and mission... (Markdown supported)" maxlength="1000"></textarea>
          <div class="char-count">{orgDesc.length}/1000</div></div>
        <div class="field"><label class="field-label">Location *</label><input class="ds-input" bind:value={orgLoc} placeholder="City, Country"/></div>
        <div class="field"><label class="field-label">URLs <span class="field-hint">website, x, github, other... (comma-separated)</span></label>
          <input class="ds-input" bind:value={orgUrls} placeholder="https://org.example, https://github.com/org"/></div>
        {#if route === 'org-create'}
          <div class="form-card-section">
            <label class="radio-opt">
              <input type="checkbox" bind:checked={orgIsContact}/>
              <span>I am the contact person for this organization</span>
            </label>
            {#if orgIsContact}
              <div class="field" style="margin-top:12px"><label class="field-label">Role / Title</label>
                <input class="ds-input" bind:value={orgContactRole} placeholder="e.g. Director, President, Contact Person"/></div>
            {/if}
          </div>
        {/if}
        <div class="form-actions">
          <button type="button" class="btn-ghost" onclick={() => navigate('orgs')}>Cancel</button>
          {#if route === 'org-edit'}<button type="button" class="btn-ghost btn-ghost--danger">Delete Organization</button>{/if}
          <button type="button" class="btn-ds btn-ds--primary" onclick={() => navigate('orgs')}>{route === 'org-create' ? 'Create Organization' : 'Save Organization'}</button>
        </div>
      </form>
    </div>

  <!-- ── SERVICE TYPES ── -->
  {:else if route === 'service-types'}
    <div class="page">
      <div class="page-header">
        <h1 class="ds-h2">Available Service Types</h1>
        <button class="btn-ds btn-ds--ghost btn-ds--sm" onclick={() => navigate('suggest-service-type')}>Suggest a Service Type</button>
      </div>
      <div class="st-grid">
        {#each SERVICE_TYPES as st}
          <div class="st-card">
            <div class="st-card-head">
              <span class="st-name">{st.name}</span>
              <ds-chip tone={st.technical?'tertiary':'surface'}>{st.technical?'Technical':'Non-Technical'}</ds-chip>
            </div>
            <div class="st-actions">
              <button class="btn-ghost btn-ghost--sm" onclick={() => {}}>📋 Copy Name</button>
            </div>
          </div>
        {/each}
      </div>
    </div>

  <!-- ── SUGGEST SERVICE TYPE ── -->
  {:else if route === 'suggest-service-type'}
    <div class="page">
      <div class="detail-nav"><button class="btn-ghost" onclick={() => navigate('service-types')}>← Back</button></div>
      <h1 class="ds-h2" style="margin-bottom:24px">Suggest a Service Type</h1>
      <form class="form-card" onsubmit={(e) => e.preventDefault()}>
        <div class="field"><label class="field-label">Name *</label><input class="ds-input" placeholder="e.g. Graphic Design, Permaculture…"/></div>
        <div class="field"><label class="field-label">Description <span class="field-hint">Markdown supported</span></label>
          <textarea class="ds-input" rows="4" placeholder="Describe this service type and when it applies..."></textarea></div>
        <div class="form-card-section"><label class="field-label">Classification *</label>
          <div class="radio-group">
            <label class="radio-opt"><input type="radio" name="st-class" value="non-technical" checked/><span>Non-Technical</span></label>
            <label class="radio-opt"><input type="radio" name="st-class" value="technical"/><span>Technical</span></label>
          </div></div>
        <div class="form-actions">
          <button type="button" class="btn-ghost" onclick={() => navigate('service-types')}>Cancel</button>
          <button type="button" class="btn-ds btn-ds--primary" onclick={() => navigate('service-types')}>Submit Suggestion</button>
        </div>
      </form>
    </div>

  <!-- ── CONNECTING ── -->
  {:else if route === 'connecting'}
    <div class="centered-screen">
      <div class="info-card">
        <span class="info-icon">🔗</span>
        <h1 class="ds-h3" style="text-align:center;margin:0 0 8px">Connecting to Holochain</h1>
        <p class="ds-small" style="text-align:center;margin-bottom:24px">Establishing a secure peer-to-peer connection…</p>
        <div class="progress-bar"><div class="progress-fill" style="width:66%"></div></div>
        <p class="ds-small" style="text-align:center;margin:8px 0 20px;color:rgb(var(--fg-3))">Step 2 of 3 — hREA Service</p>
        <div class="steps">
          <div class="step step--done">✅<div><div class="step-label">Holochain Connected</div><div class="step-meta">Conductor on port 8888</div></div></div>
          <div class="step step--done">✅<div><div class="step-label">hREA Ready</div><div class="step-meta">ValueFlows DNA loaded</div></div></div>
          <div class="step step--active"><div class="step-spinner"></div><div><div class="step-label">Verifying Identity</div><div class="step-meta">Checking agent key…</div></div></div>
        </div>
        <div style="display:flex;justify-content:center;margin-top:24px">
          <ds-status-dot status="checking"></ds-status-dot>
        </div>
      </div>
    </div>

  <!-- ── PROFILE GUARD ── -->
  {:else if route === 'profile-guard'}
    <div class="centered-screen">
      <div class="info-card">
        <span class="info-icon">🔒</span>
        <h1 class="ds-h3" style="text-align:center;margin:0 0 8px">Profile Required</h1>
        <p class="ds-small" style="text-align:center;margin-bottom:20px">You need a profile to create requests and offers.</p>
        <div class="alert-info">
          <p class="ds-small" style="margin:0">You can still <strong>browse</strong> existing requests and offers without a profile.</p>
        </div>
        <div class="profile-guard-actions">
          <button class="btn-ds btn-ds--primary" onclick={() => navigate('user-create')}>👤 Create My Profile</button>
          <button class="btn-ghost" onclick={() => navigate('requests')}>📝 Browse Requests</button>
          <button class="btn-ghost" onclick={() => navigate('offers')}>💡 Browse Offers</button>
        </div>
        <p class="ds-small" style="text-align:center;margin-top:16px;color:rgb(var(--fg-3))">Your profile is stored on the Holochain network. No central server holds your data.</p>
      </div>
    </div>

  <!-- ── SERVICE TYPE DETAIL ── -->
  {:else if route === 'service-type-detail'}
    {@const st = SERVICE_TYPES.find(s => s.id === payload) ?? SERVICE_TYPES[0]}
    <div class="page">
      <div class="detail-nav">
        <button class="btn-ghost" onclick={() => navigate('service-types')}>← Back</button>
      </div>
      <div class="detail-header">
        <div class="detail-header-top">
          <h1 class="ds-h2">{st.name}</h1>
          <div class="detail-badges">
            <ds-chip tone={st.technical ? 'tertiary' : 'surface'}>{st.technical ? 'Technical' : 'Non-Technical'}</ds-chip>
            <ds-chip tone="success">Approved</ds-chip>
          </div>
        </div>
        <p class="ds-p">Browse all requests and offers that match this service type to connect with community members who share your interests.</p>
      </div>
      <div class="detail-sections">
        <div class="detail-section">
          <h4 class="detail-section-label">Active Requests using this Service Type</h4>
          <div style="display:flex;flex-direction:column;gap:12px">
            {#each REQUESTS.filter(r => r.serviceTypes.includes(st.name) && r.status === 'active') as req}
              <button class="listing-card" onclick={() => navigate('request-detail', req.id)}>
                <div class="listing-card-top"><ds-chip tone="secondary">📝 Request</ds-chip><span class="listing-card-meta">{req.interaction}</span></div>
                <h3 class="listing-card-title">{req.title}</h3>
                <p class="listing-card-desc">{req.description.slice(0,100)}...</p>
              </button>
            {:else}
              <p class="ds-small" style="color:rgb(var(--fg-3))">No active requests for this service type yet.</p>
            {/each}
          </div>
        </div>
        <div class="detail-section">
          <h4 class="detail-section-label">Active Offers using this Service Type</h4>
          <div style="display:flex;flex-direction:column;gap:12px">
            {#each OFFERS.filter(o => o.serviceTypes.includes(st.name) && o.status === 'active') as offer}
              <button class="listing-card" onclick={() => navigate('offer-detail', offer.id)}>
                <div class="listing-card-top"><ds-chip tone="warning">💡 Offer</ds-chip><span class="listing-card-meta">{offer.interaction}</span></div>
                <h3 class="listing-card-title">{offer.title}</h3>
                <p class="listing-card-desc">{offer.description.slice(0,100)}...</p>
              </button>
            {:else}
              <p class="ds-small" style="color:rgb(var(--fg-3))">No active offers for this service type yet.</p>
            {/each}
          </div>
        </div>
      </div>
    </div>

  <!-- ── FALLBACK ── -->
  {:else}
    <div class="page">
      <div class="placeholder">
        <div class="placeholder-icon">🚧</div>
        <h2 class="ds-h3">{route.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())}</h2>
        <p class="ds-small">This screen is not yet prototyped.</p>
        <button class="btn-ghost" onclick={() => navigate('home')}>← Go Home</button>
      </div>
    </div>
  {/if}

</ds-shell>
{/if}

<!-- ── CONTACT MODAL ── -->
{#if contactModal}
  {@const target = contactModal}
  <div class="modal-backdrop" onclick={closeContactModal} role="button" tabindex="-1" onkeydown={(e) => e.key === 'Escape' && closeContactModal()}>
    <div class="modal-panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
      <button class="modal-close" onclick={closeContactModal} aria-label="Close">✕</button>

      <header class="modal-header">
        <h3 class="ds-h3">🤝 Interested in this {target.listingType}?</h3>
        {#if target.listingTitle}
          <p class="modal-listing-title">"{target.listingTitle}"</p>
        {/if}
        <p class="ds-small" style="color:rgb(var(--fg-3))">Get in touch directly with the contact information below</p>
      </header>

      <div class="modal-body">
        {#if target.org}
          <!-- Org contact -->
          <div class="contact-who">
            <div class="av av--md">{target.org.name[0]}</div>
            <div>
              <div class="contact-name">{target.org.name}</div>
              <div class="contact-role ds-small">Organization</div>
            </div>
          </div>
          <div class="contact-row">
            <span class="contact-icon">📧</span>
            <div class="contact-detail">
              <span class="contact-label ds-small">Email</span>
              <span class="contact-value">{target.org.email}</span>
            </div>
            <button class="btn-ghost btn-ghost--sm" onclick={() => copyToClipboard(target.org!.email)}>📋 Copy</button>
          </div>
        {:else}
          <!-- User contact -->
          <div class="contact-who">
            <div class="av av--md">{target.user.name[0]}</div>
            <div>
              <div class="contact-name">{target.user.name}</div>
              <div class="contact-role ds-small">@{target.user.nickname}</div>
            </div>
          </div>
          {#if target.user.email}
            <div class="contact-row">
              <span class="contact-icon">📧</span>
              <div class="contact-detail">
                <span class="contact-label ds-small">Email</span>
                <span class="contact-value">{target.user.email}</span>
              </div>
              <button class="btn-ghost btn-ghost--sm" onclick={() => copyToClipboard(target.user.email!)}>📋 Copy</button>
            </div>
          {/if}
          {#if target.user.timeZone}
            <div class="contact-row">
              <span class="contact-icon">🌍</span>
              <div class="contact-detail">
                <span class="contact-label ds-small">Time Zone</span>
                <span class="contact-value">{target.user.timeZone}</span>
              </div>
            </div>
          {/if}
        {/if}

        <div class="contact-note">
          <span>💬</span>
          <p class="ds-small">Please reach out respectfully. This is a community mutual aid network — direct, honest communication is encouraged.</p>
        </div>
      </div>

      <footer class="modal-footer">
        <button class="btn-ds btn-ds--ghost" onclick={closeContactModal}>Close</button>
      </footer>
    </div>
  </div>
{/if}

<!-- ── CONFIRM MODAL ── -->
{#if confirmModal}
  {@const target = confirmModal}
  <div class="modal-backdrop" onclick={closeConfirm} role="button" tabindex="-1"
       onkeydown={(e) => e.key === 'Escape' && closeConfirm()}>
    <div class="modal-panel modal-panel--compact" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
      <button class="modal-close" onclick={closeConfirm} aria-label="Close">✕</button>
      <header class="modal-header"><h3 class="ds-h3">⚠️ Confirm Action</h3></header>
      <p class="ds-p" style="text-align:center;margin:0 0 24px">{target.message}</p>
      <footer class="modal-footer" style="display:flex;gap:12px;justify-content:center">
        <button class="btn-ghost" onclick={closeConfirm}>Cancel</button>
        <button class="btn-ds" style="background:rgb(var(--color-error-600));color:#fff" onclick={executeConfirm}>Confirm</button>
      </footer>
    </div>
  </div>
{/if}
</div>

<style>
  /* ── Base ─────────────────────────────────────────────────────────────────── */
  .page         { max-width: 960px; margin: 0 auto; padding: 32px 20px 80px; }
  .page-header  { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
  .centered-screen { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

  /* ── Buttons (plain HTML, reliable onclick) ───────────────────────────────── */
  .btn-ds { display: inline-flex; align-items: center; gap: 8px; border-radius: 9999px; padding: 10px 20px; font: 600 14px/20px var(--font-base); border: 1px solid transparent; cursor: pointer; transition: background-color 150ms, box-shadow 150ms; white-space: nowrap; }
  .btn-ds--primary   { background: rgb(var(--color-primary-500)); color: #fff; }
  .btn-ds--primary:hover { background: rgb(var(--color-primary-600)); }
  .btn-ds--secondary { background: rgb(var(--color-secondary-500)); color: #111; }
  .btn-ds--secondary:hover { background: rgb(var(--color-secondary-400)); }
  .btn-ds--warning   { background: rgb(var(--color-warning-500)); color: #111; }
  .btn-ds--warning:hover { background: rgb(var(--color-warning-400)); }
  .btn-ds--ghost     { background: transparent; color: rgb(var(--color-primary-700)); border-color: rgb(var(--color-primary-300)); }
  .btn-ds--ghost:hover { background: rgb(var(--color-primary-50)); }
  .btn-ds--error     { background: rgb(var(--color-error-500)); color: #fff; }
  .btn-ds--sm { padding: 6px 14px; font-size: 13px; }
  .btn-ghost { padding: 5px 12px; border-radius: 7px; border: 1px solid rgb(var(--border-1)); background: #fff; color: rgb(var(--fg-2)); font: 500 12px/18px var(--font-base); cursor: pointer; transition: background 100ms; }
  .btn-ghost:hover { background: rgb(var(--bg-muted)); color: rgb(var(--fg-1)); }
  .btn-ghost--sm { padding: 3px 9px; font-size: 11px; }
  .btn-ghost--danger { color: rgb(var(--color-error-600)); }
  .btn-ghost--danger:hover { background: rgb(var(--color-error-50)); }

  /* ── Admin shell ──────────────────────────────────────────────────────────── */
  .admin-wrap  { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
  .admin-sidebar { background: rgb(var(--color-surface-900)); display: flex; flex-direction: column; padding: 16px 12px; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
  .admin-logo  { display: flex; align-items: center; gap: 10px; color: #fff; font: 700 15px/20px var(--font-base); padding: 4px 8px; margin-bottom: 20px; }
  .admin-nav   { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .admin-nav-item { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 7px; border: none; background: none; color: rgba(255,255,255,.65); font: 500 13px/18px var(--font-base); cursor: pointer; text-align: left; transition: background 100ms, color 100ms; }
  .admin-nav-item:hover { background: rgba(255,255,255,.08); color: #fff; }
  .admin-nav-item.is-active { background: rgba(255,255,255,.14); color: #fff; }
  .admin-sidebar-foot { padding-top: 12px; border-top: 1px solid rgba(255,255,255,.1); }
  .admin-exit  { width: 100%; background: none; border: none; color: rgba(255,255,255,.5); font: 500 12px/18px var(--font-base); cursor: pointer; padding: 6px 10px; border-radius: 6px; text-align: left; }
  .admin-exit:hover { color: #fff; background: rgba(255,255,255,.06); }
  .admin-main  { background: rgb(var(--color-surface-800)); padding: 28px; overflow-y: auto; }
  .admin-page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .admin-page-title  { margin: 0; font: 700 22px/28px var(--font-base); color: #fff; }
  .stats-grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px,1fr)); gap: 12px; margin-bottom: 28px; }
  .stat-card   { background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; padding: 18px; text-align: center; }
  .stat-icon   { font-size: 24px; display: block; margin-bottom: 8px; }
  .stat-value  { font: 700 28px/32px var(--font-base); color: #fff; }
  .stat-label  { font: 500 12px/16px var(--font-base); color: rgba(255,255,255,.55); margin-top: 4px; }
  .admin-section { background: rgba(255,255,255,.05); border-radius: 12px; padding: 20px; }
  .admin-section-title { margin: 0 0 12px; font: 600 16px/22px var(--font-base); color: #fff; }
  .admin-tabs  { display: flex; gap: 2px; margin-bottom: 16px; }
  .admin-tab   { padding: 5px 14px; border-radius: 6px; border: none; background: none; color: rgba(255,255,255,.55); font: 500 13px/20px var(--font-base); cursor: pointer; }
  .admin-tab.is-active { background: rgba(255,255,255,.12); color: #fff; }
  .moderation-row  { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 8px; background: rgba(255,255,255,.05); margin-bottom: 4px; }
  .moderation-info { flex: 1; }
  .moderation-name { font: 600 14px/20px var(--font-base); color: #fff; }
  .moderation-meta { font: 400 12px/16px var(--font-base); color: rgba(255,255,255,.5); }
  .moderation-actions { display: flex; gap: 6px; }
  .admin-cat   { padding: 16px; margin-bottom: 16px; background: rgba(255,255,255,.04); border-radius: 10px; }
  .admin-cat-label { margin: 0 0 12px; font: 600 13px/18px var(--font-base); color: rgba(255,255,255,.7); }
  .admin-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); }
  .admin-table th { text-align: left; padding: 6px 10px; color: rgba(255,255,255,.4); font: 600 11px/14px var(--font-base); text-transform: uppercase; letter-spacing: .06em; border-bottom: 1px solid rgba(255,255,255,.08); }
  .admin-table td { padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,.06); color: rgba(255,255,255,.8); vertical-align: middle; }
  .admin-table tr:hover td { background: rgba(255,255,255,.04); }
  .empty-note  { color: rgba(255,255,255,.35); font: 400 13px/18px var(--font-base); padding: 12px 0; margin: 0; }

  /* ── Tabs / filters ──────────────────────────────────────────────────────── */
  .tab-group   { display: flex; gap: 4px; }
  .tab         { padding: 7px 16px; border-radius: 8px; border: 1px solid rgb(var(--border-1)); background: #fff; color: rgb(var(--fg-2)); font: 500 13px/20px var(--font-base); cursor: pointer; transition: all 100ms; }
  .tab--primary { background: rgb(var(--color-primary-500)); color: #fff; border-color: rgb(var(--color-primary-500)); }
  .tab--warning { background: rgb(var(--color-warning-500)); color: #111; border-color: rgb(var(--color-warning-500)); }
  .filter-row  { display: flex; gap: 6px; margin-bottom: 16px; }
  .filter-chip { padding: 4px 12px; border-radius: 9999px; border: 1px solid rgb(var(--border-1)); background: #fff; color: rgb(var(--fg-2)); font: 500 12px/18px var(--font-base); cursor: pointer; transition: all 100ms; }
  .filter-chip--active { background: rgb(var(--color-primary-500)); color: #fff; border-color: transparent; }
  .filter-chip--warn   { background: rgb(var(--color-warning-500)); color: #111; border-color: transparent; }

  /* ── Home ────────────────────────────────────────────────────────────────── */
  .home-hero   { display: flex; flex-direction: column; align-items: center; gap: 16px; text-align: center; padding: 48px 0 32px; }
  .action-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 16px; margin-bottom: 40px; }
  .action-card { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 24px; box-shadow: var(--shadow-md); text-align: center; cursor: pointer; display: flex; flex-direction: column; align-items: center; transition: box-shadow 150ms, border-color 150ms; }
  .action-card:hover { box-shadow: var(--shadow-lg); border-color: rgb(var(--color-primary-300)); }
  .action-card-icon  { font-size: 40px; margin-bottom: 10px; }
  .action-card-title { margin: 0 0 8px; font: 600 18px/24px var(--font-base); color: rgb(var(--fg-1)); }
  .action-card-desc  { margin: 0 0 14px; font: 400 14px/22px var(--font-base); color: rgb(var(--fg-2)); }
  .action-card-cta   { display: inline-block; border-radius: 9999px; padding: 8px 18px; font: 600 13px/20px var(--font-base); }
  .cta--secondary { background: rgb(var(--color-secondary-500)); color: #111; }
  .cta--warning   { background: rgb(var(--color-warning-500));   color: #111; }
  .cta--tertiary  { background: rgb(var(--color-tertiary-500));  color: #111; }
  .home-welcome { display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
  .quick-cards  { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
  .quick-card   { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: box-shadow 150ms; }
  .quick-card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
  .quick-card-icon  { font-size: 24px; }
  .quick-card-label { font: 600 12px/16px var(--font-base); color: rgb(var(--fg-1)); }
  .quick-card-count { font: 700 20px/24px var(--font-base); color: rgb(var(--color-primary-600)); }
  .home-primary-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
  .home-community h3 { margin-bottom: 12px; }
  .community-links { display: flex; gap: 10px; flex-wrap: wrap; }
  .community-link { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 10px; cursor: pointer; font: 500 13px/18px var(--font-base); transition: box-shadow 100ms; }
  .community-link:hover { box-shadow: var(--shadow-sm); border-color: rgb(var(--color-primary-300)); }

  /* ── Listing cards ───────────────────────────────────────────────────────── */
  .listings-grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 16px; }
  .listing-card   { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 18px; cursor: pointer; display: flex; flex-direction: column; gap: 10px; text-align: left; transition: box-shadow 150ms, border-color 150ms; }
  .listing-card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
  .listing-card--managed { cursor: default; }
  .listing-card--managed:hover { box-shadow: none; border-color: rgb(var(--border-1)); }
  .listing-head   { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .listing-title  { margin: 0; font: 600 16px/22px var(--font-base); color: rgb(var(--fg-1)); }
  .listing-title-btn { background: none; border: none; padding: 0; font: 600 16px/22px var(--font-base); color: rgb(var(--color-primary-700)); cursor: pointer; text-align: left; }
  .listing-title-btn:hover { color: rgb(var(--color-primary-500)); }
  .listing-desc   { margin: 0; font: 400 14px/22px var(--font-base); color: rgb(var(--fg-2)); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .listing-tags   { display: flex; gap: 6px; flex-wrap: wrap; }
  .listing-foot   { display: flex; align-items: center; gap: 8px; }
  .listing-creator { font: 500 12px/16px var(--font-base); color: rgb(var(--fg-2)); }
  .listing-meta   { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); margin-left: auto; }
  .listing-pref   { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); margin-left: auto; }
  .listing-managed-actions { display: flex; gap: 8px; padding-top: 4px; border-top: 1px solid rgb(var(--border-1)); }

  /* ── Detail ──────────────────────────────────────────────────────────────── */
  .detail-nav     { display: flex; gap: 8px; margin-bottom: 20px; }
  .detail-header  { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
  .detail-header-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; }
  .detail-badges  { display: flex; gap: 8px; flex-wrap: wrap; }
  .detail-sections { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
  .detail-section { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 10px; padding: 16px; }
  .detail-section--meta { grid-column: 1/-1; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 12px; }
  .detail-section-label { margin: 0 0 10px; font: 600 11px/14px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: rgb(var(--fg-3)); }
  .tags-row       { display: flex; gap: 6px; flex-wrap: wrap; }
  .meta-row       { display: flex; flex-direction: column; gap: 2px; }
  .meta-label     { font: 600 11px/14px var(--font-base); color: rgb(var(--fg-3)); text-transform: uppercase; letter-spacing: .06em; }
  .meta-value     { font: 500 14px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .creator-card   { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; }
  .creator-info   { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .creator-name   { background: none; border: none; padding: 0; font: 600 15px/20px var(--font-base); color: rgb(var(--color-primary-700)); cursor: pointer; text-align: left; }
  .creator-name:hover { color: rgb(var(--color-primary-500)); }

  /* ── Profile ──────────────────────────────────────────────────────────────── */
  .profile-header      { display: flex; align-items: flex-start; gap: 20px; background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 16px; padding: 28px; margin-bottom: 24px; }
  .profile-header-info { flex: 1; }
  .profile-meta        { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin: 8px 0 12px; }

  /* ── Forms ───────────────────────────────────────────────────────────────── */
  .form-card      { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 16px; padding: 28px; max-width: 680px; display: flex; flex-direction: column; gap: 0; }
  .form-note      { margin: 0 0 16px; color: rgb(var(--fg-3)); }
  .field          { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .field-label    { font: 600 12px/16px var(--font-base); color: rgb(var(--fg-1)); }
  .field-hint     { font: 400 11px/14px var(--font-base); color: rgb(var(--fg-3)); font-weight: 400; }
  .field-error    { font: 600 11px/14px var(--font-base); color: rgb(var(--color-error-600)); }
  .char-count     { font: 400 11px/14px var(--font-base); color: rgb(var(--fg-3)); text-align: right; }
  .form-card-section { background: rgb(var(--bg-muted)); border-radius: 10px; padding: 16px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px; }
  .form-row-2     { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 0; }
  .form-actions   { display: flex; gap: 10px; justify-content: flex-end; padding-top: 16px; border-top: 1px solid rgb(var(--border-1)); margin-top: 8px; }
  .ds-input       { font: 400 14px/20px var(--font-base); border: 1px solid rgb(var(--border-2)); border-radius: 8px; padding: 10px 12px; background: #fff; color: rgb(var(--fg-1)); outline: none; transition: border-color 150ms, box-shadow 150ms; width: 100%; box-sizing: border-box; resize: vertical; font-family: inherit; }
  .ds-input:focus { border-color: rgb(var(--color-primary-500)); box-shadow: 0 0 0 3px rgb(var(--color-primary-200) / .55); }
  .ds-input::placeholder { color: rgb(var(--fg-3)); }
  .radio-group    { display: flex; flex-direction: column; gap: 6px; }
  .radio-opt      { display: flex; align-items: flex-start; gap: 8px; cursor: pointer; font: 400 14px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .radio-opt input { margin-top: 2px; accent-color: rgb(var(--color-primary-500)); }
  .multi-chips    { display: flex; flex-wrap: wrap; gap: 8px; }
  .sel-chip       { padding: 6px 14px; border-radius: 9999px; border: 1px solid rgb(var(--border-2)); background: #fff; color: rgb(var(--fg-2)); font: 500 12px/18px var(--font-base); cursor: pointer; transition: all 100ms; }
  .sel-chip:hover { border-color: rgb(var(--color-primary-400)); color: rgb(var(--color-primary-700)); }
  .sel-chip--on   { background: rgb(var(--color-primary-100)); border-color: rgb(var(--color-primary-400)); color: rgb(var(--color-primary-800)); font-weight: 600; }
  .chip-input-row { display: flex; gap: 8px; }
  .chip-list      { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .link-chip      { display: inline-flex; align-items: center; gap: 4px; background: rgb(var(--color-primary-50)); border: 1px solid rgb(var(--color-primary-200)); color: rgb(var(--color-primary-800)); border-radius: 9999px; padding: 2px 8px 2px 10px; font: 500 12px/18px var(--font-base); }
  .link-chip button { background: none; border: none; color: rgb(var(--color-primary-500)); cursor: pointer; font-size: 14px; padding: 0; line-height: 1; }
  .file-drop-area { background: rgb(var(--bg-muted)); border: 2px dashed rgb(var(--border-2)); border-radius: 10px; padding: 24px; text-align: center; margin-bottom: 16px; display: flex; flex-direction: column; align-items: center; gap: 8px; }

  /* ── Users / tables ──────────────────────────────────────────────────────── */
  .data-table     { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; overflow: hidden; }
  .data-table th  { text-align: left; padding: 10px 14px; font: 600 12px/16px var(--font-base); color: rgb(var(--fg-3)); text-transform: uppercase; letter-spacing: .06em; border-bottom: 1px solid rgb(var(--border-1)); background: rgb(var(--bg-muted)); }
  .data-table td  { padding: 12px 14px; border-bottom: 1px solid rgb(var(--border-1)); vertical-align: middle; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: rgb(var(--color-primary-50)); cursor: pointer; }
  .td-name  { font: 600 14px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .td-muted { font: 400 13px/18px var(--font-base); color: rgb(var(--fg-2)); }
  .badge-type { font: 600 11px/14px var(--font-base); text-transform: capitalize; background: rgb(var(--color-surface-100)); color: rgb(var(--color-surface-800)); padding: 2px 8px; border-radius: 9999px; }
  .badge-you  { font: 600 10px/14px var(--font-base); background: rgb(var(--color-primary-100)); color: rgb(var(--color-primary-800)); padding: 1px 6px; border-radius: 9999px; margin-left: 6px; }
  .status-badge    { padding: 2px 8px; border-radius: 9999px; font: 600 11px/16px var(--font-base); }
  .status-active   { background: rgb(var(--color-success-100)); color: rgb(var(--color-success-800)); }
  .status-archived { background: rgb(var(--color-warning-100)); color: rgb(var(--color-warning-800)); }

  /* ── Avatars ─────────────────────────────────────────────────────────────── */
  .av       { border-radius: 9999px; background: rgb(var(--color-primary-200)); color: rgb(var(--color-primary-800)); display: grid; place-items: center; font-weight: 700; flex-shrink: 0; }
  .av--xs   { width: 24px; height: 24px; font-size: 10px; }
  .av--sm   { width: 32px; height: 32px; font-size: 13px; }
  .av--md   { width: 48px; height: 48px; font-size: 20px; }
  .av--lg   { width: 56px; height: 56px; font-size: 24px; }
  .av--xl   { width: 72px; height: 72px; font-size: 30px; }

  /* ── Orgs ────────────────────────────────────────────────────────────────── */
  .org-logo       { width: 48px; height: 48px; border-radius: 12px; background: rgb(var(--color-primary-200)); color: rgb(var(--color-primary-800)); display: grid; place-items: center; font: 700 20px/1 var(--font-base); margin-bottom: 8px; }
  .org-logo-lg    { width: 64px; height: 64px; border-radius: 14px; background: rgb(var(--color-primary-200)); color: rgb(var(--color-primary-800)); display: grid; place-items: center; font: 700 28px/1 var(--font-base); flex-shrink: 0; }
  .org-detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }

  /* ── Service types ────────────────────────────────────────────────────────── */
  .st-grid       { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 12px; }
  .st-card       { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 10px; padding: 16px; }
  .st-card-head  { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
  .st-name       { font: 600 15px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .st-actions    { display: flex; gap: 6px; }

  /* ── Connecting / Profile Guard ───────────────────────────────────────────── */
  .info-card  { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 16px; padding: 40px 32px; max-width: 420px; width: 100%; display: flex; flex-direction: column; }
  .info-icon  { font-size: 48px; text-align: center; display: block; margin-bottom: 16px; }
  .progress-bar  { height: 8px; background: rgb(var(--border-1)); border-radius: 9999px; overflow: hidden; margin-bottom: 8px; }
  .progress-fill { height: 100%; background: rgb(var(--color-primary-500)); border-radius: 9999px; }
  .steps    { display: flex; flex-direction: column; gap: 10px; }
  .step     { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border-radius: 8px; background: rgb(var(--bg-muted)); font-size: 18px; }
  .step--active { background: rgb(var(--color-primary-50)); border: 1px solid rgb(var(--color-primary-200)); }
  .step-label { font: 600 14px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .step-meta  { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); }
  .step-spinner { width: 18px; height: 18px; border-radius: 50%; border: 2px solid rgb(var(--color-primary-200)); border-top-color: rgb(var(--color-primary-600)); animation: spin 800ms linear infinite; flex-shrink: 0; margin-top: 2px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .alert-info  { background: rgb(var(--color-tertiary-50)); border: 1px solid rgb(var(--color-tertiary-200)); border-radius: 10px; padding: 14px 16px; margin-bottom: 20px; }
  .profile-guard-actions { display: flex; flex-direction: column; gap: 10px; }

  /* ── Placeholders / empty ─────────────────────────────────────────────────── */
  .placeholder      { text-align: center; padding: 80px 20px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .placeholder-icon { font-size: 48px; }
  .empty  { text-align: center; padding: 48px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px; }

  /* ── Contact Modal ────────────────────────────────────────────────────────── */
  .modal-backdrop {
    position: fixed; inset: 0; z-index: 9000;
    background: rgba(0,0,0,.55); backdrop-filter: blur(3px);
    display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal-panel {
    background: #fff; border-radius: 20px; max-width: 440px; width: 100%;
    box-shadow: 0 24px 64px rgba(0,0,0,.2);
    position: relative; padding: 32px;
    animation: modal-in 150ms ease;
  }
  .modal-panel--compact { max-width: 360px; padding: 28px; }
  @keyframes modal-in { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }
  .modal-close {
    position: absolute; top: 16px; right: 16px;
    width: 32px; height: 32px; border-radius: 50%; border: none;
    background: rgb(var(--bg-muted)); color: rgb(var(--fg-2)); cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .modal-close:hover { background: rgb(var(--border-1)); }
  .modal-header { text-align: center; margin-bottom: 24px; }
  .modal-listing-title { font: 500 14px/20px var(--font-base); color: rgb(var(--fg-3)); font-style: italic; margin: 6px 0 8px; }
  .modal-body { display: flex; flex-direction: column; gap: 12px; }
  .modal-footer { margin-top: 24px; text-align: center; }
  .contact-who { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: rgb(var(--bg-muted)); border-radius: 12px; }
  .contact-name { font: 600 15px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .contact-role { color: rgb(var(--fg-3)); }
  .contact-row {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px; background: rgb(var(--bg-muted)); border-radius: 12px;
  }
  .contact-icon { font-size: 20px; flex-shrink: 0; }
  .contact-detail { flex: 1; min-width: 0; }
  .contact-label { display: block; color: rgb(var(--fg-3)); margin-bottom: 2px; }
  .contact-value { font: 500 14px/20px var(--font-mono); color: rgb(var(--fg-1)); word-break: break-all; }
  .contact-note {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 14px 16px; background: rgb(var(--color-primary-50)); border: 1px solid rgb(var(--color-primary-100)); border-radius: 12px;
  }
  .btn-ghost--sm { padding: 6px 10px; font-size: 12px; flex-shrink: 0; }
</style>
