import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './ds-status-dot.js';

const DROPDOWN_ITEMS: Record<string, Array<{ key: string; label: string; ic: string }>> = {
  activity: [
    { key: 'user-profile', label: 'My Profile',  ic: '👤' },
    { key: 'my-listings',  label: 'My Listings', ic: '📋' },
    { key: 'requests',     label: 'My Requests', ic: '📝' },
    { key: 'offers',       label: 'My Offers',   ic: '💡' },
  ],
  community: [
    { key: 'users', label: 'All Users',     ic: '👥' },
    { key: 'orgs',  label: 'Organizations', ic: '🏢' },
  ],
  resources: [
    { key: 'service-types', label: 'Service Types', ic: '🏷️' },
  ],
};

@customElement('ds-navbar')
export class DsNavbar extends LitElement {
  static styles = css`
    :host { display: block; }
    .navbar {
      height: 80px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 20px;
      background: rgb(var(--color-primary-500));
      box-shadow: var(--shadow-lg);
      position: sticky; top: 0; z-index: 30;
      gap: 12px;
    }
    .logo { display: flex; align-items: center; gap: 10px; cursor: pointer; flex-shrink: 0; }
    .logo img { width: 44px; height: 44px; }
    .logo-name { color: #fff; font: 700 17px/22px var(--font-base); white-space: nowrap; }
    .right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .menus { display: flex; gap: 2px; align-items: center; }
    .nav-menu { position: relative; }
    .nav-link {
      color: rgba(255,255,255,.92); font: 500 13px/20px var(--font-base);
      padding: 6px 8px; cursor: pointer; white-space: nowrap;
      border-radius: 6px; user-select: none; display: inline-flex; align-items: center; gap: 4px;
    }
    .nav-link:hover, .nav-link.is-open { background: rgba(255,255,255,.12); }
    .nav-chevron { opacity: .7; font-size: 10px; }
    .nav-pop {
      position: absolute; top: calc(100% + 6px); left: 0;
      background: #fff; min-width: 180px;
      border: 1px solid rgb(var(--border-1));
      border-radius: 12px; box-shadow: var(--shadow-lg);
      padding: 6px; z-index: 50;
    }
    .nav-pop-item {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 10px; border-radius: 8px;
      font: 500 13px/18px var(--font-base); color: rgb(var(--fg-1));
      cursor: pointer; border: none; background: none; width: 100%; text-align: left;
    }
    .nav-pop-item:hover { background: rgb(var(--color-primary-50)); color: rgb(var(--color-primary-800)); }
    .nav-pop-ic { width: 20px; text-align: center; }
    .btn {
      display: inline-flex; align-items: center; gap: 6px;
      border-radius: 9999px; padding: 8px 16px;
      font: 600 13px/20px var(--font-base);
      border: 1px solid transparent; cursor: pointer;
      transition: background-color 100ms, box-shadow 100ms;
      white-space: nowrap;
    }
    .btn--secondary { background: rgb(var(--color-secondary-500)); color: #111; }
    .btn--secondary:hover { background: rgb(var(--color-secondary-400)); }
    .btn--warning { background: rgb(var(--color-warning-500)); color: #111; }
    .btn--warning:hover { background: rgb(var(--color-warning-400)); }
    .btn--on-violet { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.25); backdrop-filter: blur(4px); }
    .btn--on-violet:hover { background: rgba(255,255,255,.2); }
    .btn--sm { padding: 5px 12px; font-size: 12px; }
  `;

  @property({ attribute: 'app-name', reflect: true }) appName = 'Requests & Offers';
  @property({ attribute: 'logo-src', reflect: true }) logoSrc = '';
  @property({ attribute: 'active-route', reflect: true }) activeRoute = '';

  @state() private _openMenu: string | null = null;

  private _outsideClick = (e: MouseEvent) => {
    if (!this.contains(e.composedPath()[0] as Node)) {
      this._openMenu = null;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClick);
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="logo" @click=${() => this._navigate('home')}>
          ${this.logoSrc ? html`<img src=${this.logoSrc} alt="logo" />` : ''}
          <span class="logo-name">${this.appName}</span>
        </div>
        <div class="right">
          <button class="btn btn--secondary" @click=${() => this._navigate('requests')}>📝 Requests</button>
          <button class="btn btn--warning"   @click=${() => this._navigate('offers')}>💡 Offers</button>
          <div class="menus">
            ${this._renderMenu('activity', 'My Activity')}
            ${this._renderMenu('community', 'Community')}
            ${this._renderMenu('resources', 'Resources')}
          </div>
          <ds-status-dot status="connected"></ds-status-dot>
          <button class="btn btn--on-violet btn--sm" @click=${this._openMap}>🗺️ Map</button>
        </div>
      </nav>
    `;
  }

  private _renderMenu(key: string, label: string) {
    const isOpen = this._openMenu === key;
    return html`
      <div class="nav-menu">
        <span class="nav-link ${isOpen ? 'is-open' : ''}"
          @click=${(e: Event) => { e.stopPropagation(); this._openMenu = isOpen ? null : key; }}>
          ${label} <span class="nav-chevron" aria-hidden>▾</span>
        </span>
        ${isOpen ? html`
          <div class="nav-pop" @click=${(e: Event) => e.stopPropagation()}>
            ${DROPDOWN_ITEMS[key].map(item => html`
              <button class="nav-pop-item" @click=${() => { this._navigate(item.key); this._openMenu = null; }}>
                <span class="nav-pop-ic">${item.ic}</span>${item.label}
              </button>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _navigate(route: string) {
    this.dispatchEvent(new CustomEvent('ds-navigate', {
      detail: { route },
      bubbles: true, composed: true,
    }));
  }

  private _openMap() {
    this.dispatchEvent(new CustomEvent('ds-map-open', { bubbles: true, composed: true }));
  }
}
