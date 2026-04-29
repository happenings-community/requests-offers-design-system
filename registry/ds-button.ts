import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-button')
export class DsButton extends LitElement {
  static styles = css`
    :host { display: inline-flex; }
    button {
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
    :host([size="sm"]) button { padding: 6px 14px; font-size: 13px; }
    button:active:not([disabled]) { transform: translateY(1px); }
    button[disabled] { opacity: .5; cursor: not-allowed; }

    :host([variant="primary"]) button { background: rgb(var(--color-primary-500)); color: #fff; }
    :host([variant="primary"]) button:hover:not([disabled]) { background: rgb(var(--color-primary-600)); box-shadow: var(--shadow-md); }

    :host([variant="secondary"]) button { background: rgb(var(--color-secondary-500)); color: #111; }
    :host([variant="secondary"]) button:hover:not([disabled]) { background: rgb(var(--color-tertiary-500)); color: #111; box-shadow: var(--shadow-md); }

    :host([variant="tertiary"]) button { background: rgb(var(--color-tertiary-500)); color: #111; }
    :host([variant="tertiary"]) button:hover:not([disabled]) { background: rgb(var(--color-tertiary-600)); color: #fff; }

    :host([variant="warning"]) button { background: rgb(var(--color-warning-500)); color: #111; }
    :host([variant="warning"]) button:hover:not([disabled]) { background: rgb(var(--color-error-500)); color: #fff; box-shadow: var(--shadow-md); }

    :host([variant="error"]) button { background: rgb(var(--color-error-500)); color: #fff; }
    :host([variant="error"]) button:hover:not([disabled]) { background: rgb(var(--color-error-600)); }

    :host([variant="ghost"]) button { background: transparent; color: rgb(var(--color-primary-700)); border-color: rgb(var(--color-primary-300)); box-shadow: none; }
    :host([variant="ghost"]) button:hover:not([disabled]) { background: rgb(var(--color-primary-50)); }

    :host([variant="soft"]) button { background: rgb(var(--color-surface-100)); color: rgb(var(--color-surface-900)); box-shadow: none; }
    :host([variant="soft"]) button:hover:not([disabled]) { background: rgb(var(--color-surface-200)); }

    :host([variant="on-violet"]) button { background: rgba(255,255,255,.12); color: #fff; border: 1px solid rgba(255,255,255,.25); backdrop-filter: blur(4px); }
    :host([variant="on-violet"]) button:hover { background: rgba(255,255,255,.2); }
  `;

  @property({ reflect: true }) variant = 'primary';
  @property({ reflect: true }) size = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html`
      <button ?disabled=${this.disabled}>
        <slot name="icon"></slot>
        <slot></slot>
      </button>
    `;
  }
}
