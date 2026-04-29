/* eslint-disable */

function Button({ variant = 'primary', size = 'md', icon, children, onClick, disabled }) {
  const sizeCls = size === 'sm' ? 'btn-sm' : '';
  return (
    <button
      className={`btn btn-${variant} ${sizeCls}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ? <span className="btn-ic">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

const buttonStyles = `
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  border-radius: 9999px;
  padding: 10px 20px;
  font: 600 14px/20px var(--font-base);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease, transform 100ms ease;
  box-shadow: 0 1px 2px rgb(0 0 0 / .05);
  white-space: nowrap;
}
.btn-sm { padding: 6px 14px; font-size: 13px; }
.btn-ic { font-size: 1.05em; }
.btn:active:not([disabled]) { transform: translateY(1px); }
.btn[disabled] { opacity: .5; cursor: not-allowed; }

.btn-primary { background: rgb(var(--color-primary-500)); color: #fff; }
.btn-primary:hover:not([disabled]) { background: rgb(var(--color-primary-600)); box-shadow: var(--shadow-md); }

.btn-secondary { background: rgb(var(--color-secondary-500)); color: #111; }
.btn-secondary:hover:not([disabled]) { background: rgb(var(--color-tertiary-500)); color: #111; box-shadow: var(--shadow-md);}

.btn-warning { background: rgb(var(--color-warning-500)); color: #111; }
.btn-warning:hover:not([disabled]) { background: rgb(var(--color-error-500)); color: #fff; box-shadow: var(--shadow-md);}

.btn-tertiary { background: rgb(var(--color-tertiary-500)); color: #111; }
.btn-tertiary:hover:not([disabled]) { background: rgb(var(--color-tertiary-600)); color:#fff;}

.btn-error { background: rgb(var(--color-error-500)); color: #fff; }
.btn-error:hover:not([disabled]) { background: rgb(var(--color-error-600)); }

.btn-ghost { background: transparent; color: rgb(var(--color-primary-700)); border-color: rgb(var(--color-primary-300)); box-shadow: none;}
.btn-ghost:hover:not([disabled]) { background: rgb(var(--color-primary-50)); }

.btn-soft { background: rgb(var(--color-surface-100)); color: rgb(var(--color-surface-900)); box-shadow: none;}
.btn-soft:hover:not([disabled]) { background: rgb(var(--color-surface-200)); }

.btn-on-violet { background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.25); backdrop-filter: blur(4px);}
.btn-on-violet:hover { background: rgba(255,255,255,.2); }
`;

Object.assign(window, { Button, buttonStyles });
