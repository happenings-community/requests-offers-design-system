<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Shell from '$lib/components/Shell.svelte';
  import ScreenMap from '$lib/components/ScreenMap.svelte';

  let mapOpen = $state(false);
</script>

<svelte:head><title>Navigation — Playbook</title></svelte:head>

<h1 class="h2 mb-6">Navigation</h1>

<section class="pb-section">
  <h2 class="pb-label">NavBar — Interactive</h2>
  <p class="text-sm opacity-60 mb-3">
    Nav items highlight the active route from <code>$app/state</code> and navigate via <code>goto()</code>.
  </p>
  <div class="navbar-demo">
    <Navbar
      appName="Requests & Offers"
      logoSrc="/assets/hAppeningsCIClogo.png"
      status="connected"
      showAdmin
    />
  </div>
  <pre class="pb-code"><code>&lt;Navbar
  appName="Requests &amp; Offers"
  logoSrc="/assets/logo.png"
  status="connected"
  showAdmin
/&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Shell — Layout Wrapper</h2>
  <p class="text-sm opacity-60 mb-3">
    Composes <code>Navbar</code> + main slot + <code>ScreenMap</code>. Press <kbd>M</kbd> to toggle the map.
  </p>
  <div class="shell-demo">
    <Shell appName="Requests & Offers" logoSrc="/assets/hAppeningsCIClogo.png" showAdmin>
      <div class="p-6">
        <p class="text-sm opacity-70">Page content goes here via children snippet.</p>
        <p class="text-xs opacity-40 mt-1">Press <kbd class="kbd kbd-sm">M</kbd> to toggle the screen map.</p>
      </div>
    </Shell>
  </div>
  <pre class="pb-code"><code>&lt;Shell
  appName="Requests &amp; Offers"
  logoSrc="/assets/logo.png"
  isAdmin={false}
  showAdmin
&gt;
  &lt;!-- page content --&gt;
&lt;/Shell&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">ScreenMap — Standalone</h2>
  <p class="text-sm opacity-60 mb-3">
    Overlay panel showing all app screens. Press the button or <kbd>M</kbd> anywhere. Navigates via <code>goto()</code>.
  </p>
  <button class="btn variant-filled-primary" onclick={() => (mapOpen = true)}>
    Open Screen Map
  </button>
  <ScreenMap open={mapOpen} onclose={() => (mapOpen = false)} />
</section>

<section class="pb-section">
  <h2 class="pb-label">Prop API</h2>
  <table class="token-table">
    <thead><tr><th>Component</th><th>Prop</th><th>Type</th></tr></thead>
    <tbody>
      <tr><td><code>Navbar</code></td><td><code>appName</code></td><td><code>string</code></td></tr>
      <tr><td><code>Navbar</code></td><td><code>status</code></td><td><code>'connected' | 'checking' | 'disconnected' | 'error'</code></td></tr>
      <tr><td><code>Navbar</code></td><td><code>showAdmin</code></td><td><code>boolean</code></td></tr>
      <tr><td><code>Shell</code></td><td><code>isAdmin</code></td><td><code>boolean</code></td></tr>
      <tr><td><code>Shell</code></td><td><code>showAdmin</code></td><td><code>boolean</code></td></tr>
      <tr><td><code>ScreenMap</code></td><td><code>open</code></td><td><code>boolean</code></td></tr>
      <tr><td><code>ScreenMap</code></td><td><code>onclose</code></td><td><code>() =&gt; void</code></td></tr>
    </tbody>
  </table>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: var(--fg-3); margin: 0 0 16px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .navbar-demo { border-radius: 10px; overflow: hidden; border: 1px solid var(--border-1); }
  .shell-demo { border-radius: 10px; overflow: hidden; border: 1px solid var(--border-1); max-height: 280px; overflow-y: auto; }
  .token-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); margin-top: 8px; }
  .token-table th { text-align: left; font-weight: 600; padding: 6px 12px; border-bottom: 1px solid var(--border-1); }
  .token-table td { padding: 6px 12px; border-bottom: 1px solid var(--border-1); }
  .token-table code { font-family: var(--font-mono); font-size: 12px; }
  kbd { font-family: var(--font-mono); font-size: 12px; background: rgb(var(--color-surface-100)); border: 1px solid var(--border-2); border-radius: 4px; padding: 1px 5px; }
</style>
