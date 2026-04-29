import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-chip')
export class DsChip extends LitElement {
  static styles = css`
    :host {
      display: inline-flex; align-items: center; gap: 6px;
      border-radius: 9999px; padding: 4px 10px;
      font: 600 12px/18px var(--font-base);
      white-space: nowrap;
    }
    :host([tone="primary"])   { background: rgb(var(--color-primary-100));   color: rgb(var(--color-primary-800)); }
    :host([tone="secondary"]) { background: rgb(var(--color-secondary-100)); color: rgb(var(--color-secondary-900)); }
    :host([tone="tertiary"])  { background: rgb(var(--color-tertiary-100));  color: rgb(var(--color-tertiary-800)); }
    :host([tone="warning"])   { background: rgb(var(--color-warning-100));   color: rgb(var(--color-warning-800)); }
    :host([tone="success"])   { background: rgb(var(--color-success-100));   color: rgb(var(--color-success-900)); }
    :host([tone="error"])     { background: rgb(var(--color-error-100));     color: rgb(var(--color-error-800)); }
    :host([tone="surface"])   { background: rgb(var(--color-surface-100));   color: rgb(var(--color-surface-800)); }
  `;

  @property({ reflect: true }) tone = 'primary';

  render() {
    return html`<slot></slot>`;
  }
}
