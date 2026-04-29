/* eslint-disable */
const { useState: useStateEdit } = React;

// ── Shared pre-fill helper ──────────────────────────────────────────────────
function EditBanner({ children }) {
  return (
    <div style={{background:'rgb(var(--color-secondary-50))', border:'1px solid rgb(var(--color-secondary-200))', borderRadius:8, padding:'10px 14px', marginBottom:18, fontSize:13, color:'rgb(var(--color-secondary-900))'}}>
      ✏️ {children}
    </div>
  );
}

// ── Request Edit ────────────────────────────────────────────────────────────
function RequestEdit({ id, onCancel, onSave }) {
  const r = MOCK_REQUESTS.find(x => x.id === id) || MOCK_REQUESTS[0];
  const [title, setTitle] = useStateEdit(r.title);
  const [type, setType]   = useStateEdit(r.tags[0] || 'Mentoring');
  const [desc, setDesc]   = useStateEdit(r.desc);
  const [medium, setMedium] = useStateEdit(r.mediums[0] || 'Skill swap');
  const [timezone, setTimezone] = useStateEdit('Europe/London');
  const [timePref, setTimePref] = useStateEdit('flexible');
  const [interaction, setInteraction] = useStateEdit('virtual');

  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:6}}>Edit request</h1>
      <p className="page-lead" style={{textAlign:'center', marginBottom:20, fontSize:14}}>Changes will be visible immediately after saving.</p>
      <div className="form-card">
        <EditBanner>Editing: <strong>{r.title}</strong></EditBanner>
        <Field label="Title" hint="Short, action-first. Sentence case.">
          <TextInput value={title} onChange={e=>setTitle(e.target.value)} />
        </Field>
        <Field label="Service type">
          <Select value={type} onChange={e=>setType(e.target.value)}>
            {MOCK_SERVICE_TYPES.map(s=><option key={s.id}>{s.name}</option>)}
          </Select>
        </Field>
        <Field label="Medium of exchange">
          <Select value={medium} onChange={e=>setMedium(e.target.value)}>
            {MOCK_MEDIUMS.filter(m=>m.status==='approved').map(m=><option key={m.id}>{m.name}</option>)}
          </Select>
        </Field>
        <Field label="Description">
          <TextArea rows={4} value={desc} onChange={e=>setDesc(e.target.value)} />
        </Field>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <Field label="Time preference">
            <Select value={timePref} onChange={e=>setTimePref(e.target.value)}>
              <option value="flexible">Flexible</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
            </Select>
          </Field>
          <Field label="Interaction type">
            <Select value={interaction} onChange={e=>setInteraction(e.target.value)}>
              <option value="virtual">Virtual</option>
              <option value="in-person">In Person</option>
              <option value="either">Either</option>
            </Select>
          </Field>
        </div>
        <Field label="Timezone">
          <Select value={timezone} onChange={e=>setTimezone(e.target.value)}>
            <option>Europe/London</option><option>Europe/Madrid</option><option>Asia/Ho_Chi_Minh</option><option>America/New_York</option>
          </Select>
        </Field>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onSave({title,type,desc})}>Save changes</button>
        </div>
      </div>
    </section>
  );
}

// ── Offer Edit ──────────────────────────────────────────────────────────────
function OfferEdit({ id, onCancel, onSave }) {
  const o = MOCK_OFFERS.find(x => x.id === id) || MOCK_OFFERS[0];
  const [title, setTitle]   = useStateEdit(o.title);
  const [type, setType]     = useStateEdit(o.tags[0] || 'Development');
  const [offerDesc, setOfferDesc] = useStateEdit(o.desc);
  const [medium, setMedium] = useStateEdit(o.mediums[0] || 'Skill swap');
  const [timePref, setTimePref] = useStateEdit('flexible');
  const [interaction, setInteraction] = useStateEdit('virtual');

  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:6}}>Edit offer</h1>
      <p className="page-lead" style={{textAlign:'center', marginBottom:20, fontSize:14}}>Changes will be visible immediately after saving.</p>
      <div className="form-card">
        <EditBanner>Editing: <strong>{o.title}</strong></EditBanner>
        <Field label="Title" hint="Short, action-first. Sentence case.">
          <TextInput value={title} onChange={e=>setTitle(e.target.value)} />
        </Field>
        <Field label="Service type">
          <Select value={type} onChange={e=>setType(e.target.value)}>
            {MOCK_SERVICE_TYPES.map(s=><option key={s.id}>{s.name}</option>)}
          </Select>
        </Field>
        <Field label="Medium of exchange">
          <Select value={medium} onChange={e=>setMedium(e.target.value)}>
            {MOCK_MEDIUMS.filter(m=>m.status==='approved').map(m=><option key={m.id}>{m.name}</option>)}
          </Select>
        </Field>
        <Field label="Description">
          <TextArea rows={4} value={offerDesc} onChange={e=>setOfferDesc(e.target.value)} />
        </Field>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <Field label="Time preference">
            <Select value={timePref} onChange={e=>setTimePref(e.target.value)}>
              <option value="flexible">Flexible</option><option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option><option value="evenings">Evenings</option>
            </Select>
          </Field>
          <Field label="Interaction type">
            <Select value={interaction} onChange={e=>setInteraction(e.target.value)}>
              <option value="virtual">Virtual</option><option value="in-person">In Person</option><option value="either">Either</option>
            </Select>
          </Field>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-warning" onClick={()=>onSave({title,type,desc:offerDesc})}>Save changes</button>
        </div>
      </div>
    </section>
  );
}

