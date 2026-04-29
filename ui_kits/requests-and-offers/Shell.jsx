/* eslint-disable */
const { useState: useStateShell, useEffect: useEffectShell } = React;

// ── Screen Map ───────────────────────────────────────────────────────────────
const SCREEN_MAP = [
  { section: 'Home', screens: [
    { key: 'home', label: 'Home dashboard', ic: '🏠' },
  ]},
  { section: 'Requests', screens: [
    { key: 'requests',        label: 'Browse requests',   ic: '📝' },
    { key: 'request-detail',  label: 'Request detail',    ic: '📝', payload: 'r1' },
    { key: 'request-create',  label: 'Create request',    ic: '✏️' },
    { key: 'request-edit',    label: 'Edit request',      ic: '✏️', payload: 'r1' },
  ]},
  { section: 'Offers', screens: [
    { key: 'offers',          label: 'Browse offers',     ic: '💡' },
    { key: 'offer-detail',    label: 'Offer detail',      ic: '💡', payload: 'of1' },
    { key: 'offer-create',    label: 'Create offer',      ic: '✏️' },
    { key: 'offer-edit',      label: 'Edit offer',        ic: '✏️', payload: 'of1' },
  ]},
  { section: 'Users', screens: [
    { key: 'users',           label: 'All users',         ic: '👥' },
    { key: 'user-profile',    label: 'User profile',      ic: '👤', payload: 'u1' },
    { key: 'user-create',     label: 'Create profile',    ic: '✏️' },
    { key: 'user-edit',       label: 'Edit profile',      ic: '✏️', payload: 'u5' },
    { key: 'my-listings',     label: 'My listings',       ic: '📋' },
  ]},
  { section: 'Organizations', screens: [
    { key: 'orgs',            label: 'All organizations', ic: '🏢' },
    { key: 'org-detail',      label: 'Org detail',        ic: '🏢', payload: 'o1' },
    { key: 'org-create',      label: 'Create org',        ic: '✏️' },
    { key: 'org-edit',        label: 'Edit org',          ic: '✏️', payload: 'o1' },
  ]},
  { section: 'Service Types', screens: [
    { key: 'service-types',          label: 'All service types',      ic: '🏷️' },
    { key: 'service-type-detail',    label: 'Service type detail',    ic: '🏷️', payload: 'st1' },
    { key: 'suggest-service-type',   label: 'Suggest a type',         ic: '✏️' },
    { key: 'tags',                   label: 'Tag: Mentoring',         ic: '🏷️', payload: 'Mentoring' },
  ]},
  { section: 'Other', screens: [
    { key: 'profile-guard',   label: 'Profile guard',   ic: '🔒' },
    { key: 'connecting',      label: 'Connecting…',     ic: '🔗' },
  ]},
  { section: 'Admin', screens: [
    { key: 'admin',                  label: 'Dashboard',            ic: '🏠' },
    { key: 'admin-mediums',          label: 'Mediums of Exchange',  ic: '💱' },
    { key: 'admin-service-types',    label: 'Service Types',        ic: '🏷️' },
    { key: 'admin-orgs',             label: 'Organizations',        ic: '🏢' },
    { key: 'admin-requests',         label: 'Requests',             ic: '📝' },
    { key: 'admin-offers',           label: 'Offers',               ic: '💡' },
    { key: 'admin-administrators',   label: 'Administrators',       ic: '🛡️' },
  ]},
];

