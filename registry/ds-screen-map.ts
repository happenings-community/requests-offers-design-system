import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const SCREEN_MAP = [
  { section: 'Home', screens: [
    { key: 'home', label: 'Home dashboard', ic: '🏠' },
  ]},
  { section: 'Requests', screens: [
    { key: 'requests',       label: 'Browse requests',  ic: '📝' },
    { key: 'request-detail', label: 'Request detail',   ic: '📝' },
    { key: 'request-create', label: 'Create request',   ic: '✏️' },
    { key: 'request-edit',   label: 'Edit request',     ic: '✏️' },
  ]},
  { section: 'Offers', screens: [
    { key: 'offers',       label: 'Browse offers',  ic: '💡' },
    { key: 'offer-detail', label: 'Offer detail',   ic: '💡' },
    { key: 'offer-create', label: 'Create offer',   ic: '✏️' },
    { key: 'offer-edit',   label: 'Edit offer',     ic: '✏️' },
  ]},
  { section: 'Users', screens: [
    { key: 'users',        label: 'All users',      ic: '👥' },
    { key: 'user-profile', label: 'User profile',   ic: '👤' },
    { key: 'user-create',  label: 'Create profile', ic: '✏️' },
    { key: 'my-listings',  label: 'My listings',    ic: '📋' },
  ]},
  { section: 'Organizations', screens: [
    { key: 'orgs',       label: 'All organizations', ic: '🏢' },
    { key: 'org-detail', label: 'Org detail',        ic: '🏢' },
    { key: 'org-create', label: 'Create org',        ic: '✏️' },
  ]},
  { section: 'Service Types', screens: [
    { key: 'service-types',        label: 'All service types',   ic: '🏷️' },
    { key: 'service-type-detail',  label: 'Service type detail', ic: '🏷️' },
    { key: 'suggest-service-type', label: 'Suggest a type',      ic: '✏️' },
  ]},
  { section: 'Other', screens: [
    { key: 'profile-guard', label: 'Profile guard', ic: '🔒' },
    { key: 'connecting',    label: 'Connecting…',   ic: '🔗' },
  ]},
  { section: 'Joining', screens: [
    { key: 'join-welcome',      label: 'Welcome (public)',  ic: '🤝' },
    { key: 'join-form',         label: 'Application form',  ic: '📝' },
    { key: 'join-pending',      label: 'Awaiting review',   ic: '⏳' },
    { key: 'join-approved',     label: 'Welcome aboard',    ic: '🎉' },
    { key: 'join-set-password', label: 'Set device password', ic: '🔑' },
    { key: 'join-rejected',     label: 'Not at this time',  ic: '💌' },
  ]},
  { section: 'Membrane gates', screens: [
    { key: 'password-gate',       label: 'Unlock instance',    ic: '🔒' },
    { key: 'rules-reattestation', label: 'Updated agreements', ic: '📜' },
    { key: 'member-suspended',    label: 'Account suspended',  ic: '⛔' },
    { key: 'access-issue',        label: 'Access issue',       ic: '⚠️' },
  ]},
  { section: 'Admin', screens: [
    { key: 'admin',                label: 'Dashboard',           ic: '🏠' },
    { key: 'admin-mediums',        label: 'Mediums of Exchange', ic: '💱' },
    { key: 'admin-service-types',  label: 'Service Types',       ic: '🏷️' },
    { key: 'admin-orgs',           label: 'Organizations',       ic: '🏢' },
    { key: 'admin-requests',       label: 'Requests',            ic: '📝' },
    { key: 'admin-offers',         label: 'Offers',              ic: '💡' },
    { key: 'admin-administrators', label: 'Administrators',      ic: '🛡️' },
  ]},
];

@customElement('ds-screen-map')
export class DsScreenMap extends LitElement {
  static styles = css`
    .overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.45);
      z-index: 200; display: flex; align-items: flex-start; justify-content: flex-end;
      padding: 12px;
    }
    .panel {
      background: #fff; border-radius: 14px; width: 280px;
      box-shadow: var(--shadow-xl); display: flex; flex-direction: column;
      max-height: calc(100vh - 24px); overflow: hidden;
    }
    .header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 16px; border-bottom: 1px solid rgb(var(--border-1)); flex-shrink: 0;
    }
    .header-title { font-weight: 700; font-size: 15px; }
    .close {
      background: none; border: none; cursor: pointer; font-size: 16px;
      color: rgb(var(--fg-2)); padding: 2px 6px; border-radius: 6px;
    }
    .close:hover { background: rgb(var(--bg-muted)); }
    .body { overflow-y: auto; padding: 10px 8px 16px; }
    .group { margin-bottom: 10px; }
    .section {
      font: 600 10px/14px var(--font-base); letter-spacing: .1em;
      text-transform: uppercase; color: rgb(var(--fg-3));
      padding: 4px 8px 2px;
    }
    .item {
      display: flex; align-items: center; gap: 8px; width: 100%;
      padding: 7px 10px; border-radius: 8px; border: none; background: none;
      font: 400 13px/18px var(--font-base); color: rgb(var(--fg-1));
      cursor: pointer; text-align: left; transition: background 100ms;
    }
    .item:hover { background: rgb(var(--color-primary-50)); color: rgb(var(--color-primary-800)); }
    .item--active { background: rgb(var(--color-primary-100)); color: rgb(var(--color-primary-800)); font-weight: 600; }
    .ic { width: 20px; text-align: center; font-size: 14px; }
  `;

  @property({ attribute: 'current-route', reflect: true }) currentRoute = '';

  render() {
    return html`
      <div class="overlay" @click=${this._close}>
        <div class="panel" @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <span class="header-title">🗺️ All Screens</span>
            <button class="close" @click=${this._close}>✕</button>
          </div>
          <div class="body">
            ${SCREEN_MAP.map(group => html`
              <div class="group">
                <div class="section">${group.section}</div>
                ${group.screens.map(s => html`
                  <button
                    class="item ${this.currentRoute === s.key ? 'item--active' : ''}"
                    @click=${() => this._navigate(s.key)}
                  >
                    <span class="ic">${s.ic}</span>
                    ${s.label}
                  </button>
                `)}
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  }

  private _close() {
    this.dispatchEvent(new CustomEvent('ds-close', { bubbles: true, composed: true }));
  }

  private _navigate(route: string) {
    this.dispatchEvent(new CustomEvent('ds-navigate', {
      detail: { route },
      bubbles: true, composed: true,
    }));
    this._close();
  }
}
