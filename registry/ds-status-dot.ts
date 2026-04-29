import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-status-dot')
export class DsStatusDot extends LitElement {
  static styles = css`
    :host { display: inline-flex; }
    .pill {
      display: inline-flex; align-items: center; gap: 6px;
      border: 1px solid rgba(255,255,255,.25);
      background: rgba(255,255,255,.12);
      backdrop-filter: blur(4px);
      border-radius: 9999px; padding: 4px 12px;
      color: #fff; font: 500 12px/18px var(--font-base);
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    :host([status="connected"])    .dot { background: rgb(var(--color-success-500)); }
    :host([status="checking"])     .dot { background: rgb(var(--color-warning-500)); }
    :host([status="disconnected"]) .dot { background: rgb(var(--color-warning-700)); }
    :host([status="error"])        .dot { background: rgb(var(--color-error-500)); }
    .label { opacity: .9; }
  `;

  @property({ reflect: true }) status = 'connected';

  private get _label(): string {
    const map: Record<string, string> = {
      connected: 'Connected',
      checking: 'Checking…',
      disconnected: 'Disconnected',
      error: 'Error',
    };
    return map[this.status] ?? 'Connected';
  }

  render() {
    return html`
      <span class="pill">
        <span class="dot" aria-hidden="true"></span>
        <span class="label">${this._label}</span>
      </span>
    `;
  }
}
