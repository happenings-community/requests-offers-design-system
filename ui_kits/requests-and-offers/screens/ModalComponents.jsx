/* eslint-disable */
const { useState: useStateModal, useEffect: useEffectModal } = React;

// ── Global modal + toast API ────────────────────────────────────────────────
// Screens call: window.happenings.openModal({ type, ...data })
//               window.happenings.toast('Message', 'success'|'error'|'warning')

function ModalProvider({ children }) {
  const [modal, setModal] = useStateModal(null);
  const [toasts, setToasts] = useStateModal([]);

  useEffectModal(() => {
    let nextId = 0;
    window.happenings = {
      openModal: (cfg) => setModal(cfg),
      closeModal: () => setModal(null),
      toast: (msg, tone = 'success') => {
        const id = ++nextId;
        setToasts(ts => [...ts, { id, msg, tone }]);
        setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3200);
      },
    };
  }, []);

  return (
    <>
      {children}

      {/* ── Modal overlay ── */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            {modal.type === 'confirm'       && <ConfirmModal    {...modal} onClose={() => setModal(null)} />}
            {modal.type === 'status-history'&& <StatusHistoryModal {...modal} onClose={() => setModal(null)} />}
            {modal.type === 'add-member'    && <AddMemberModal   {...modal} onClose={() => setModal(null)} />}
            {modal.type === 'user-detail'   && <UserDetailModal  {...modal} onClose={() => setModal(null)} />}
            {modal.type === 'org-detail'    && <OrgDetailModal   {...modal} onClose={() => setModal(null)} />}
          </div>
        </div>
      )}

      {/* ── Toast stack ── */}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast--${t.tone}`}>{t.msg}</div>
        ))}
      </div>
    </>
  );
}

// ── Confirm modal ────────────────────────────────────────────────────────────
function ConfirmModal({ title, body, confirmLabel = 'Confirm', confirmTone = 'error', onConfirm, onClose }) {
  return (
    <>
      <div className="modal-header"><h3 className="modal-title">{title}</h3></div>
      <div className="modal-body"><p style={{fontSize:14, lineHeight:1.6, color:'rgb(var(--fg-2))'}}>{body}</p></div>
      <div className="modal-footer">
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
        <button className={`btn btn-${confirmTone} btn-sm`} onClick={() => { onConfirm?.(); onClose(); }}>{confirmLabel}</button>
      </div>
    </>
  );
}

// ── Status History modal ─────────────────────────────────────────────────────
const MOCK_REVISIONS = [
  { date: '28 Apr 2025, 14:32', status: 'accepted',  actor: 'Sam Whitfield', reason: '' },
  { date: '26 Apr 2025, 09:15', status: 'pending',   actor: '(system)',       reason: '' },
];
function StatusHistoryModal({ entityName, onClose }) {
  const toneMap = { accepted:'success', pending:'warning', rejected:'error', 'suspended temporarily':'warning' };
  return (
    <>
      <div className="modal-header">
        <h3 className="modal-title">Status History</h3>
        {entityName && <p style={{fontSize:13, color:'rgb(var(--fg-2))', margin:'4px 0 0'}}>{entityName}</p>}
      </div>
      <div className="modal-body">
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {MOCK_REVISIONS.map((r,i) => (
            <div key={i} style={{display:'flex', gap:12, alignItems:'flex-start', paddingBottom:10, borderBottom: i<MOCK_REVISIONS.length-1?'1px solid rgb(var(--border-1))':'none'}}>
              <div style={{width:10, height:10, borderRadius:'50%', background:`rgb(var(--color-${toneMap[r.status]||'surface'}-500))`, marginTop:4, flexShrink:0}}></div>
              <div style={{flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:2}}>
                  <span style={{fontWeight:600, fontSize:13, textTransform:'capitalize'}}>{r.status}</span>
                  <span style={{fontSize:11, color:'rgb(var(--fg-3))'}}>{r.date}</span>
                </div>
                <div style={{fontSize:12, color:'rgb(var(--fg-2))'}}>by {r.actor}</div>
                {r.reason && <div style={{fontSize:12, color:'rgb(var(--fg-2))', marginTop:2}}>{r.reason}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-primary btn-sm" onClick={onClose}>Close</button></div>
    </>
  );
}

// ── Add Member modal ─────────────────────────────────────────────────────────
function AddMemberModal({ orgName, onClose }) {
  const [search, setSearch] = useStateModal('');
  const nonMembers = MOCK_USERS.filter(u => u.status === 'accepted' && u.id !== 'u1' && u.id !== 'u2' && u.id !== 'u3');
  const filtered = nonMembers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.nickname.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="modal-header"><h3 className="modal-title">Add Member</h3>
        <p style={{fontSize:13, color:'rgb(var(--fg-2))', margin:'4px 0 0'}}>to {orgName}</p>
      </div>
      <div className="modal-body">
        <div style={{position:'relative', marginBottom:12}}>
          <span style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)'}}>🔍</span>
          <input className="ds-input" style={{paddingLeft:32}} placeholder="Search accepted users…"
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {filtered.map(u=>(
            <div key={u.id} style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, border:'1px solid rgb(var(--border-1))'}}>
              <span className="avatar"><span>{u.initial}</span></span>
              <div style={{flex:1}}>
                <div style={{fontWeight:600, fontSize:13}}>{u.name}</div>
                <div style={{fontSize:12, color:'rgb(var(--fg-2))'}}>@{u.nickname} · {u.location}</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => {
                window.happenings?.toast(`${u.name} added to ${orgName}`, 'success');
                onClose();
              }}>Add</button>
            </div>
          ))}
          {filtered.length === 0 && <p style={{color:'rgb(var(--fg-3))', fontSize:13, textAlign:'center', padding:'12px 0'}}>No matching accepted users found.</p>}
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button></div>
    </>
  );
}

// ── User Detail modal (admin) ─────────────────────────────────────────────────
function UserDetailModal({ userId, onClose, onNavigate }) {
  const u = MOCK_USERS.find(x=>x.id===userId) || MOCK_USERS[0];
  return (
    <>
      <div className="modal-header"><h3 className="modal-title">User Details</h3></div>
      <div className="modal-body">
        <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:14}}>
          <span className="avatar avatar-lg"><span>{u.initial}</span></span>
          <div>
            <div style={{fontWeight:700, fontSize:15}}>{u.name}</div>
            <div style={{fontSize:13, color:'rgb(var(--fg-2))'}}>@{u.nickname} · 📍 {u.location}</div>
            <Chip tone={u.status==='accepted'?'success':'surface'}>{u.status==='accepted'?'✓ Accepted':'⏳ Pending'}</Chip>
          </div>
        </div>
        <p style={{fontSize:14, color:'rgb(var(--fg-2))', lineHeight:1.6, marginBottom:14}}>{u.bio}</p>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-success btn-sm" onClick={() => { window.happenings?.toast(`${u.name} approved`, 'success'); onClose(); }}>Approve</button>
          <button className="btn btn-warning btn-sm" onClick={() => { window.happenings?.toast(`${u.name} rejected`, 'warning'); onClose(); }}>Reject</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { onNavigate?.('user-profile', u.id); onClose(); }}>View Profile →</button>
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button></div>
    </>
  );
}

// ── Org Detail modal (admin) ─────────────────────────────────────────────────
function OrgDetailModal({ orgId, onClose, onNavigate }) {
  const o = MOCK_ORGS.find(x=>x.id===orgId) || MOCK_ORGS[0];
  return (
    <>
      <div className="modal-header"><h3 className="modal-title">Organization Details</h3></div>
      <div className="modal-body">
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:12}}>
          <span className="avatar avatar-lg" style={{background:'rgb(var(--color-secondary-200))', color:'rgb(var(--color-secondary-900))'}}><span>{o.initial}</span></span>
          <div>
            <div style={{fontWeight:700, fontSize:15}}>{o.name}</div>
            <div style={{fontSize:13, color:'rgb(var(--fg-2))'}}>📍 {o.location} · ✉️ {o.email}</div>
            <Chip tone={o.status==='accepted'?'success':'surface'}>{o.status==='accepted'?'✓ Accepted':'⏳ Pending'}</Chip>
          </div>
        </div>
        <p style={{fontSize:13, color:'rgb(var(--fg-2))', lineHeight:1.55, marginBottom:12}}>{o.desc}</p>
        <div style={{display:'flex', gap:8}}>
          <button className="btn btn-success btn-sm" onClick={() => { window.happenings?.toast(`${o.name} approved`, 'success'); onClose(); }}>Approve</button>
          <button className="btn btn-warning btn-sm" onClick={() => { window.happenings?.toast(`${o.name} suspended`, 'warning'); onClose(); }}>Suspend</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { onNavigate?.('org-detail', o.id); onClose(); }}>View Page →</button>
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button></div>
    </>
  );
}

const modalStyles = `
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.5);
  z-index: 300;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal-box {
  background: #fff;
  border-radius: 14px;
  width: 100%; max-width: 480px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / .35);
  display: flex; flex-direction: column;
  max-height: calc(100vh - 40px); overflow: hidden;
}
.modal-header {
  padding: 20px 20px 0;
  flex-shrink: 0;
}
.modal-title {
  font: 700 17px/22px var(--font-base);
  color: rgb(var(--fg-1));
  margin: 0;
}
.modal-body {
  padding: 16px 20px;
  overflow-y: auto;
  flex: 1;
}
.modal-footer {
  padding: 0 20px 18px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
  border-top: 1px solid rgb(var(--border-1));
  padding-top: 14px;
}

/* Toasts */
.toast-stack {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 400;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}
.toast {
  padding: 10px 18px;
  border-radius: 9999px;
  font: 600 13px/18px var(--font-base);
  box-shadow: var(--shadow-lg);
  animation: toast-in .2s ease;
  white-space: nowrap;
}
.toast--success { background: rgb(var(--color-success-500)); color: #111; }
.toast--error   { background: rgb(var(--color-error-500));   color: #fff; }
.toast--warning { background: rgb(var(--color-warning-500)); color: #111; }

@keyframes toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Extra btn tones */
.btn-success { background: rgb(var(--color-success-500)); color: #111; }
.btn-success:hover { background: rgb(var(--color-success-600)); }
.btn-warning { background: rgb(var(--color-warning-500)); color: #111; }
.btn-warning:hover { background: rgb(var(--color-warning-600)); }
`;

Object.assign(window, { ModalProvider, modalStyles });