function ScreenMap({ currentRoute, onNavigate, onClose }) {
  return (
    <div className="smap-overlay" onClick={onClose}>
      <div className="smap-panel" onClick={e => e.stopPropagation()}>
        <div className="smap-header">
          <span style={{fontWeight:700, fontSize:15}}>🗺️ All Screens</span>
          <button className="smap-close" onClick={onClose}>✕</button>
        </div>
        <div className="smap-body">
          {SCREEN_MAP.map(group => (
            <div key={group.section} className="smap-group">
              <div className="smap-section">{group.section}</div>
              {group.screens.map(s => (
                <button
                  key={s.key + (s.payload||'')}
                  className={`smap-item ${currentRoute===s.key?'smap-item--active':''}`}
                  onClick={() => { onNavigate(s.key, s.payload); onClose(); }}
                >
                  <span className="smap-item__ic">{s.ic}</span>
                  {s.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ route, onNavigate, onMapOpen }) {
  const [open, setOpen] = useStateShell(null);

  const dropdownItems = {
    activity: [
      { key: 'user-profile', payload: 'u5', label: 'My Profile',   ic: '👤' },
      { key: 'my-listings',  payload: null, label: 'My Listings',  ic: '📋' },
      { key: 'requests',     payload: null, label: 'My Requests',  ic: '📝' },
      { key: 'offers',       payload: null, label: 'My Offers',    ic: '💡' },
    ],
    community: [
      { key: 'users', payload: null, label: 'All Users',       ic: '👥' },
      { key: 'orgs',  payload: null, label: 'Organizations',   ic: '🏢' },
    ],
    resources: [
      { key: 'service-types', payload: null, label: 'Service Types', ic: '🏷️' },
    ],
  };

  const item = (key, label) => (
    <div className="nav-menu" onMouseLeave={() => setOpen(null)}>
      <span className={`nav-link ${open===key?'is-open':''}`} onMouseEnter={() => setOpen(key)} onClick={() => setOpen(open===key?null:key)}>
        {label} <span aria-hidden style={{opacity:.7, fontSize:10}}>▾</span>
      </span>
      {open===key && (
        <div className="nav-pop">
          {dropdownItems[key].map(d => (
            <a key={d.key+d.label} className="nav-pop__item" onClick={() => { onNavigate(d.key, d.payload); setOpen(null); }}>
              <span className="nav-pop__ic">{d.ic}</span>{d.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav className="navbar">
      <a className="navbar__logo" onClick={() => onNavigate('home')}>
        <img src={window.__resources && window.__resources.logo || '../../assets/hAppeningsCIClogo.png'} alt="hAppenings logo" />
        <span>Requests &amp; Offers</span>
      </a>
      <div className="navbar__right">
        <button className="btn btn-secondary" onClick={() => onNavigate('requests')}>📝 Requests</button>
        <button className="btn btn-warning"   onClick={() => onNavigate('offers')}>💡 Offers</button>
        <div className="navbar__menus">
          {item('activity', 'My Activity')}
          {item('community', 'Community')}
          {item('resources', 'Resources')}
        </div>
        <StatusDot status="connected" />
        <button className="btn btn-on-violet btn-sm" onClick={onMapOpen} title="Browse all screens">🗺️ Map</button>
        <a className="btn btn-error btn-sm" onClick={() => onNavigate('admin')}>⚙️ Admin</a>
      </div>
    </nav>
  );
}

// ── Shell ────────────────────────────────────────────────────────────────────
function Shell({ route, onNavigate, children, isAdmin }) {
  const [mapOpen, setMapOpen] = useStateShell(false);

  // Keyboard shortcut: M
  useEffectShell(() => {
    const handler = e => { if (e.key === 'm' && !e.target.matches('input,textarea,select')) setMapOpen(v => !v); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (isAdmin) {
    return (
      <>
        {children}
        <button className="map-fab" onClick={() => setMapOpen(true)} title="Screen map (M)">🗺️</button>
        {mapOpen && <ScreenMap currentRoute={route} onNavigate={onNavigate} onClose={() => setMapOpen(false)} />}
      </>
    );
  }

  return (
    <div className="shell">
      <NavBar route={route} onNavigate={onNavigate} onMapOpen={() => setMapOpen(true)} />
      <main className="shell__main">{children}</main>
      {mapOpen && <ScreenMap currentRoute={route} onNavigate={onNavigate} onClose={() => setMapOpen(false)} />}
    </div>
  );
}

const shellStyles = `
.shell { min-height: 100vh; display: grid; grid-template-rows: auto 1fr; background: rgb(var(--bg-app)); }
.shell__main { padding: 32px 16px 64px; }

.navbar {
  height: 80px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
  background: rgb(var(--color-primary-500));
  box-shadow: var(--shadow-lg);
  position: sticky; top: 0; z-index: 30;
  gap: 12px;
}
.navbar__logo { display: flex; align-items: center; gap: 10px; cursor: pointer; flex-shrink: 0; }
.navbar__logo img { width: 44px; height: 44px; }
.navbar__logo span { color: #fff; font: 700 17px/22px var(--font-base); white-space: nowrap; }

.navbar__right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.navbar__menus { display: flex; gap: 2px; align-items: center; }

.nav-menu { position: relative; }
.nav-link { color: rgba(255,255,255,.92); font: 500 13px/20px var(--font-base); padding: 6px 8px; cursor: pointer; white-space: nowrap; border-radius: 6px; }
.nav-link:hover, .nav-link.is-open { background: rgba(255,255,255,.12); }

.nav-pop {
  position: absolute; top: calc(100% + 8px); left: 0;
  background: #fff; min-width: 210px;
  border: 1px solid rgb(var(--border-1));
  border-radius: 12px; box-shadow: var(--shadow-lg);
  padding: 6px; z-index: 50;
}
.nav-pop__item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 8px;
  font: 500 13px/18px var(--font-base);
  color: rgb(var(--fg-1)); cursor: pointer;
}
.nav-pop__item:hover { background: rgb(var(--color-primary-50)); color: rgb(var(--color-primary-800)); }
.nav-pop__ic { width: 20px; text-align: center; }

/* Screen map */
.smap-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.45);
  z-index: 200; display: flex; align-items: flex-start; justify-content: flex-end;
  padding: 12px;
}
.smap-panel {
  background: #fff; border-radius: 14px; width: 280px;
  box-shadow: var(--shadow-xl); display: flex; flex-direction: column;
  max-height: calc(100vh - 24px); overflow: hidden;
}
.smap-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; border-bottom: 1px solid rgb(var(--border-1));
  flex-shrink: 0;
}
.smap-close {
  background: none; border: none; cursor: pointer; font-size: 16px;
  color: rgb(var(--fg-2)); padding: 2px 6px; border-radius: 6px;
}
.smap-close:hover { background: rgb(var(--bg-muted)); }
.smap-body { overflow-y: auto; padding: 10px 8px 16px; }
.smap-group { margin-bottom: 10px; }
.smap-section {
  font: 600 10px/14px var(--font-base); letter-spacing: .1em;
  text-transform: uppercase; color: rgb(var(--fg-3));
  padding: 4px 8px 2px;
}
.smap-item {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 7px 10px; border-radius: 8px; border: none; background: none;
  font: 400 13px/18px var(--font-base); color: rgb(var(--fg-1));
  cursor: pointer; text-align: left;
  transition: background 100ms;
}
.smap-item:hover { background: rgb(var(--color-primary-50)); color: rgb(var(--color-primary-800)); }
.smap-item--active { background: rgb(var(--color-primary-100)); color: rgb(var(--color-primary-800)); font-weight: 600; }
.smap-item__ic { width: 20px; text-align: center; font-size: 14px; }

/* FAB for admin screens */
.map-fab {
  position: fixed; bottom: 20px; right: 20px; z-index: 100;
  width: 48px; height: 48px; border-radius: 9999px;
  background: rgb(var(--color-primary-500)); color: #fff;
  border: none; cursor: pointer; font-size: 20px;
  box-shadow: var(--shadow-lg);
  display: grid; place-items: center;
  transition: transform 150ms, box-shadow 150ms;
}
.map-fab:hover { transform: scale(1.08); box-shadow: var(--shadow-xl); }

/* Prototype hint bar */
.proto-hint {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgb(var(--color-primary-900)); color: rgba(255,255,255,.7);
  font: 400 11px/14px var(--font-mono);
  padding: 5px 16px; text-align: center; z-index: 90;
}
.proto-hint b { color: rgba(255,255,255,.95); }
`;

Object.assign(window, { Shell, ScreenMap, shellStyles });
