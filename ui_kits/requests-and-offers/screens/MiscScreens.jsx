/* eslint-disable */
const { useState: useStateMisc } = React;

// ── Service Types ────────────────────────────────────────────────────────────
function ServiceTypesList({ onNavigate }) {
  const [search, setSearch] = useStateMisc('');
  const filtered = MOCK_SERVICE_TYPES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
        <h1 className="page-h1">Available Service Types</h1>
        <button className="btn btn-primary btn-sm" onClick={()=>onNavigate('suggest-service-type')}>Suggest a Service Type</button>
      </div>
      <div style={{position:'relative', marginBottom:18}}>
        <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:16}}>🔍</span>
        <input className="ds-input" style={{paddingLeft:36}} placeholder="Search service types…" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14}}>
        {filtered.map(s=>(
          <div key={s.id} className="st-card">
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
              <span className="st-card__icon">🏷️</span>
              <span style={{font:'600 16px/20px var(--font-base)'}}>{s.name}</span>
            </div>
            <p style={{margin:'0 0 12px', fontSize:13, color:'rgb(var(--fg-2))', lineHeight:1.55}}>{s.desc}</p>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Chip tone="surface">{s.count} listing{s.count!==1?'s':''}</Chip>
              <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('service-type-detail', s.id)}>View →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── My Listings ──────────────────────────────────────────────────────────────
function MyListings({ onNavigate }) {
  const [tab, setTab] = useStateMisc('requests');
  const me = MOCK_USERS[4]; // Sam
  const myReqs = MOCK_REQUESTS.filter(r=>r.ownerId===me.id);
  const myOffs = MOCK_OFFERS.filter(o=>o.ownerId===me.id);

  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{marginBottom:20}}>
        <h1 className="page-h1">My Listings</h1>
        <p style={{margin:'4px 0 0', fontSize:14, color:'rgb(var(--fg-2))'}}>Manage your requests and offers</p>
      </div>
      <div style={{display:'flex', gap:8, marginBottom:18}}>
        <button className={`btn btn-sm ${tab==='requests'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('requests')}>📋 My Requests ({myReqs.length})</button>
        <button className={`btn btn-sm ${tab==='offers'?'btn-warning':'btn-ghost'}`} onClick={()=>setTab('offers')}>💡 My Offers ({myOffs.length})</button>
      </div>

      {tab==='requests' && (
        myReqs.length ? (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {myReqs.map(r=>(
              <div key={r.id} style={{position:'relative'}}>
                <ListingCard kind="request" title={r.title} owner={r.owner} ownerInitial={r.initial} time={r.time} tags={r.tags} description={r.desc} onClick={()=>onNavigate('request-detail', r.id)} />
                <div className="listing-actions">
                  <button className="btn btn-ghost btn-sm">Edit</button>
                  <button className="btn btn-sm" style={{color:'rgb(var(--color-error-600))'}}>Archive</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-listings">
            <div style={{fontSize:40, marginBottom:12}}>📋</div>
            <p style={{marginBottom:16, color:'rgb(var(--fg-2))'}}>You haven't created any requests yet.</p>
            <button className="btn btn-primary" onClick={()=>onNavigate('request-create')}>Create your first request</button>
          </div>
        )
      )}

      {tab==='offers' && (
        myOffs.length ? (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {myOffs.map(o=>(
              <div key={o.id} style={{position:'relative'}}>
                <ListingCard kind="offer" title={o.title} owner={o.owner} ownerInitial={o.initial} time={o.time} tags={o.tags} description={o.desc} onClick={()=>onNavigate('offer-detail', o.id)} />
                <div className="listing-actions">
                  <button className="btn btn-ghost btn-sm">Edit</button>
                  <button className="btn btn-sm" style={{color:'rgb(var(--color-error-600))'}}>Archive</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-listings">
            <div style={{fontSize:40, marginBottom:12}}>💡</div>
            <p style={{marginBottom:16, color:'rgb(var(--fg-2))'}}>You haven't created any offers yet.</p>
            <button className="btn btn-warning" onClick={()=>onNavigate('offer-create')}>Create your first offer</button>
          </div>
        )
      )}
    </section>
  );
}

// ── Tags Page ────────────────────────────────────────────────────────────────
function TagsPage({ tag, onNavigate }) {
  const t = tag || 'Mentoring';
  const requests = MOCK_REQUESTS.filter(r => r.tags.includes(t));
  const offers   = MOCK_OFFERS.filter(o => o.tags.includes(t));
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('service-types')} style={{marginBottom:16}}>← Back to service types</button>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6}}>Tag</div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <h1 className="page-h1" style={{margin:0}}>🏷️ {t}</h1>
          <Chip tone="surface">{requests.length + offers.length} listings</Chip>
        </div>
      </div>
      {requests.length > 0 && (
        <div style={{marginBottom:28}}>
          <h2 style={{font:'600 18px/24px var(--font-base)', margin:'0 0 12px'}}>📝 Requests ({requests.length})</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {requests.map(r=><ListingCard key={r.id} kind="request" title={r.title} owner={r.owner} ownerInitial={r.initial} time={r.time} tags={r.tags} description={r.desc} onClick={()=>onNavigate('request-detail', r.id)} />)}
          </div>
        </div>
      )}
      {offers.length > 0 && (
        <div>
          <h2 style={{font:'600 18px/24px var(--font-base)', margin:'0 0 12px'}}>💡 Offers ({offers.length})</h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
            {offers.map(o=><ListingCard key={o.id} kind="offer" title={o.title} owner={o.owner} ownerInitial={o.initial} time={o.time} tags={o.tags} description={o.desc} onClick={()=>onNavigate('offer-detail', o.id)} />)}
          </div>
        </div>
      )}
      {requests.length===0 && offers.length===0 && <EmptyState msg={`No listings found for "${t}".`} />}
    </section>
  );
}

// ── Suggest Service Type ──────────────────────────────────────────────────────
function SuggestServiceType({ onCancel, onSubmit }) {
  const [name, setName] = useStateMisc('');
  const [desc, setDesc] = useStateMisc('');
  const [technical, setTechnical] = useStateMisc(false);
  return (
    <section style={{maxWidth:620, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:6}}>Suggest a service type</h1>
      <p className="page-lead" style={{textAlign:'center', marginBottom:20, fontSize:14}}>
        Admins will review your suggestion. If approved it will be available for all listings.
      </p>
      <div className="form-card">
        <Field label="Name" hint="Short and clear — one or two words.">
          <TextInput placeholder="e.g. Legal Advice" value={useStateSuggest} onChange={e=>setName(e.target.value)} />
        </Field>
        <Field label="Description" hint="What kind of skills or services does this cover?">
          <TextArea rows={3} placeholder="Describe what this service type covers…" value={desc} onChange={e=>setDesc(e.target.value)} />
        </Field>
        <div style={{marginBottom:16}}>
          <label style={{display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:14}}>
            <input type="checkbox" checked={technical} onChange={e=>setTechnical(e.target.checked)} style={{width:16, height:16}} />
            <span>This is a <strong>technical</strong> service type</span>
          </label>
          <div style={{fontSize:12, color:'rgb(var(--fg-2))', marginTop:4, marginLeft:26}}>Technical types involve code, software, or technical skills.</div>
        </div>
        <div style={{background:'rgb(var(--color-primary-50))', border:'1px solid rgb(var(--color-primary-200))', borderRadius:8, padding:'10px 14px', marginBottom:16, fontSize:13, color:'rgb(var(--color-primary-800))'}}>
          ℹ️ Your suggestion will be submitted as <strong>Pending</strong> and reviewed by an administrator before becoming available.
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>{ window.happenings?.toast('Service type suggested — awaiting admin review','success'); onSubmit?.(); }} disabled={!name.trim()}>Submit suggestion</button>
        </div>
      </div>
    </section>
  );
}

// ── Profile Guard ─────────────────────────────────────────────────────────────
function ProfileGuard({ onNavigate }) {
  return (
    <section style={{maxWidth:600, margin:'0 auto', textAlign:'center', paddingTop:48}}>
      <div style={{fontSize:48, marginBottom:16}}>👤</div>
      <h1 className="page-h1" style={{marginBottom:8}}>Profile Required</h1>
      <p className="page-lead" style={{marginBottom:24, fontSize:15}}>
        You need a profile to create requests and offers. Browsing is always open to everyone.
      </p>
      <div style={{background:'#fff', border:'1px solid rgb(var(--border-1))', borderRadius:12, padding:24, marginBottom:24, boxShadow:'var(--shadow-md)'}}>
        <h3 style={{font:'600 16px/22px var(--font-base)', marginBottom:8}}>Create Profile to Make Requests</h3>
        <p style={{fontSize:14, color:'rgb(var(--fg-2))', marginBottom:16}}>Join the community and start exchanging skills, time, and resources.</p>
        <button className="btn btn-primary" onClick={()=>onNavigate('user-create')}>👤 Create Profile</button>
      </div>
      <div style={{display:'flex', gap:12, justifyContent:'center'}}>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('requests')}>Browse Requests</button>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('offers')}>Browse Offers</button>
      </div>
    </section>
  );
}

// ── Connection / Loading screen ───────────────────────────────────────────────
function ConnectionScreen() {
  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:24, padding:32}}>
      <div style={{textAlign:'center'}}>
        <h2 style={{font:'600 22px/28px var(--font-base)', marginBottom:8}}>Connecting to Holochain Network</h2>
        <p style={{color:'rgb(var(--fg-2))', fontSize:15}}>Establishing secure connection…</p>
      </div>
      <div style={{width:'100%', maxWidth:400}}>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:'rgb(var(--fg-2))', marginBottom:6}}>
          <span>Progress</span><span>66%</span>
        </div>
        <div style={{height:8, background:'rgb(var(--color-surface-200))', borderRadius:4, overflow:'hidden'}}>
          <div style={{height:'100%', width:'66%', background:'rgb(var(--color-primary-500))', borderRadius:4, transition:'width .3s'}}></div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:16}}>
          {[
            { name:'Client Connection', status:'completed', msg:'Connected successfully' },
            { name:'hREA Service',      status:'completed', msg:'hREA service ready' },
            { name:'Network Verification', status:'running',  msg:'Verifying network configuration…' },
          ].map(step=>(
            <div key={step.name} style={{display:'flex', alignItems:'center', gap:12, background:'rgb(var(--bg-muted))', padding:'10px 14px', borderRadius:8}}>
              <span style={{fontSize:16}}>
                {step.status==='completed'?'✅':step.status==='running'?'⏳':'⬜'}
              </span>
              <div style={{flex:1}}>
                <div style={{font:'600 13px/18px var(--font-base)'}}>{step.name}</div>
                <div style={{font:'400 11px/16px var(--font-base)', color:'rgb(var(--fg-2))'}}>{step.msg}</div>
              </div>
              <span style={{fontSize:11, color:'rgb(var(--fg-3))', textTransform:'capitalize'}}>{step.status==='running'?'In Progress':step.status}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{fontSize:13, color:'rgb(var(--fg-3))'}}>This usually takes 5–15 seconds.</p>
    </div>
  );
}



const miscScreenStyles = `
.st-card {
  background:#fff; border:1px solid rgb(var(--border-1));
  border-radius:12px; padding:20px; box-shadow:var(--shadow-sm);
  transition:box-shadow 150ms, border-color 150ms;
}
.st-card:hover { box-shadow:var(--shadow-md); border-color:rgb(var(--color-primary-300)); }
.st-card__icon { font-size:20px; }

.listing-actions { display:flex; gap:6px; margin-top:8px; justify-content:flex-end; }

.empty-listings {
  text-align:center; padding:48px 0;
  background:rgb(var(--bg-muted)); border-radius:12px;
}

/* Admin styles moved to AdminScreens.jsx */
`;

Object.assign(window, { ServiceTypesList, MyListings, TagsPage, SuggestServiceType, ProfileGuard, ConnectionScreen, miscScreenStyles });
