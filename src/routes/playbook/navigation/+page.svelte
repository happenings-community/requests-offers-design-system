<svelte:head><title>Navigation — Playbook</title></svelte:head>

<h1 class="ds-h2" style="margin-bottom: 24px;">Navigation</h1>

<section class="pb-section">
  <h2 class="pb-label">NavBar — Interactive</h2>
  <p class="ds-small" style="margin-bottom: 12px;">
    Dropdowns open on click, close on outside click. Fires <code>ds-navigate</code> on item select and <code>ds-map-open</code> on the Map button.
  </p>
  <div class="navbar-demo">
    <ds-navbar app-name="Requests & Offers" logo-src="/assets/hAppeningsCIClogo.png"></ds-navbar>
  </div>
  <pre class="pb-code"><code>&lt;ds-navbar
  app-name="Requests &amp; Offers"
  logo-src="/assets/logo.png"
  @ds-navigate="${(e) => router.go(e.detail.route)}"
  @ds-map-open="${() => showMap = true}"&gt;
&lt;/ds-navbar&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Shell — Layout Wrapper</h2>
  <p class="ds-small" style="margin-bottom: 12px;">
    Composes <code>ds-navbar</code> + main slot + optional <code>ds-screen-map</code>.
    Press <kbd>M</kbd> to toggle the screen map.
  </p>
  <div class="shell-demo">
    <ds-shell app-name="Requests & Offers" logo-src="/assets/hAppeningsCIClogo.png" route="home">
      <div class="shell-content">
        <p class="ds-p">Page content goes here via <code>&lt;slot&gt;</code>.</p>
        <p class="ds-small">Press <kbd>M</kbd> to toggle the screen map panel.</p>
      </div>
    </ds-shell>
  </div>
  <pre class="pb-code"><code>&lt;ds-shell
  app-name="Requests &amp; Offers"
  logo-src="/assets/logo.png"
  route="home"
  @ds-navigate="${(e) => handleNav(e.detail.route)}"&gt;
  &lt;!-- your page content --&gt;
&lt;/ds-shell&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Shell — Admin Mode</h2>
  <p class="ds-small" style="margin-bottom: 12px;">
    Set <code>is-admin</code> to skip the NavBar and show a FAB for the screen map instead.
  </p>
  <pre class="pb-code"><code>&lt;ds-shell is-admin route="admin"&gt;
  &lt;!-- admin layout content --&gt;
&lt;/ds-shell&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Event API</h2>
  <table class="token-table">
    <thead><tr><th>Component</th><th>Event</th><th>detail</th></tr></thead>
    <tbody>
      <tr><td><code>ds-navbar</code></td><td><code>ds-navigate</code></td><td><code>{'{'} route: string {'}'}</code></td></tr>
      <tr><td><code>ds-navbar</code></td><td><code>ds-map-open</code></td><td>—</td></tr>
      <tr><td><code>ds-shell</code></td><td><code>ds-navigate</code></td><td><code>{'{'} route: string {'}'}</code></td></tr>
      <tr><td><code>ds-screen-map</code></td><td><code>ds-navigate</code></td><td><code>{'{'} route: string {'}'}</code></td></tr>
      <tr><td><code>ds-screen-map</code></td><td><code>ds-close</code></td><td>—</td></tr>
    </tbody>
  </table>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: rgb(var(--fg-3)); margin: 0 0 16px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .navbar-demo { border-radius: 10px; overflow: hidden; border: 1px solid rgb(var(--border-1)); }
  .shell-demo { border-radius: 10px; overflow: hidden; border: 1px solid rgb(var(--border-1)); max-height: 320px; overflow-y: auto; }
  .shell-content { padding: 24px; }
  .token-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); margin-top: 8px; }
  .token-table th { text-align: left; font-weight: 600; padding: 6px 12px; border-bottom: 1px solid rgb(var(--border-1)); }
  .token-table td { padding: 6px 12px; border-bottom: 1px solid rgb(var(--border-1)); }
  .token-table code { font-family: var(--font-mono); font-size: 12px; }
  kbd { font-family: var(--font-mono); font-size: 12px; background: rgb(var(--bg-muted)); border: 1px solid rgb(var(--border-2)); border-radius: 4px; padding: 1px 5px; }
</style>
