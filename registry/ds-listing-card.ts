import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-listing-card')
export class DsListingCard extends LitElement {
  static styles = css`
    :host { display: block; }
    .card {
      background: #fff; border: 1px solid rgb(var(--border-1));
      border-radius: 12px; padding: 18px; box-shadow: var(--shadow-sm);
      cursor: pointer;
      transition: box-shadow 150ms, border-color 150ms, transform 100ms;
      display: flex; flex-direction: column; gap: 10px;
    }
    .card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
    .head { display: flex; align-items: center; justify-content: space-between; }
    .time { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); }
    .chip {
      display: inline-flex; align-items: center; gap: 4px;
      border-radius: 9999px; padding: 4px 10px;
      font: 600 12px/18px var(--font-base); white-space: nowrap;
    }
    .chip--secondary { background: rgb(var(--color-secondary-100)); color: rgb(var(--color-secondary-900)); }
    .chip--warning   { background: rgb(var(--color-warning-100));   color: rgb(var(--color-warning-800)); }
    .chip--surface   { background: rgb(var(--color-surface-100));   color: rgb(var(--color-surface-800)); }
    .title { margin: 0; font: 600 18px/24px var(--font-base); color: rgb(var(--fg-1)); }
    .desc  {
      margin: 0; font: 400 14px/22px var(--font-base); color: rgb(var(--fg-2));
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .foot { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .avatar {
      width: 28px; height: 28px; border-radius: 9999px;
      background: rgb(var(--color-primary-200)); color: rgb(var(--color-primary-800));
      display: inline-grid; place-items: center;
      font: 700 12px/1 var(--font-base); flex-shrink: 0;
    }
    .owner { font: 500 13px/18px var(--font-base); color: rgb(var(--fg-2)); }
    .tags  { display: flex; gap: 6px; margin-left: auto; flex-wrap: wrap; }
  `;

  @property({ reflect: true }) kind = 'request';
  @property({ reflect: true }) title = '';
  @property({ reflect: true }) owner = '';
  @property({ attribute: 'owner-initial', reflect: true }) ownerInitial = '';
  @property({ reflect: true }) time = '';
  @property({ reflect: true }) description = '';
  @property({ reflect: true }) tags = '';

  private get _parsedTags(): string[] {
    return this.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  render() {
    const isRequest = this.kind === 'request';
    const tone = isRequest ? 'secondary' : 'warning';
    const icon = isRequest ? '📝' : '💡';
    const label = isRequest ? 'Request' : 'Offer';

    return html`
      <div class="card" role="button" tabindex="0"
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}>
        <div class="head">
          <span class="chip chip--${tone}">${icon} ${label}</span>
          <span class="time">${this.time}</span>
        </div>
        <h3 class="title">${this.title}</h3>
        <p class="desc">${this.description}</p>
        <div class="foot">
          <span class="avatar">${this.ownerInitial}</span>
          <span class="owner">${this.owner}</span>
          <span class="tags">
            ${this._parsedTags.map(t => html`<span class="chip chip--surface">${t}</span>`)}
          </span>
        </div>
      </div>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(new CustomEvent('ds-select', {
      detail: { kind: this.kind, title: this.title },
      bubbles: true, composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') this._handleClick();
  }
}
