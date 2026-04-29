import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './ds-navbar.js';
import './ds-screen-map.js';

@customElement('ds-shell')
export class DsShell extends LitElement {
  static styles = css`
    :host { display: block; }
    .shell { min-height: 100vh; display: grid; grid-template-rows: auto 1fr; background: rgb(var(--bg-app)); }
    .main { padding: 32px 16px 64px; }
    .map-fab {
      position: fixed; bottom: 20px; right: 20px; z-index: 100;
      width: 48px; height: 48px; border-radius: 9999px;
      background: rgb(var(--color-primary-500)); color: #fff;
      border: none; cursor: pointer; font-size: 20px;
      box-shadow: var(--shadow-lg);
      display: grid; place-items: center;
      transition: transform 150ms, box-shadow 150ms;
    }
    .map-fab:hover { transform: scale(1.08); box-shadow: var(--shadow-xl); }
  `;

  @property({ reflect: true }) route = '';
  @property({ attribute: 'is-admin', type: Boolean, reflect: true }) isAdmin = false;
  @property({ attribute: 'app-name', reflect: true }) appName = 'Requests & Offers';
  @property({ attribute: 'logo-src', reflect: true }) logoSrc = '';

  @state() private _mapOpen = false;

  private _keyHandler?: (e: KeyboardEvent) => void;

  connectedCallback() {
    super.connectedCallback();
    this._keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'm' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        this._mapOpen = !this._mapOpen;
      }
    };
    window.addEventListener('keydown', this._keyHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._keyHandler) window.removeEventListener('keydown', this._keyHandler);
  }

  render() {
    if (this.isAdmin) {
      return html`
        <slot></slot>
        <button class="map-fab" title="Screen map (M)" @click=${() => (this._mapOpen = true)}>🗺️</button>
        ${this._mapOpen ? html`
          <ds-screen-map
            current-route=${this.route}
            @ds-navigate=${this._onNavigate}
            @ds-close=${() => (this._mapOpen = false)}>
          </ds-screen-map>
        ` : ''}
      `;
    }
    return html`
      <div class="shell">
        <ds-navbar
          app-name=${this.appName}
          logo-src=${this.logoSrc}
          active-route=${this.route}
          @ds-navigate=${this._onNavigate}
          @ds-map-open=${() => (this._mapOpen = true)}>
        </ds-navbar>
        <main class="main"><slot></slot></main>
        ${this._mapOpen ? html`
          <ds-screen-map
            current-route=${this.route}
            @ds-navigate=${this._onNavigate}
            @ds-close=${() => (this._mapOpen = false)}>
          </ds-screen-map>
        ` : ''}
      </div>
    `;
  }

  private _onNavigate(e: CustomEvent) {
    this.route = e.detail.route;
    this._mapOpen = false;
    this.dispatchEvent(new CustomEvent('ds-navigate', {
      detail: e.detail,
      bubbles: true, composed: true,
    }));
  }
}
