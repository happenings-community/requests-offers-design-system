/* eslint-disable */
const { useState: useStateUser } = React;

function UsersList({ onOpen, onNavigate }) {
  const [search, setSearch] = useStateUser('');
  const filtered = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.nickname.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
        <h1 className="page-h1">Users</h1>
        <button className="btn btn-primary btn-sm" onClick={()=>onNavigate('user-create')}>Create Profile</button>
      </div>
      <div style={{position:'relative', marginBottom:18}}>
        <span style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', fontSize:16}}>🔍</span>
        <input className="ds-input" style={{paddingLeft:36}} placeholder="Search users…" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14}}>
        {filtered.map(u=>(
          <div key={u.id} className="user-card" onClick={()=>onOpen(u.id)}>
            <span className="avatar avatar-lg"><span>{u.initial}</span></span>
            <div className="user-card__body">
              <div className="user-card__name">{u.name}</div>
              <div className="user-card__nick">@{u.nickname}</div>
              <div className="user-card__loc">📍 {u.location}</div>
              <Chip tone={u.status==='accepted'?'success':'surface'} style={{marginTop:6}}>
                {u.status==='accepted'?'✓ Accepted':'⏳ Pending'}
              </Chip>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UserProfile({ id, onBack, onNavigate }) {
  const u = MOCK_USERS.find(x=>x.id===id) || MOCK_USERS[0];
  const myRequests = MOCK_REQUESTS.filter(r=>r.ownerId===u.id);
  const myOffers   = MOCK_OFFERS.filter(o=>o.ownerId===u.id);
  const [tab, setTab] = useStateUser('requests');
  return (
    <section style={{maxWidth:860, margin:'0 auto'}}>
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{marginBottom:16}}>← Back to users</button>
      <div className="profile-card">
        <div className="profile-card__header">
          <span className="avatar avatar-xl"><span>{u.initial}</span></span>
          <div className="profile-card__info">
            <h1 className="page-h1" style={{fontSize:28, marginBottom:4}}>{u.name}</h1>
            <div style={{color:'rgb(var(--fg-2))', fontSize:14, marginBottom:6}}>@{u.nickname} · 📍 {u.location}</div>
            <Chip tone={u.status==='accepted'?'success':'surface'}>{u.status==='accepted'?'✓ Accepted':'⏳ Pending'}</Chip>
          </div>
          {id==='u5' && <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate('user-edit', id)}>Edit Profile</button>}
        </div>
        <p style={{marginTop:16, fontSize:15, lineHeight:1.6, color:'rgb(var(--fg-1))'}}>{u.bio}</p>
      </div>

      <div style={{marginTop:20}}>
        <div style={{display:'flex', gap:8, marginBottom:14}}>
          <button className={`btn btn-sm ${tab==='requests'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('requests')}>📝 Requests ({myRequests.length})</button>
          <button className={`btn btn-sm ${tab==='offers'?'btn-warning':'btn-ghost'}`} onClick={()=>setTab('offers')}>💡 Offers ({myOffers.length})</button>
        </div>
        {tab==='requests' && (
          myRequests.length ? (
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              {myRequests.map(r=><ListingCard key={r.id} kind="request" title={r.title} owner={r.owner} ownerInitial={r.initial} time={r.time} tags={r.tags} description={r.desc} onClick={()=>onNavigate('request-detail', r.id)} />)}
            </div>
          ) : <EmptyState msg="No requests yet." />
        )}
        {tab==='offers' && (
          myOffers.length ? (
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              {myOffers.map(o=><ListingCard key={o.id} kind="offer" title={o.title} owner={o.owner} ownerInitial={o.initial} time={o.time} tags={o.tags} description={o.desc} onClick={()=>onNavigate('offer-detail', o.id)} />)}
            </div>
          ) : <EmptyState msg="No offers yet." />
        )}
      </div>
    </section>
  );
}

function UserCreate({ onCancel, onSubmit }) {
  const [name, setName] = useStateUser('');
  const [nick, setNick] = useStateUser('');
  const [loc, setLoc]   = useStateUser('');
  const [bio, setBio]   = useStateUser('');
  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:6}}>Create your profile</h1>
      <p className="page-lead" style={{textAlign:'center', marginBottom:24, fontSize:15}}>Join the community and start exchanging skills.</p>
      <div className="form-card">
        <Field label="Full name"><TextInput placeholder="Maya Rousseau" value={name} onChange={e=>setName(e.target.value)} /></Field>
        <Field label="Nickname / handle" hint="Lowercase, no spaces."><TextInput placeholder="mayar" value={nick} onChange={e=>setNick(e.target.value)} /></Field>
        <Field label="Location" hint="City, country — or 'Global (Remote)'."><TextInput placeholder="Brighton, UK" value={loc} onChange={e=>setLoc(e.target.value)} /></Field>
        <Field label="Bio" hint="What do you do? What are you interested in?">
          <TextArea rows={3} placeholder="A sentence or two about yourself…" value={bio} onChange={e=>setBio(e.target.value)} />
        </Field>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:8}}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onSubmit({name,nick,loc,bio})} disabled={!name.trim()}>Create profile</button>
        </div>
      </div>
    </section>
  );
}

function EmptyState({ msg }) {
  return <div style={{textAlign:'center', color:'rgb(var(--fg-3))', padding:'40px 0', fontSize:16}}>{msg}</div>;
}

const userScreenStyles = `
.user-card {
  background: #fff; border: 1px solid rgb(var(--border-1));
  border-radius: 12px; padding: 20px;
  display: flex; align-items: flex-start; gap: 14px;
  cursor: pointer; box-shadow: var(--shadow-sm);
  transition: box-shadow 150ms, border-color 150ms;
}
.user-card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
.user-card__body { min-width:0; flex:1; }
.user-card__name { font: 600 15px/20px var(--font-base); color: rgb(var(--fg-1)); margin-bottom: 2px; }
.user-card__nick { font: 400 13px/18px var(--font-base); color: rgb(var(--fg-2)); margin-bottom: 2px;}
.user-card__loc  { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); }

.avatar-lg  { width:48px; height:48px; border-radius:9999px; background:rgb(var(--color-primary-200)); color:rgb(var(--color-primary-800)); display:inline-grid; place-items:center; font:700 18px/1 var(--font-base); flex-shrink:0;}
.avatar-xl  { width:64px; height:64px; border-radius:9999px; background:rgb(var(--color-primary-200)); color:rgb(var(--color-primary-800)); display:inline-grid; place-items:center; font:700 24px/1 var(--font-base); flex-shrink:0;}

.profile-card { background:#fff; border:1px solid rgb(var(--border-1)); border-radius:12px; padding:24px; box-shadow:var(--shadow-md);}
.profile-card__header { display:flex; align-items:center; gap:18px; }
.profile-card__info { flex:1; }
`;

Object.assign(window, { UsersList, UserProfile, UserCreate, EmptyState, userScreenStyles });
