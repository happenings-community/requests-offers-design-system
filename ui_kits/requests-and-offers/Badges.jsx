/* eslint-disable */

function Chip({ tone = 'primary', children }) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}

function StatusDot({ status = 'connected' }) {
  const map = {
    connected: { ic: '🟢', label: 'Connected' },
    checking: { ic: '🟡', label: 'Checking…' },
    disconnected: { ic: '🟠', label: 'Disconnected' },
    error: { ic: '🔴', label: 'Error' },
  };
  const s = map[status] || map.connected;
  return (
    <span className="status-pill">
      <span aria-hidden>{s.ic}</span>
      <span className="status-pill__label">{s.label}</span>
    </span>
  );
}

const badgeStyles = `
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  border-radius: 9999px; padding: 4px 10px;
  font: 600 12px/18px var(--font-base);
  white-space: nowrap;
}
.chip-primary   { background: rgb(var(--color-primary-100));   color: rgb(var(--color-primary-800)); }
.chip-secondary { background: rgb(var(--color-secondary-100)); color: rgb(var(--color-secondary-900)); }
.chip-tertiary  { background: rgb(var(--color-tertiary-100));  color: rgb(var(--color-tertiary-800)); }
.chip-warning   { background: rgb(var(--color-warning-100));   color: rgb(var(--color-warning-800)); }
.chip-success   { background: rgb(var(--color-success-100));   color: rgb(var(--color-success-900)); }
.chip-error     { background: rgb(var(--color-error-100));     color: rgb(var(--color-error-800)); }
.chip-surface   { background: rgb(var(--color-surface-100));   color: rgb(var(--color-surface-800)); }

.status-pill {
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid rgba(255,255,255,.25);
  background: rgba(255,255,255,.12);
  backdrop-filter: blur(4px);
  border-radius: 9999px; padding: 4px 12px;
  color: #fff; font: 500 12px/18px var(--font-base);
}
.status-pill__label { opacity: .9;}
`;

Object.assign(window, { Chip, StatusDot, badgeStyles });
