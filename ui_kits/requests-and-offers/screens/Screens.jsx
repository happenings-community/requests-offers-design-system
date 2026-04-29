/* eslint-disable */
const { useState: useStateScreens } = React;

function Home({ onNavigate }) {
  const quickActions = [
    { icon: '🔍', title: 'Discover Opportunities', desc: 'Browse requests from the community and find ways to help.', cta: 'Explore', tone: 'secondary', go: 'requests' },
    { icon: '✨', title: 'Offer Your Skills',      desc: 'Share your expertise and help others in the community.',   cta: 'Explore', tone: 'warning',   go: 'offers' },
    { icon: '👥', title: 'Explore Community',     desc: 'Connect with other members and organizations.',           cta: 'Explore', tone: 'tertiary',  go: 'users' },
  ];
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{textAlign:'center', marginBottom:40}}>
        <h1 className="page-h1">Welcome to Requests &amp; Offers</h1>
        <p className="page-lead">Connect with the Holochain community to exchange skills, resources, and support. Whether you're looking for help or offering your expertise, this is your place to collaborate.</p>
      </div>
      <div className="banner" style={{textAlign:'center', marginBottom:40}}>
        <h2>Join the Community</h2>
        <p>Create your profile to start connecting with other Holochain enthusiasts.</p>
        <button className="btn btn-soft" style={{paddingLeft:24, paddingRight:24}} onClick={() => onNavigate('profile')}>👤 Create Profile</button>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:40}}>
        {quickActions.map(a => (
          <ActionCard key={a.title} icon={a.icon} title={a.title} description={a.desc}
                      ctaLabel={a.cta} ctaTone={a.tone} onClick={() => onNavigate(a.go)} />
        ))}
      </div>
      <div className="cta-row" style={{marginBottom:32}}>
        <div className="cta-tile cta-tile--requests" onClick={() => onNavigate('requests')}>
          <span className="cta-tile__icon">📝</span>
          <div><h3>Browse Requests</h3><p>Find requests you can help with</p></div>
        </div>
        <div className="cta-tile cta-tile--offers" onClick={() => onNavigate('offers')}>
          <span className="cta-tile__icon">💡</span>
          <div><h3>Browse Offers</h3><p>See what help is available</p></div>
        </div>
      </div>
      <div className="features">
        <h3>Community Features</h3>
        <div className="features__row">
          <span>🏷️ Service Types &amp; Skills</span>
          <span>🤝 Mutual Aid Exchange</span>
          <span>🏢 Organizations</span>
        </div>
        <div className="features__how">
          <h4>How Exchange Works</h4>
          <p>Our community operates on <b>mutual aid principles</b>. Members exchange skills, time, and resources based on trust and reciprocity. Create requests for help, offer your services, and connect directly with community members to arrange arrangements that work for everyone involved.</p>
        </div>
      </div>
    </section>
  );
}

// Use shared MOCK_REQUESTS from MockData.jsx

function RequestsBrowse({ onOpen, onCreate }) {
  const [tab, setTab] = useStateScreens('active');
  const [filter, setFilter] = useStateScreens('all');
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
        <div style={{display:'flex', gap:8}}>
          <button className={`btn btn-sm ${tab==='active' ? 'btn-primary' : 'btn-ghost'}`} onClick={()=>setTab('active')}>📋 Active Requests</button>
          <button className={`btn btn-sm ${tab==='archived' ? 'btn-warning' : 'btn-ghost'}`} onClick={()=>setTab('archived')}>📦 Archived Requests</button>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>Create Request</button>
      </div>
      <div style={{display:'flex', gap:8, marginBottom:14}}>
        {['all','my','organization'].map(f => (
          <button key={f} className={`btn btn-sm ${filter===f ? (f==='all'?'btn-primary':f==='my'?'btn-secondary':'btn-tertiary') : 'btn-ghost'}`} onClick={()=>setFilter(f)}>
            {f === 'all' ? 'All' : f === 'my' ? 'My' : 'Organization'}
          </button>
        ))}
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
        {(tab === 'active' ? MOCK_REQUESTS : []).map(r => (
          <ListingCard key={r.id} kind="request" title={r.title} owner={r.owner} ownerInitial={r.initial}
                       time={r.time} tags={r.tags} description={r.desc}
                       onClick={() => onOpen(r.id)} />
        ))}
      </div>
      {tab === 'archived' && (
        <div style={{textAlign:'center', color:'rgb(var(--fg-3))', padding:'48px 0', fontSize:18}}>
          No archived requests found.
        </div>
      )}
    </section>
  );
}

