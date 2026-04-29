import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-field')
export class DsField extends LitElement {
  static styles = css`
    :host { display: block; }
    label { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .label { font: 600 12px/16px var(--font-base); color: rgb(var(--fg-1)); }
    .hint  { font: 400 11px/16px var(--font-base); color: rgb(var(--fg-2)); }
    .error { font: 600 11px/16px var(--font-base); color: rgb(var(--color-error-600)); }
  `;

  @property({ reflect: true }) label = '';
  @property({ reflect: true }) hint = '';
  @property({ reflect: true }) error = '';

  render() {
    return html`
      <label>
        ${this.label ? html`<span class="label">${this.label}</span>` : ''}
        <slot></slot>
        ${this.error
          ? html`<span class="error">${this.error}</span>`
          : this.hint
          ? html`<span class="hint">${this.hint}</span>`
          : ''}
      </label>
    `;
  }
}
