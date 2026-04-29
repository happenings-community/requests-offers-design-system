/* eslint-disable */
const { useState: useStateOffer } = React;

function OffersBrowse({ onOpen, onCreate }) {
  const [tab, setTab] = useStateOffer('active');
  const [filter, setFilter] = useStateOffer('all');
  return (
    <section style={{maxWidth:1100, margin:'0 auto'}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
        <div style={{display:'flex', gap:8}}>
          <button className={`btn btn-sm ${tab==='active'?'btn-primary':'btn-ghost'}`} onClick={()=>setTab('active')}>📋 Active Offers</button>
          <button className={`btn btn-sm ${tab==='archived'?'btn-warning':'btn-ghost'}`} onClick={()=>setTab('archived')}>📦 Archived Offers</button>
        </div>
        <button className="btn btn-primary btn-sm" onClick={onCreate}>Create Offer</button>
      </div>
      <div style={{display:'flex', gap:8, marginBottom:14}}>
        {['all','my','organization'].map(f=>(
          <button key={f} className={`btn btn-sm ${filter===f?(f==='all'?'btn-primary':f==='my'?'btn-secondary':'btn-tertiary'):'btn-ghost'}`} onClick={()=>setFilter(f)}>
            {f==='all'?'All':f==='my'?'My':'Organization'}
          </button>
        ))}
      </div>
      {tab==='active' ? (
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
          {MOCK_OFFERS.map(o=>(
            <ListingCard key={o.id} kind="offer" title={o.title} owner={o.owner} ownerInitial={o.initial}
              time={o.time} tags={o.tags} description={o.desc} onClick={()=>onOpen(o.id)} />
          ))}
        </div>
      ) : (
        <div style={{textAlign:'center', color:'rgb(var(--fg-3))', padding:'48px 0', fontSize:18}}>No archived offers found.</div>
      )}
    </section>
  );
}

function OfferDetail({ id, onBack, onNavigate }) {
  const o = MOCK_OFFERS.find(x=>x.id===id) || MOCK_OFFERS[0];
  const creator = MOCK_USERS.find(u=>u.id===o.ownerId);
  return (
    <section style={{maxWidth:840, margin:'0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to offers</button>
        <div style={{display:'flex', gap:8}}>
          {o.ownerId==='u5' && <button className="btn btn-ghost btn-sm" onClick={()=>onNavigate&&onNavigate('offer-edit', o.id)}>Edit</button>}
          {o.ownerId==='u5' && <button className="btn btn-sm" style={{color:'rgb(var(--color-error-600))'}} onClick={()=>window.happenings?.openModal({type:'confirm',title:'Delete Offer',body:`Delete "${o.title}"? This cannot be undone.`,confirmLabel:'Delete',onConfirm:()=>{window.happenings?.toast('Offer deleted','error');onBack();}})}>Delete</button>}
        </div>
      </div>
      <div className="detail">
        <div className="detail__head">
          <Chip tone="warning">💡 Offer</Chip>
          <span className="detail__time">posted {o.time} ago</span>
        </div>
        <h1 className="page-h1" style={{marginTop:8}}>{o.title}</h1>
        <div className="detail__owner" onClick={()=>onNavigate('user-profile', o.ownerId)} style={{cursor:'pointer'}}>
          <span className="avatar"><span>{o.initial}</span></span>
          <div>
            <div style={{fontWeight:600}}>{o.owner}</div>
            <div style={{fontSize:13, color:'rgb(var(--fg-2))'}}>@{creator?.nickname} · accepted</div>
          </div>
        </div>
        <p className="detail__desc">{o.desc}</p>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', marginBottom:6}}>SERVICE TYPES</div>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>{o.tags.map(t=><Chip key={t} tone="surface">{t}</Chip>)}</div>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', marginBottom:6}}>MEDIUM OF EXCHANGE</div>
          <div style={{display:'flex', gap:8}}>{o.mediums.map(m=><Chip key={m} tone="secondary">{m}</Chip>)}</div>
        </div>
        {o.links.length>0 && (
          <div style={{marginBottom:20}}>
            <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', marginBottom:6}}>LINKS</div>
            {o.links.map(l=><a key={l} href={l} style={{color:'rgb(var(--color-primary-600))', display:'block', fontSize:14}}>{l}</a>)}
          </div>
        )}
        <div className="info-box">
          <span>ℹ️</span>
          <p>Use the contact information below to get in touch with the creator directly.</p>
        </div>
        <div className="detail__actions" style={{marginTop:16}}>
          <button className="btn btn-primary">📨 Contact {o.owner.split(' ')[0]}</button>
          <button className="btn btn-ghost">Save for later</button>
        </div>
      </div>
    </section>
  );
}

function OfferCreate({ onCancel, onSubmit }) {
  const [title, setTitle] = useStateOffer('');
  const [type, setType] = useStateOffer('Mentoring');
  const [desc, setDesc] = useStateOffer('');
  const [medium, setMedium] = useStateOffer('Skill swap');
  return (
    <section style={{maxWidth:680, margin:'0 auto'}}>
      <h1 className="page-h1" style={{textAlign:'center', marginBottom:24}}>Create an offer</h1>
      <div className="form-card">
        <Field label="Title" hint="Short, action-first. Sentence case.">
          <TextInput placeholder="Svelte 5 pairing sessions" value={title} onChange={e=>setTitle(e.target.value)} />
        </Field>
        <Field label="Service type">
          <Select value={type} onChange={e=>setType(e.target.value)}>
            {MOCK_SERVICE_TYPES.map(s=><option key={s.id}>{s.name}</option>)}
          </Select>
        </Field>
        <Field label="Medium of exchange">
          <Select value={medium} onChange={e=>setMedium(e.target.value)}>
            <option>Skill swap</option><option>Time credits</option><option>Gratitude</option><option>Cash</option>
          </Select>
        </Field>
        <Field label="Description" hint="What do you offer? What's the best way to get in touch?">
          <TextArea rows={4} placeholder="A few sentences about what you're offering…" value={desc} onChange={e=>setDesc(e.target.value)} />
        </Field>
        <div style={{display:'flex', justifyContent:'flex-end', gap:10, marginTop:8}}>
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-warning" onClick={()=>onSubmit({title,type,desc})} disabled={!title.trim()}>Publish offer</button>
        </div>
      </div>
    </section>
  );
}

const offerScreenStyles = `
.info-box {
  display: flex; align-items: flex-start; gap: 10px;
  background: rgb(var(--color-primary-50));
  border: 1px solid rgb(var(--color-primary-200));
  border-radius: 10px; padding: 14px 16px;
  font: 400 13px/20px var(--font-base);
  color: rgb(var(--color-primary-800));
}
.info-box span { font-size: 16px; flex-shrink: 0; }
.info-box p { margin: 0; }
`;

Object.assign(window, { OffersBrowse, OfferDetail, OfferCreate, offerScreenStyles });