function RequestDetail({ id, onBack, onNavigate }) {
  const r = MOCK_REQUESTS.find(x => x.id === id) || MOCK_REQUESTS[0];
  const creator = MOCK_USERS.find(u => u.id === r.ownerId);
  return (
    <section style={{maxWidth:840, margin:'0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to requests</button>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('request-edit', r.id)}>Edit</button>
          <button className="btn btn-sm" style={{color:'rgb(var(--color-error-600))'}}>Delete</button>
        </div>
      </div>
      <div className="detail">
        <div className="detail__head">
          <Chip tone="secondary">📝 Request</Chip>
          <span className="detail__time">posted {r.time} ago</span>
        </div>
        <h1 className="page-h1" style={{marginTop:8}}>{r.title}</h1>
        <div className="detail__owner" onClick={()=>onNavigate&&onNavigate('user-profile', r.ownerId)} style={{cursor:'pointer'}}>
          <span className="avatar"><span>{r.initial}</span></span>
          <div>
            <div style={{fontWeight:600}}>{r.owner}</div>
            <div style={{fontSize:13, color:'rgb(var(--fg-2))'}}>@{creator?.nickname} · accepted</div>
          </div>
        </div>
        <p className="detail__desc">{r.desc}</p>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:8}}>Service Types</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{r.tags.map(t=><Chip key={t} tone="surface">{t}</Chip>)}</div>
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:8}}>Medium of Exchange</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{r.mediums.map(m=><Chip key={m} tone="secondary">{m}</Chip>)}</div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16}}>
          <div style={{background:'rgb(var(--bg-muted))', borderRadius:8, padding:'12px 14px'}}>
            <div style={{fontSize:11, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6}}>Time Information</div>
            <div style={{fontSize:13}}><strong>Time zone:</strong> Europe/London</div>
            <div style={{fontSize:13}}><strong>Preference:</strong> Flexible</div>
          </div>
          <div style={{background:'rgb(var(--bg-muted))', borderRadius:8, padding:'12px 14px'}}>
            <div style={{fontSize:11, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6}}>Interaction Type</div>
            <div style={{fontSize:13}}>🌐 Virtual</div>
          </div>
        </div>

        {r.links && r.links.length > 0 && (
          <div style={{marginBottom:16}}>
            <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:8}}>Related Links</div>
            {r.links.map(l=><a key={l} href={l} style={{color:'rgb(var(--color-primary-600))', display:'block', fontSize:14}}>{l}</a>)}
          </div>
        )}

        <div className="info-box" style={{marginBottom:16}}>
          <span>ℹ️</span>
          <p>Use the contact information below to get in touch with the creator directly.</p>
        </div>

        <div className="detail__actions">
          <button className="btn btn-primary">📨 Contact {r.owner.split(' ')[0]}</button>
          <button className="btn btn-ghost">Save for later</button>
        </div>
      </div>
      <div style={{textAlign:'center', fontSize:12, color:'rgb(var(--fg-3))', marginTop:16}}>Created {r.time} ago · Active</div>
    </section>
  );
}

function RequestCreate({ onCancel, onSubmit }) {
  const [title, setTitle] = useStateScreens('');
  const [type, setType]   = useStateScreens('Mentoring');
  const [desc, setDesc]   = useStateScreens('');
  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:24}}>Create a request</h1>
      <div className="form-card">
        <Field label="Title" hint="Short, action-first. Sentence case.">
          <TextInput placeholder="Looking for a Holochain mentor" value={title} onChange={e => setTitle(e.target.value)} />
        </Field>
        <Field label="Service type">
          <Select value={type} onChange={e => setType(e.target.value)}>
            <option>Mentoring</option><option>Design</option><option>Development</option>
            <option>Translation</option><option>Mutual Aid</option>
          </Select>
        </Field>
        <Field label="Description" hint="What does success look like? What can you offer in return?">
          <TextArea rows={4} placeholder="A few sentences about what you're looking for…" value={desc} onChange={e => setDesc(e.target.value)} />
        </Field>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:8}}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSubmit({ title, type, desc })} disabled={!title.trim()}>Publish request</button>
        </div>
      </div>
    </section>
  );
}

const screenStyles = `
.page-h1 { margin: 0 0 8px; font: 700 36px/40px var(--font-base); color: rgb(var(--color-primary-700)); letter-spacing: -.02em; }
.page-lead { margin: 0 auto; max-width: 640px; font: 400 18px/28px var(--font-base); color: rgb(var(--fg-2)); }

.features {
  background: rgb(var(--bg-muted));
  border-radius: 12px; padding: 28px; text-align: center;
}
.features h3 { margin: 0 0 14px; font: 600 22px/28px var(--font-base); color: rgb(var(--fg-1)); }
.features__row { display: flex; justify-content: center; gap: 32px; color: rgb(var(--fg-2)); font: 500 14px/20px var(--font-base); margin-bottom: 20px;}
.features__how { background: rgb(var(--color-primary-50)); border: 1px solid rgb(var(--color-primary-200)); border-radius: 10px; padding: 16px; text-align: left; max-width: 760px; margin: 0 auto;}
.features__how h4 { margin: 0 0 6px; font: 600 14px/20px var(--font-base); color: rgb(var(--color-primary-800));}
.features__how p  { margin: 0; font: 400 13px/20px var(--font-base); color: rgb(var(--color-primary-800));}

.detail { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 28px; box-shadow: var(--shadow-md); }
.detail__head { display: flex; justify-content: space-between; align-items: center; }
.detail__time { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); }
.detail__owner { display: flex; align-items: center; gap: 10px; margin: 18px 0; }
.detail__desc  { font: 400 16px/26px var(--font-base); color: rgb(var(--fg-1)); margin: 0 0 18px; }
.detail__actions { display: flex; gap: 10px;}

.form-card { background: #fff; border: 1px solid rgb(var(--border-1)); border-radius: 12px; padding: 24px; box-shadow: var(--shadow-md);}
`;

Object.assign(window, { Home, RequestsBrowse, RequestDetail, RequestCreate, screenStyles });