// ── User Edit ───────────────────────────────────────────────────────────────
function UserEdit({ id, onCancel, onSave }) {
  const u = MOCK_USERS.find(x => x.id === id) || MOCK_USERS[4];
  const [name, setName] = useStateEdit(u.name);
  const [nick, setNick] = useStateEdit(u.nickname);
  const [loc, setLoc]   = useStateEdit(u.location);
  const [bio, setBio]   = useStateEdit(u.bio);

  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:6}}>Edit profile</h1>
      <div className="form-card">
        <EditBanner>Editing profile for <strong>{u.name}</strong></EditBanner>
        <div style={{display:'flex', justifyContent:'center', marginBottom:20}}>
          <div style={{position:'relative'}}>
            <span className="avatar-xl" style={{display:'inline-grid', width:72, height:72, borderRadius:'50%', background:'rgb(var(--color-primary-200))', color:'rgb(var(--color-primary-800))', placeItems:'center', fontSize:28, fontWeight:700}}>{u.initial}</span>
            <button className="btn btn-sm" style={{position:'absolute', bottom:-4, right:-4, borderRadius:'50%', width:28, height:28, padding:0, background:'rgb(var(--color-primary-500))', color:'#fff', fontSize:12}}>📷</button>
          </div>
        </div>
        <Field label="Full name"><TextInput value={name} onChange={e=>setName(e.target.value)} /></Field>
        <Field label="Nickname" hint="Lowercase, no spaces."><TextInput value={nick} onChange={e=>setNick(e.target.value)} /></Field>
        <Field label="Location"><TextInput value={loc} onChange={e=>setLoc(e.target.value)} /></Field>
        <Field label="Bio" hint="What do you do? What are you interested in?">
          <TextArea rows={3} value={bio} onChange={e=>setBio(e.target.value)} />
        </Field>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onSave({name,nick,loc,bio})}>Save profile</button>
        </div>
      </div>
    </section>
  );
}

// ── Organization Edit ───────────────────────────────────────────────────────
function OrgEdit({ id, onCancel, onSave }) {
  const o = MOCK_ORGS.find(x => x.id === id) || MOCK_ORGS[0];
  const [name, setName]   = useStateEdit(o.name);
  const [email, setEmail] = useStateEdit(o.email);
  const [loc, setLoc]     = useStateEdit(o.location);
  const [desc, setDesc]   = useStateEdit(o.desc);
  const [url, setUrl]     = useStateEdit(o.urls[0] || '');

  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:6}}>Edit organization</h1>
      <div className="form-card">
        <EditBanner>Editing: <strong>{o.name}</strong></EditBanner>
        <div style={{display:'flex', justifyContent:'center', marginBottom:20}}>
          <div style={{position:'relative'}}>
            <span style={{display:'inline-grid', width:64, height:64, borderRadius:'50%', background:'rgb(var(--color-secondary-200))', color:'rgb(var(--color-secondary-900))', placeItems:'center', fontSize:24, fontWeight:700}}>{o.initial}</span>
            <button className="btn btn-sm" style={{position:'absolute', bottom:-4, right:-4, borderRadius:'50%', width:28, height:28, padding:0, background:'rgb(var(--color-primary-500))', color:'#fff', fontSize:12}}>📷</button>
          </div>
        </div>
        <Field label="Organization name"><TextInput value={name} onChange={e=>setName(e.target.value)} /></Field>
        <Field label="Email"><TextInput type="email" value={email} onChange={e=>setEmail(e.target.value)} /></Field>
        <Field label="Location"><TextInput value={loc} onChange={e=>setLoc(e.target.value)} /></Field>
        <Field label="Website URL"><TextInput type="url" value={url} onChange={e=>setUrl(e.target.value)} /></Field>
        <Field label="Description">
          <TextArea rows={3} value={desc} onChange={e=>setDesc(e.target.value)} />
        </Field>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={()=>onSave({name,email,loc,desc})}>Save organization</button>
        </div>
      </div>
    </section>
  );
}

const editScreenStyles = `
.form-section-title {
  font: 600 13px/18px var(--font-base); color: rgb(var(--fg-2));
  text-transform: uppercase; letter-spacing: .08em;
  margin: 20px 0 10px;
}
`;

Object.assign(window, { RequestEdit, OfferEdit, UserEdit, OrgEdit, EditBanner, editScreenStyles });
