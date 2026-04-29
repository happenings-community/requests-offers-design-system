/* eslint-disable */

function ServiceTypeDetail({ id, onBack, onNavigate }) {
  const st = MOCK_SERVICE_TYPES.find(x => x.id === id) || MOCK_SERVICE_TYPES[0];
  const isTechnical = ['st1','st3','st2'].includes(st.id);
  const status = st.id === 'st7' ? 'pending' : st.id === 'st6' ? 'rejected' : 'approved';

  const relatedRequests = MOCK_REQUESTS.filter(r => r.tags.includes(st.name));
  const relatedOffers   = MOCK_OFFERS.filter(o => o.tags.includes(st.name));

  return (
    <section style={{maxWidth:900, margin:'0 auto'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to service types</button>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-ghost btn-sm">Copy Name</button>
          <button className="btn btn-ghost btn-sm">Copy Hash</button>
        </div>
      </div>

      {/* Header */}
      <div className="detail" style={{marginBottom:20}}>
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:6}}>
              <h1 className="page-h1" style={{margin:0}}>{st.name}</h1>
              <Chip tone={status==='approved'?'success':status==='pending'?'warning':'error'}>
                {status==='approved'?'✓ Approved':status==='pending'?'⏳ Pending Review':'✕ Rejected'}
              </Chip>
            </div>
            <p style={{font:'400 15px/24px var(--font-base)', color:'rgb(var(--fg-2))', margin:'0 0 14px'}}>{st.desc}</p>
          </div>
        </div>

        {/* Classification */}
        <div style={{borderTop:'1px solid rgb(var(--border-1))', paddingTop:14}}>
          <div style={{fontSize:12, fontWeight:600, color:'rgb(var(--fg-2))', marginBottom:8, textTransform:'uppercase', letterSpacing:'.08em'}}>Classification</div>
          <Chip tone={isTechnical?'tertiary':'secondary'}>
            {isTechnical?'🔧 Technical':'💬 Non-Technical'}
          </Chip>
        </div>

        {/* Metadata */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:16, borderTop:'1px solid rgb(var(--border-1))', paddingTop:14}}>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:4}}>Status</div>
            <AdminStatusChip status={status} />
          </div>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:4}}>Created</div>
            <div style={{fontSize:13, color:'rgb(var(--fg-1))'}}>3 Jan 2025</div>
          </div>
          <div>
            <div style={{fontSize:11, fontWeight:600, color:'rgb(var(--fg-2))', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:4}}>Last Updated</div>
            <div style={{fontSize:13, color:'rgb(var(--fg-1))'}}>14 Apr 2025</div>
          </div>
        </div>
      </div>

      {/* Related requests */}
      {status === 'approved' && (
        <>
          <div className="detail" style={{marginBottom:16}}>
            <h3 style={{margin:'0 0 14px', font:'600 18px/24px var(--font-base)'}}>
              Requests Using This Service Type <span style={{fontSize:14, color:'rgb(var(--fg-2))', fontWeight:400}}>({relatedRequests.length})</span>
            </h3>
            {relatedRequests.length ? (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {relatedRequests.map(r=><ListingCard key={r.id} kind="request" title={r.title} owner={r.owner} ownerInitial={r.initial} time={r.time} tags={r.tags} description={r.desc} onClick={()=>onNavigate('request-detail', r.id)} />)}
              </div>
            ) : <EmptyState msg="No requests are currently using this service type." />}
          </div>

          <div className="detail" style={{marginBottom:16}}>
            <h3 style={{margin:'0 0 14px', font:'600 18px/24px var(--font-base)'}}>
              Offers Using This Service Type <span style={{fontSize:14, color:'rgb(var(--fg-2))', fontWeight:400}}>({relatedOffers.length})</span>
            </h3>
            {relatedOffers.length ? (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
                {relatedOffers.map(o=><ListingCard key={o.id} kind="offer" title={o.title} owner={o.owner} ownerInitial={o.initial} time={o.time} tags={o.tags} description={o.desc} onClick={()=>onNavigate('offer-detail', o.id)} />)}
              </div>
            ) : <EmptyState msg="No offers are currently using this service type." />}
          </div>
        </>
      )}

      {/* Status-specific info */}
      {status !== 'approved' && (
        <div className="detail" style={{marginBottom:16}}>
          <div className={`info-box`} style={{background: status==='pending'?'rgb(var(--color-warning-50))':'rgb(var(--color-error-50))', borderColor: status==='pending'?'rgb(var(--color-warning-200))':'rgb(var(--color-error-200))', color: status==='pending'?'rgb(var(--color-warning-900))':'rgb(var(--color-error-900))'}}>
            <span>{status==='pending'?'⏳':'✕'}</span>
            <div>
              <strong>{status==='pending'?'Pending Review':'Rejected'}</strong>
              <p style={{margin:'2px 0 0', fontSize:13}}>{status==='pending'?'This service type is under review. Once approved it will be available for use.':'This service type has been rejected and is not available for use.'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Technical details (collapsible) */}
      <details className="detail">
        <summary style={{cursor:'pointer', font:'600 14px/20px var(--font-base)', color:'rgb(var(--fg-2))', listStyle:'none', display:'flex', alignItems:'center', gap:6}}>
          <span style={{fontSize:10}}>▶</span> Technical Details
        </summary>
        <div style={{marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {[
            ['Original Action Hash', 'uhCkkvLnMW3d...'],
            ['Previous Action Hash', 'uhCkkNpQmX9f...'],
            ['Creator Hash', 'uhCAkyVzR8gT...'],
          ].map(([label, val])=>(
            <div key={label}>
              <div style={{fontSize:11, fontWeight:600, color:'rgb(var(--fg-2))', marginBottom:4}}>{label}</div>
              <code style={{display:'block', fontFamily:'var(--font-mono)', fontSize:12, background:'rgb(var(--bg-muted))', padding:'6px 10px', borderRadius:6, wordBreak:'break-all'}}>{val}</code>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}

Object.assign(window, { ServiceTypeDetail });
