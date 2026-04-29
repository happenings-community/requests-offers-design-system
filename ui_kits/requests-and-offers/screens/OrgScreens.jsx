/* eslint-disable */
const { useState: useStateOrg } = React;

function OrgsList({ onOpen, onNavigate }) {
  const [search, setSearch] = useStateOrg('');
  const filtered = MOCK_ORGS.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
        <h1 className="page-h1">Organizations</h1>
        <button className="btn btn-primary btn-sm" onClick={()=>onNavigate('org-create')}>Create Organization</button>
      </div>
      <div style={{position:'relative', marginBottom:18}}>
        <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:16}}>🔍</span>
        <input className="ds-input" style={{paddingLeft:36}} placeholder="Search organizations…" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {filtered.map(o=>(
          <div key={o.id} className="org-row" onClick={()=>onOpen(o.id)}>
            <span className="avatar avatar-lg"><span>{o.initial}</span></span>
            <div style={{flex:1, minWidth:0}}>
              <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:4}}>
                <span style={{font:'600 16px/20px var(--font-base)', color:'rgb(var(--fg-1))'}}>{o.name}</span>
                <Chip tone={o.status==='accepted'?'success':'surface'}>{o.status==='accepted'?'✓ Accepted':'⏳ Pending'}</Chip>
              </div>
              <div style={{fontSize:13, color:'rgb(var(--fg-2))', marginBottom:4}}>📍 {o.location} · ✉️ {o.email}</div>
              <div style={{fontSize:13, color:'rgb(var(--fg-2))', display:'-webkit-box', WebkitLineClamp:1, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{o.desc}</div>
            </div>
            <div style={{fontSize:12, color:'rgb(var(--fg-3))', flexShrink:0}}>
              {o.members.length} members
            </div>
          </div>
        ))}
        {filtered.length===0 && <EmptyState msg="No organizations match your search." />}
      </div>
    </section>
  );
}

