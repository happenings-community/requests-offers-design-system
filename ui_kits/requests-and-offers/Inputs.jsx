/* eslint-disable */

function Field({ label, hint, error, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
      {error ? <span className="field__error">{error}</span> :
        hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  );
}

function TextInput(props) { return <input className="ds-input" {...props} />; }
function TextArea(props) { return <textarea className="ds-input" rows={3} {...props} />; }
function Select({ children, ...props }) { return <select className="ds-input" {...props}>{children}</select>; }

const inputStyles = `
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
.field__label { font: 600 12px/16px var(--font-base); color: rgb(var(--fg-1)); }
.field__hint  { font: 400 11px/16px var(--font-base); color: rgb(var(--fg-2)); }
.field__error { font: 600 11px/16px var(--font-base); color: rgb(var(--color-error-600)); }
.ds-input {
  font: 400 14px/20px var(--font-base);
  border: 1px solid rgb(var(--border-2));
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff;
  color: rgb(var(--fg-1));
  outline: none;
  transition: border-color 150ms, box-shadow 150ms;
  width: 100%;
  box-sizing: border-box;
}
.ds-input:focus {
  border-color: rgb(var(--color-primary-500));
  box-shadow: 0 0 0 3px rgb(var(--color-primary-200) / .55);
}
.ds-input::placeholder { color: rgb(var(--fg-3)); }
`;

Object.assign(window, { Field, TextInput, TextArea, Select, inputStyles });
