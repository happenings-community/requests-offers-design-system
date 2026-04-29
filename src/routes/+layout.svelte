<script lang="ts">
  import { page } from '$app/state';

  let isApp = $derived(page.url.pathname.startsWith('/ui-kit/app'));
  let current = $derived(page.url.pathname);

  const playbook = [
    { href: '/playbook/buttons',    label: 'Buttons',     icon: '🔘' },
    { href: '/playbook/badges',     label: 'Badges',      icon: '🏷️' },
    { href: '/playbook/cards',      label: 'Cards',       icon: '🃏' },
    { href: '/playbook/inputs',     label: 'Inputs',      icon: '✏️' },
    { href: '/playbook/navigation', label: 'Navigation',  icon: '🧭' },
  ];
  const scenarios = [
    { href: '/ui-kit/browse-active',         label: 'Browse Active',   icon: '🏠' },
    { href: '/ui-kit/create-request',        label: 'Create Request',  icon: '📝' },
    { href: '/ui-kit/admin-dashboard',       label: 'Admin',           icon: '⚙️' },
    { href: '/ui-kit/connecting-onboarding', label: 'Connecting',      icon: '🔗' },
  ];
</script>

{#if isApp}
  <slot />
{:else}
  <div class="ds-chrome">
    <aside class="ds-sidebar">
      <a href="/" class="ds-logo">
        <img src="/assets/hAppeningsCIClogo.png" alt="hAppenings" />
        <div>
          <div class="ds-logo-title">hAppenings</div>
          <div class="ds-logo-sub">Design System</div>
        </div>
      </a>

      <a href="/ui-kit/app" class="app-mode-btn">
        <span>🚀</span> App Mode
      </a>

      <nav class="ds-nav">
        <div class="ds-nav-section">
          <a href="/playbook" class="ds-nav-group-label {current.startsWith('/playbook') ? 'is-active-group' : ''}">
            📖 Playbook
          </a>
          {#each playbook as link}
            <a href={link.href} class="ds-nav-item {current === link.href ? 'is-active' : ''}">
              <span class="ds-nav-ic">{link.icon}</span>{link.label}
            </a>
          {/each}
        </div>

        <div class="ds-nav-section">
          <a href="/ui-kit" class="ds-nav-group-label {current.startsWith('/ui-kit') && !current.startsWith('/ui-kit/app') ? 'is-active-group' : ''}">
            🖼️ UI Kit Scenarios
          </a>
          {#each scenarios as link}
            <a href={link.href} class="ds-nav-item {current === link.href ? 'is-active' : ''}">
              <span class="ds-nav-ic">{link.icon}</span>{link.label}
            </a>
          {/each}
        </div>
      </nav>

      <div class="ds-sidebar-footer">
        <span class="ds-sidebar-version">v0.1.0</span>
      </div>
    </aside>

    <main class="ds-main">
      <slot />
    </main>
  </div>
{/if}

<style>
  :global(*, *::before, *::after) { box-sizing: border-box; }
  :global(body) { margin: 0; font-family: var(--font-base); background: rgb(var(--bg-muted)); color: rgb(var(--fg-1)); }

  .ds-chrome { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }

  .ds-sidebar {
    background: rgb(var(--color-primary-900));
    display: flex; flex-direction: column;
    padding: 16px 12px;
    position: sticky; top: 0; height: 100vh; overflow-y: auto;
  }

  .ds-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; padding: 4px 8px; border-radius: 8px;
    margin-bottom: 16px;
    transition: background 100ms;
  }
  .ds-logo:hover { background: rgba(255,255,255,.06); }
  .ds-logo img { width: 36px; height: 36px; flex-shrink: 0; }
  .ds-logo-title { font: 700 14px/18px var(--font-base); color: #fff; }
  .ds-logo-sub { font: 400 11px/14px var(--font-base); color: rgba(255,255,255,.5); }

  .app-mode-btn {
    display: flex; align-items: center; gap: 8px; justify-content: center;
    padding: 9px 12px; border-radius: 10px; margin-bottom: 20px;
    background: rgb(var(--color-secondary-500)); color: #111;
    font: 700 13px/18px var(--font-base); text-decoration: none;
    transition: background 100ms, transform 100ms;
  }
  .app-mode-btn:hover { background: rgb(var(--color-secondary-400)); transform: translateY(-1px); }

  .ds-nav { display: flex; flex-direction: column; gap: 16px; flex: 1; }
  .ds-nav-section { display: flex; flex-direction: column; gap: 2px; }

  .ds-nav-group-label {
    font: 600 10px/14px var(--font-base); letter-spacing: .1em; text-transform: uppercase;
    color: rgba(255,255,255,.4); padding: 6px 8px 4px; display: block; text-decoration: none;
    transition: color 100ms;
  }
  .ds-nav-group-label.is-active-group { color: rgba(255,255,255,.7); }
  .ds-nav-group-label:hover { color: rgba(255,255,255,.7); }

  .ds-nav-item {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 10px; border-radius: 7px;
    font: 500 13px/18px var(--font-base); color: rgba(255,255,255,.65);
    text-decoration: none; transition: background 100ms, color 100ms;
  }
  .ds-nav-item:hover { background: rgba(255,255,255,.08); color: rgba(255,255,255,.9); }
  .ds-nav-item.is-active { background: rgba(255,255,255,.12); color: #fff; }
  .ds-nav-ic { width: 18px; text-align: center; font-size: 13px; }

  .ds-sidebar-footer { margin-top: auto; padding-top: 12px; }
  .ds-sidebar-version { font: 400 11px/14px var(--font-mono); color: rgba(255,255,255,.25); padding: 0 8px; }

  .ds-main { min-height: 100vh; background: rgb(var(--bg-muted)); }
</style>