function OrgDetail({ id, onBack, onNavigate }) {
  const o = MOCK_ORGS.find(x=>x.id===id) || MOCK_ORGS[0];
  const [tab, setTab] = useStateOrg('members');
  const members  = MOCK_USERS.filter(u=>o.members.includes(u.id));
  const coords   = MOCK_USERS.filter(u=>o.coordinators.includes(u.id));
  const requests = MOCK_REQUESTS.filter(()=>false); // org has none in mock
  const offers   = MOCK_OFFERS.filter(()=>false);

  const tabs = [
    { key:'members',      label:`Members (${members.length})` },
    { key:'coordinators', label:`Coordinators (${coords.length})` },
    { key:'requests',     label:`Requests (${requests.length})` },
    { key:'offers',       label:`Offers (${offers.length})` },
  ];

  return (
    <section style={{maxWidth:1000, margin:'0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to organizations</button>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={() => window.happenings?.openModal({ type:'status-history', entityName: o.name })}>Status History</button>
          {o.coordinators.includes('u5') && <button className="btn btn-primary btn-sm" onClick={() => onNavigate('org-edit', o.id)}>Edit Organization</button>}
          {!o.coordinators.includes('u5') && <button className="btn btn-sm" style={{color:'rgb(var(--color-error-600))'}} onClick={() => window.happenings?.openModal({ type:'confirm', title:'Leave Organization', body:`Are you sure you want to leave ${o.name}?`, confirmLabel:'Leave', onConfirm:()=>{ window.happenings?.toast('You left the organization','warning'); onBack(); }})}>Leave Organization</button>}
        </div>
      </div>

      {/* Header card */}
      <div className="detail" style={{marginBottom:20}}>
        <div style={{display:'flex', alignItems:'flex-start', gap:20}}>
          <span className="avatar avatar-xl" style={{background:'rgb(var(--color-secondary-200))', color:'rgb(var(--color-secondary-900))'}}>
            <span>{o.initial}</span>
          </span>
          <div style={{flex:1}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:8}}>
              <h1 className="page-h1" style={{fontSize:28, margin:0}}>{o.name}</h1>
              <Chip tone={o.status==='accepted'?'success':'surface'}>{o.status==='accepted'?'✓ Accepted':'⏳ Pending'}</Chip>
            </div>
            <p style={{margin:'0 0 12px', fontSize:15, color:'rgb(var(--fg-2))', lineHeight:1.6}}>{o.desc}</p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div className="detail-meta-card">
                <h3>Contact</h3>
                <div>📍 {o.location}</div>
                <div>✉️ {o.email}</div>
              </div>
              <div className="detail-meta-card">
                <h3>Links</h3>
                {o.urls.map(url=><a key={url} href={url} style={{color:'rgb(var(--color-primary-600))', fontSize:13, display:'block'}}>{url}</a>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail">
        <div className="tab-row">
          {tabs.map(t=>(
            <button key={t.key} className={`tab-btn ${tab===t.key?'tab-btn--active':''}`} onClick={()=>setTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <div style={{marginTop:16}}>
          {tab==='members' && (
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <div style={{position:'relative', width:280}}>
                  <span style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)'}}>🔍</span>
                  <input className="ds-input" style={{paddingLeft:32, fontSize:13, padding:'7px 12px 7px 32px'}} placeholder="Search members…" />
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => window.happenings?.openModal({ type:'add-member', orgName: o.name })}>Add Member</button>
              </div>
              <MemberTable users={members} onOpen={uid=>onNavigate('user-profile', uid)} />
            </div>
          )}
          {tab==='coordinators' && (
            <div>
              <MemberTable users={coords} onOpen={uid=>onNavigate('user-profile', uid)} />
            </div>
          )}
          {tab==='requests' && (
            <div style={{textAlign:'center', padding:'32px 0'}}>
              <p style={{color:'rgb(var(--fg-2))', marginBottom:14}}>This organization hasn't created any requests yet.</p>
              <button className="btn btn-primary btn-sm" onClick={() => onNavigate('request-create')}>Create First Request</button>
            </div>
          )}
          {tab==='offers' && (
            <div style={{textAlign:'center', padding:'32px 0'}}>
              <p style={{color:'rgb(var(--fg-2))', marginBottom:14}}>This organization hasn't created any offers yet.</p>
              <button className="btn btn-warning btn-sm" onClick={() => onNavigate('offer-create')}>Create First Offer</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MemberTable({ users, onOpen }) {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      {users.map(u=>(
        <div key={u.id} className="member-row" onClick={()=>onOpen(u.id)}>
          <span className="avatar"><span>{u.initial}</span></span>
          <div style={{flex:1}}>
            <div style={{fontWeight:600, fontSize:14}}>{u.name}</div>
            <div style={{fontSize:12, color:'rgb(var(--fg-2))'}}>@{u.nickname} · {u.location}</div>
          </div>
          <Chip tone={u.status==='accepted'?'success':'surface'}>{u.status==='accepted'?'Accepted':'Pending'}</Chip>
        </div>
      ))}
    </div>
  );
}

function OrgCreate({ onCancel, onSubmit }) {
  const [name, setName] = useStateOrg('');
  const [email, setEmail] = useStateOrg('');
  const [loc, setLoc] = useStateOrg('');
  const [desc, setDesc] = useStateOrg('');
  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:24}}>Create an organization</h1>
      <div className="form-card">
        <Field label="Organization name"><TextInput placeholder="Brighton Mutual Aid" value={name} onChange={e=>setName(e.target.value)} /></Field>
        <Field label="Email"><TextInput type="email" placeholder="hello@example.org" value={email} onChange={e=>setEmail(e.target.value)} /></Field>
        <Field label="Location"><TextInput placeholder="City, Country" value={loc} onChange={e=>setLoc(e.target.value)} /></Field>
        <Field label="Description" hint="What does your organization do?">
          <TextArea rows={3} placeholder="A sentence or two…" value={desc} onChange={e=>setDesc(e.target.value)} />
        </Field>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:8}}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onSubmit({name,email,loc,desc})} disabled={!name.trim()}>Create organization</button>
        </div>
      </div>
    </section>
  );
}

const orgScreenStyles = `
.org-row {
  background:#fff; border:1px solid rgb(var(--border-1));
  border-radius:12px; padding:18px;
  display:flex; align-items:center; gap:16px;
  cursor:pointer; box-shadow:var(--shadow-sm);
  transition:box-shadow 150ms, border-color 150ms;
}
.org-row:hover { box-shadow:var(--shadow-md); border-color:rgb(var(--color-primary-300)); }

.detail-meta-card {
  background:rgb(var(--bg-muted)); border-radius:8px; padding:12px;
  font:400 13px/22px var(--font-base); color:rgb(var(--fg-2));
}
.detail-meta-card h3 { margin:0 0 6px; font:600 13px/18px var(--font-base); color:rgb(var(--fg-1)); }

.tab-row { display:flex; gap:4px; border-bottom:2px solid rgb(var(--border-1)); padding-bottom:0; }
.tab-btn {
  padding:8px 16px; font:500 14px/20px var(--font-base);
  border:none; background:none; cursor:pointer;
  color:rgb(var(--fg-2)); border-bottom:2px solid transparent; margin-bottom:-2px;
  transition:color 150ms, border-color 150ms;
}
.tab-btn:hover { color:rgb(var(--fg-1)); }
.tab-btn--active { color:rgb(var(--color-primary-600)); border-bottom-color:rgb(var(--color-primary-500)); font-weight:600; }

.member-row {
  display:flex; align-items:center; gap:12px;
  padding:10px 12px; border-radius:8px;
  background:rgb(var(--bg-muted)); cursor:pointer;
  transition:background 150ms;
}
.member-row:hover { background:rgb(var(--color-primary-50)); }
`;

Object.assign(window, { OrgsList, OrgDetail, OrgCreate, MemberTable, orgScreenStyles });
