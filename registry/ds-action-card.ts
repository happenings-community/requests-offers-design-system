import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-action-card')
export class DsActionCard extends LitElement {
  static styles = css`
    :host { display: block; }
    .card {
      background: #fff; border: 1px solid rgb(var(--border-1));
      border-radius: 12px; padding: 24px; box-shadow: var(--shadow-md);
      text-align: center; cursor: pointer;
      transition: box-shadow 150ms, border-color 150ms, transform 150ms;
    }
    .card:hover { box-shadow: var(--shadow-lg); border-color: rgb(var(--color-primary-300)); }
    .card:hover .icon { transform: scale(1.1); }
    .icon { font-size: 40px; margin-bottom: 10px; transition: transform 150ms; }
    .title { margin: 0 0 8px; font: 600 18px/24px var(--font-base); color: rgb(var(--fg-1)); }
    .desc { margin: 0 0 14px; font: 400 14px/22px var(--font-base); color: rgb(var(--fg-2)); }
    .cta { display: inline-block; border-radius: 9999px; padding: 8px 18px; font: 600 13px/20px var(--font-base); }
    .cta--primary   { background: rgb(var(--color-primary-500));   color: #fff; }
    .cta--secondary { background: rgb(var(--color-secondary-500)); color: #111; }
    .cta--warning   { background: rgb(var(--color-warning-500));   color: #111; }
    .cta--tertiary  { background: rgb(var(--color-tertiary-500));  color: #111; }
  `;

  @property({ reflect: true }) icon = '';
  @property({ reflect: true }) title = '';
  @property({ reflect: true }) description = '';
  @property({ attribute: 'cta-label', reflect: true }) ctaLabel = '';
  @property({ attribute: 'cta-tone', reflect: true }) ctaTone = 'secondary';

  render() {
    return html`
      <div class="card" role="button" tabindex="0"
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}>
        <div class="icon">${this.icon}</div>
        <h3 class="title">${this.title}</h3>
        <p class="desc">${this.description}</p>
        ${this.ctaLabel ? html`<span class="cta cta--${this.ctaTone}">${this.ctaLabel}</span>` : ''}
      </div>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('ds-action', { bubbles: true, composed: true }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') this._handleClick();
  }
}
