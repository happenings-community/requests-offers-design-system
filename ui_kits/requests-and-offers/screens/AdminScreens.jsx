/* eslint-disable */
const { useState: useStateAdmin } = React;

// ── Admin sidebar items ─────────────────────────────────────────────────────
const ADMIN_NAV = [
  { key:'admin',              label:'Dashboard',           ic:'🏠' },
  { key:'admin-mediums',      label:'Mediums of Exchange', ic:'💱' },
  { key:'admin-service-types',label:'Service Types',       ic:'🏷️' },
  { key:'admin-orgs',         label:'Organizations',       ic:'🏢' },
  { key:'admin-requests',     label:'Requests',            ic:'📝' },
  { key:'admin-offers',       label:'Offers',              ic:'💡' },
  { key:'admin-administrators',label:'Administrators',     ic:'🛡️' },
];

// ── Admin Shell ─────────────────────────────────────────────────────────────
function AdminShell({ current, onNavigate, children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <span>⚙️</span><span>Admin</span>
        </div>
        {ADMIN_NAV.map(item=>(
          <button key={item.key}
            className={`admin-nav-item ${current===item.key?'admin-nav-item--active':''}`}
            onClick={()=>onNavigate(item.key)}>
            <span>{item.ic}</span>{item.label}
          </button>
        ))}
        <div style={{marginTop:'auto', padding:'16px', borderTop:'1px solid rgba(255,255,255,.1)'}}>
          <button className="btn btn-on-violet btn-sm" style={{width:'100%'}} onClick={()=>onNavigate('home')}>← Exit Admin</button>
        </div>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}

// ── Admin Dashboard ─────────────────────────────────────────────────────────
function AdminDashboard({ onNavigate }) {
  const [tab, setTab] = useStateAdmin('users');
  const pending    = MOCK_USERS.filter(u=>u.status==='pending');
  const pendingOrgs= MOCK_ORGS.filter(o=>o.status==='pending');

  return (
    <AdminShell current="admin" onNavigate={onNavigate}>
      <h1 className="admin-page-title">Admin Dashboard</h1>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24}}>
        {[
          { n:1,                  label:'Administrators',     sub:'⚙️' },
          { n:MOCK_USERS.length,  label:'Total Users',        sub:'👥' },
          { n:MOCK_ORGS.length,   label:'Organizations',      sub:'🏢' },
          { n:MOCK_MEDIUMS.filter(m=>m.status==='approved').length, label:'Active Mediums', sub:'💱' },
        ].map(s=>(
          <div key={s.label} className="admin-stat">
            <div className="admin-stat__ic">{s.sub}</div>
            <div className="admin-stat__n">{s.n}</div>
            <div className="admin-stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{margin:'0 0 14px', font:'600 18px/24px var(--font-base)', color:'#fff'}}>Moderation Queue</h2>
        <div style={{display:'flex', gap:8, marginBottom:14}}>
          <button className={`btn btn-sm ${tab==='users'?'btn-error':'btn-on-violet'}`} onClick={()=>setTab('users')}>
            Pending Users ({pending.length})
          </button>
          <button className={`btn btn-sm ${tab==='orgs'?'btn-error':'btn-on-violet'}`} onClick={()=>setTab('orgs')}>
            Pending Orgs ({pendingOrgs.length})
          </button>
        </div>
        {tab==='users' && (
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {pending.map(u=>(
              <div key={u.id} className="admin-queue-row">
                <span className="avatar"><span>{u.initial}</span></span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, color:'rgb(var(--color-primary-300))', cursor:'pointer'}} onClick={()=>window.happenings?.openModal({type:'user-detail', userId:u.id, onNavigate})}>{u.name}</div>
                  <div style={{fontSize:12, color:'rgba(255,255,255,.5)'}}>@{u.nickname} · {u.location}</div>
                </div>
                <button className="btn btn-sm btn-success-admin">Approve</button>
                <button className="btn btn-sm btn-warn-admin">Reject</button>
              </div>
            ))}
            {pending.length===0 && <p style={{color:'rgba(255,255,255,.5)', fontSize:14}}>No pending users. 🎉</p>}
          </div>
        )}
        {tab==='orgs' && (
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            {pendingOrgs.map(o=>(
              <div key={o.id} className="admin-queue-row">
                <span className="avatar" style={{background:'rgb(var(--color-secondary-300))', color:'rgb(var(--color-secondary-900))'}}><span>{o.initial}</span></span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600, color:'rgb(var(--color-primary-300))', cursor:'pointer'}} onClick={()=>window.happenings?.openModal({type:'org-detail', orgId:o.id, onNavigate})}>{o.name}</div>
                  <div style={{fontSize:12, color:'rgba(255,255,255,.5)'}}>📍 {o.location}</div>
                </div>
                <button className="btn btn-sm btn-success-admin">Approve</button>
                <button className="btn btn-sm btn-warn-admin">Reject</button>
              </div>
            ))}
            {pendingOrgs.length===0 && <p style={{color:'rgba(255,255,255,.5)', fontSize:14}}>No pending organizations.</p>}
          </div>
        )}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16}}>
        {ADMIN_NAV.filter(n=>n.key!=='admin').map(n=>(
          <button key={n.key} className="admin-shortcut" onClick={()=>onNavigate(n.key)}>
            <span style={{fontSize:22}}>{n.ic}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </div>
    </AdminShell>
  );
}

// ── Mediums of Exchange ─────────────────────────────────────────────────────
function AdminMediums({ onNavigate }) {
  const [tab, setTab] = useStateAdmin('approved');
  const [mediums, setMediums] = useStateAdmin([...MOCK_MEDIUMS]);

  const filtered = mediums.filter(m=>tab==='all'?true:m.status===tab);

  const approve = id => setMediums(ms=>ms.map(m=>m.id===id?{...m,status:'approved'}:m));
  const reject  = id => setMediums(ms=>ms.map(m=>m.id===id?{...m,status:'rejected'}:m));

  const tabs = [
    { key:'pending',  label:`Pending (${mediums.filter(m=>m.status==='pending').length})` },
    { key:'approved', label:`Approved (${mediums.filter(m=>m.status==='approved').length})` },
    { key:'rejected', label:`Rejected (${mediums.filter(m=>m.status==='rejected').length})` },
    { key:'all',      label:`All (${mediums.length})` },
  ];

  return (
    <AdminShell current="admin-mediums" onNavigate={onNavigate}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <h1 className="admin-page-title" style={{marginBottom:4}}>Mediums of Exchange</h1>
          <p style={{color:'rgba(255,255,255,.55)', fontSize:13, margin:0}}>Create, review, and approve currencies and exchange methods.</p>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-on-violet btn-sm">🔄 Refresh</button>
          <button className="btn btn-secondary btn-sm">Create New</button>
        </div>
      </div>

      <div className="admin-card">
        <div className="tab-row" style={{borderBottomColor:'rgba(255,255,255,.15)', marginBottom:16}}>
          {tabs.map(t=>(
            <button key={t.key} className={`tab-btn ${tab===t.key?'tab-btn--active':''}`}
              style={{color: tab===t.key?'rgb(var(--color-secondary-400))':'rgba(255,255,255,.55)'}}
              onClick={()=>setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {filtered.length===0 ? (
          <div style={{textAlign:'center', padding:'32px 0', color:'rgba(255,255,255,.4)'}}>
            No {tab} mediums of exchange.
            {tab==='pending' && <div style={{marginTop:12}}><button className="btn btn-secondary btn-sm">Create First</button></div>}
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Code</th><th>Description</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(m=>(
                <tr key={m.id}>
                  <td style={{fontWeight:600, color:'#fff'}}>{m.name}</td>
                  <td><code style={{fontFamily:'var(--font-mono)', fontSize:12, background:'rgba(255,255,255,.1)', padding:'2px 6px', borderRadius:4}}>{m.code}</code></td>
                  <td style={{color:'rgba(255,255,255,.6)', fontSize:13}}>{m.desc}</td>
                  <td><AdminStatusChip status={m.status} /></td>
                  <td>
                    <div style={{display:'flex', gap:6}}>
                      {m.status!=='approved' && <button className="btn btn-sm btn-success-admin" onClick={()=>approve(m.id)}>Approve</button>}
                      {m.status!=='rejected' && <button className="btn btn-sm btn-warn-admin" onClick={()=>reject(m.id)}>Reject</button>}
                      <button className="btn btn-sm btn-on-violet">Edit</button>
                      <button className="btn btn-sm" style={{color:'rgb(var(--color-error-400))'}}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="admin-info-footer">
          <strong>Status workflow:</strong> Pending → admin review → Approved (available to users) or Rejected (hidden).
          Approved mediums appear as options when users create requests and offers.
        </div>
      </div>
    </AdminShell>
  );
}

// ── Admin Service Types ─────────────────────────────────────────────────────
function AdminServiceTypesPage({ onNavigate }) {
  const [types, setTypes] = useStateAdmin(
    MOCK_SERVICE_TYPES.map(s=>({...s, status: s.id==='st7'?'pending':s.id==='st6'?'rejected':'approved', technical: ['st1','st3','st2'].includes(s.id) }))
  );
  const [tab, setTab] = useStateAdmin('approved');
  const filtered = types.filter(t=>tab==='all'?true:t.status===tab);
  const approve = id => setTypes(ts=>ts.map(t=>t.id===id?{...t,status:'approved'}:t));
  const reject  = id => setTypes(ts=>ts.map(t=>t.id===id?{...t,status:'rejected'}:t));
  const tabs = [
    {key:'pending', label:`Pending (${types.filter(t=>t.status==='pending').length})`},
    {key:'approved',label:`Approved (${types.filter(t=>t.status==='approved').length})`},
    {key:'rejected',label:`Rejected (${types.filter(t=>t.status==='rejected').length})`},
    {key:'all',     label:`All (${types.length})`},
  ];

  return (
    <AdminShell current="admin-service-types" onNavigate={onNavigate}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
        <div>
          <h1 className="admin-page-title" style={{marginBottom:4}}>Service Types</h1>
          <p style={{color:'rgba(255,255,255,.55)', fontSize:13, margin:0}}>Review and approve community-suggested service categories.</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="tab-row" style={{borderBottomColor:'rgba(255,255,255,.15)', marginBottom:16}}>
          {tabs.map(t=>(
            <button key={t.key} className={`tab-btn ${tab===t.key?'tab-btn--active':''}`}
              style={{color:tab===t.key?'rgb(var(--color-secondary-400))':'rgba(255,255,255,.55)'}}
              onClick={()=>setTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(t=>(
              <tr key={t.id}>
                <td style={{fontWeight:600, color:'#fff'}}>{t.name}</td>
                <td style={{color:'rgba(255,255,255,.6)', fontSize:13}}>{t.desc}</td>
                <td><span style={{fontSize:11, padding:'2px 7px', borderRadius:9999, background: t.technical?'rgba(14,165,233,.25)':'rgba(235,198,52,.2)', color:t.technical?'rgb(var(--color-tertiary-300))':'rgb(var(--color-secondary-300))'}}>{t.technical?'Technical':'Non-Technical'}</span></td>
                <td><AdminStatusChip status={t.status} /></td>
                <td>
                  <div style={{display:'flex', gap:6}}>
                    {t.status!=='approved' && <button className="btn btn-sm btn-success-admin" onClick={()=>approve(t.id)}>Approve</button>}
                    {t.status!=='rejected' && <button className="btn btn-sm btn-warn-admin" onClick={()=>reject(t.id)}>Reject</button>}
                    <button className="btn btn-sm btn-on-violet">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

// ── Admin Administrators ────────────────────────────────────────────────────
function AdminAdministrators({ onNavigate }) {
  return (
    <AdminShell current="admin-administrators" onNavigate={onNavigate}>
      <h1 className="admin-page-title">Administrators</h1>
      <div className="admin-card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
          <p style={{color:'rgba(255,255,255,.6)', fontSize:13, margin:0}}>
            Administrators can approve users, organizations, service types, and mediums of exchange.
          </p>
          <button className="btn btn-secondary btn-sm">Add Administrator</button>
        </div>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Nickname</th><th>Location</th><th>Status</th></tr></thead>
          <tbody>
            {MOCK_ADMIN_USERS.map(u=>(
              <tr key={u.id}>
                <td>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <span className="avatar"><span>{u.initial}</span></span>
                    <span style={{fontWeight:600, color:'#fff'}}>{u.name}</span>
                  </div>
                </td>
                <td style={{color:'rgba(255,255,255,.6)'}}>@{u.nickname}</td>
                <td style={{color:'rgba(255,255,255,.6)', fontSize:13}}>📍 {u.location}</td>
                <td><AdminStatusChip status="approved" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

// ── Generic Admin list pages ────────────────────────────────────────────────
function AdminOrgsPage({ onNavigate }) {
  return (
    <AdminShell current="admin-orgs" onNavigate={onNavigate}>
      <h1 className="admin-page-title">Organizations</h1>
      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Location</th><th>Members</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {MOCK_ORGS.map(o=>(
              <tr key={o.id}>
                <td style={{fontWeight:600, color:'#fff'}}>{o.name}</td>
                <td style={{color:'rgba(255,255,255,.6)', fontSize:13}}>📍 {o.location}</td>
                <td style={{color:'rgba(255,255,255,.6)'}}>{o.members.length}</td>
                <td><AdminStatusChip status={o.status} /></td>
                <td>
                  <div style={{display:'flex', gap:6}}>
                    {o.status!=='accepted' && <button className="btn btn-sm btn-success-admin">Approve</button>}
                    <button className="btn btn-sm btn-warn-admin">Suspend</button>
                    <button className="btn btn-sm btn-on-violet">View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function AdminRequestsPage({ onNavigate }) {
  return (
    <AdminShell current="admin-requests" onNavigate={onNavigate}>
      <h1 className="admin-page-title">Requests</h1>
      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Creator</th><th>Tags</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {MOCK_REQUESTS.map(r=>(
              <tr key={r.id}>
                <td style={{fontWeight:600, color:'#fff', maxWidth:220}}>{r.title}</td>
                <td style={{color:'rgba(255,255,255,.6)', fontSize:13}}>{r.owner}</td>
                <td>{r.tags.map(t=><span key={t} style={{fontSize:11, marginRight:4, padding:'1px 6px', borderRadius:9999, background:'rgba(255,255,255,.1)', color:'rgba(255,255,255,.7)'}}>{t}</span>)}</td>
                <td><AdminStatusChip status="approved" /></td>
                <td>
                  <div style={{display:'flex', gap:6}}>
                    <button className="btn btn-sm btn-on-violet">View</button>
                    <button className="btn btn-sm" style={{color:'rgb(var(--color-error-400))'}}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

function AdminOffersPage({ onNavigate }) {
  return (
    <AdminShell current="admin-offers" onNavigate={onNavigate}>
      <h1 className="admin-page-title">Offers</h1>
      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Creator</th><th>Tags</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {MOCK_OFFERS.map(o=>(
              <tr key={o.id}>
                <td style={{fontWeight:600, color:'#fff', maxWidth:220}}>{o.title}</td>
                <td style={{color:'rgba(255,255,255,.6)', fontSize:13}}>{o.owner}</td>
                <td>{o.tags.map(t=><span key={t} style={{fontSize:11, marginRight:4, padding:'1px 6px', borderRadius:9999, background:'rgba(255,255,255,.1)', color:'rgba(255,255,255,.7)'}}>{t}</span>)}</td>
                <td><AdminStatusChip status="approved" /></td>
                <td>
                  <div style={{display:'flex', gap:6}}>
                    <button className="btn btn-sm btn-on-violet">View</button>
                    <button className="btn btn-sm" style={{color:'rgb(var(--color-error-400))'}}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

// ── Shared admin components ─────────────────────────────────────────────────
function AdminStatusChip({ status }) {
  const map = {
    approved: { bg:'rgba(132,204,22,.2)', color:'rgb(var(--color-success-400))' },
    accepted: { bg:'rgba(132,204,22,.2)', color:'rgb(var(--color-success-400))' },
    pending:  { bg:'rgba(255,136,0,.2)',  color:'rgb(var(--color-warning-400))' },
    rejected: { bg:'rgba(210,25,25,.2)', color:'rgb(var(--color-error-400))' },
  };
  const s = map[status] || map.pending;
  return <span style={{fontSize:11, padding:'2px 8px', borderRadius:9999, background:s.bg, color:s.color, fontWeight:600}}>
    {status.charAt(0).toUpperCase()+status.slice(1)}
  </span>;
}

const adminScreenStyles = `
.admin-shell { display:grid; grid-template-columns:220px 1fr; min-height:100vh; }
.admin-sidebar { background:rgb(var(--color-surface-900)); display:flex; flex-direction:column; }
.admin-sidebar__logo { padding:18px 16px; font:700 17px/22px var(--font-base); color:#fff; border-bottom:1px solid rgba(255,255,255,.1); display:flex; align-items:center; gap:8px; }
.admin-nav-item { display:flex; align-items:center; gap:10px; padding:10px 16px; width:100%; font:500 13px/20px var(--font-base); color:rgba(255,255,255,.65); background:none; border:none; cursor:pointer; text-align:left; transition:background 120ms, color 120ms; }
.admin-nav-item:hover { background:rgba(255,255,255,.08); color:#fff; }
.admin-nav-item--active { background:rgba(255,255,255,.13); color:#fff; border-left:3px solid rgb(var(--color-secondary-500)); }
.admin-main { background:rgb(var(--color-surface-800)); padding:28px; min-height:100vh; overflow-y:auto; }
.admin-page-title { margin:0 0 20px; font:700 26px/32px var(--font-base); color:#fff; }
.admin-stat { background:rgba(255,255,255,.07); border-radius:10px; padding:16px; }
.admin-stat__ic { font-size:20px; margin-bottom:6px; }
.admin-stat__n { font:700 28px/32px var(--font-base); color:#fff; }
.admin-stat__label { font:400 12px/16px var(--font-base); color:rgba(255,255,255,.55); margin-top:2px; }
.admin-card { background:rgba(255,255,255,.06); border-radius:12px; padding:20px; margin-bottom:16px; }
.admin-queue-row { display:flex; align-items:center; gap:12px; background:rgb(var(--color-surface-700)); border-radius:8px; padding:12px 14px; }
.btn-success-admin { background:rgb(var(--color-success-500)); color:#111; }
.btn-warn-admin    { background:rgb(var(--color-warning-500)); color:#111; }
.admin-shortcut { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,.07); border:none; border-radius:8px; padding:14px; color:rgba(255,255,255,.8); font:500 13px/18px var(--font-base); cursor:pointer; transition:background 120ms; }
.admin-shortcut:hover { background:rgba(255,255,255,.13); color:#fff; }
.admin-table { width:100%; border-collapse:collapse; font:400 13px/20px var(--font-base); }
.admin-table th { text-align:left; padding:8px 10px; font:600 11px/16px var(--font-base); text-transform:uppercase; letter-spacing:.08em; color:rgba(255,255,255,.45); border-bottom:1px solid rgba(255,255,255,.1);}
.admin-table td { padding:10px; border-bottom:1px solid rgba(255,255,255,.06); vertical-align:middle; }
.admin-table tr:last-child td { border-bottom:none; }
.admin-table tr:hover td { background:rgba(255,255,255,.04); }
.admin-info-footer { margin-top:16px; padding-top:14px; border-top:1px solid rgba(255,255,255,.1); font:400 12px/20px var(--font-base); color:rgba(255,255,255,.45); }
`;

Object.assign(window, { AdminDashboard, AdminShell, AdminMediums, AdminServiceTypesPage, AdminAdministrators, AdminOrgsPage, AdminRequestsPage, AdminOffersPage, AdminStatusChip, adminScreenStyles });
