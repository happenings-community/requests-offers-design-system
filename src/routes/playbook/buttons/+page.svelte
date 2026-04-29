<svelte:head><title>Buttons — Playbook</title></svelte:head>

<h1 class="ds-h2" style="margin-bottom: 24px;">Buttons</h1>

<section class="pb-section">
  <h2 class="pb-label">Variants</h2>
  <div class="row">
    <ds-button variant="primary">Primary</ds-button>
    <ds-button variant="secondary">Secondary</ds-button>
    <ds-button variant="tertiary">Tertiary</ds-button>
    <ds-button variant="warning">Warning</ds-button>
    <ds-button variant="error">Error</ds-button>
    <ds-button variant="ghost">Ghost</ds-button>
    <ds-button variant="soft">Soft</ds-button>
    <div class="on-violet-bg">
      <ds-button variant="on-violet">On Violet</ds-button>
    </div>
  </div>
  <pre class="pb-code"><code>&lt;ds-button variant="primary"&gt;Label&lt;/ds-button&gt;
&lt;ds-button variant="ghost"&gt;Label&lt;/ds-button&gt;
&lt;ds-button variant="on-violet"&gt;Label&lt;/ds-button&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Sizes</h2>
  <div class="row">
    <ds-button variant="primary" size="md">Medium (default)</ds-button>
    <ds-button variant="primary" size="sm">Small</ds-button>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Icon Slot</h2>
  <div class="row">
    <ds-button variant="secondary"><span slot="icon">📝</span>Create Request</ds-button>
    <ds-button variant="warning"><span slot="icon">💡</span>Post Offer</ds-button>
    <ds-button variant="ghost"><span slot="icon">✕</span>Cancel</ds-button>
  </div>
  <pre class="pb-code"><code>&lt;ds-button variant="secondary"&gt;
  &lt;span slot="icon"&gt;📝&lt;/span&gt;
  Create Request
&lt;/ds-button&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Disabled State</h2>
  <div class="row">
    <ds-button variant="primary" disabled>Primary</ds-button>
    <ds-button variant="secondary" disabled>Secondary</ds-button>
    <ds-button variant="ghost" disabled>Ghost</ds-button>
  </div>
  <pre class="pb-code"><code>&lt;ds-button variant="primary" disabled&gt;Submit&lt;/ds-button&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Token Reference</h2>
  <table class="token-table">
    <thead><tr><th>Token</th><th>Value</th><th>Used by</th></tr></thead>
    <tbody>
      <tr><td><code>--color-primary-500</code></td><td>71 32 183</td><td>primary bg</td></tr>
      <tr><td><code>--color-secondary-500</code></td><td>235 198 52</td><td>secondary bg</td></tr>
      <tr><td><code>--radius-pill</code></td><td>9999px</td><td>all buttons</td></tr>
      <tr><td><code>--shadow-md</code></td><td>4px blur</td><td>hover shadow</td></tr>
    </tbody>
  </table>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: rgb(var(--fg-3)); margin: 0 0 16px; }
  .row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
  .on-violet-bg { background: rgb(var(--color-primary-500)); border-radius: 8px; padding: 8px 12px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .token-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); margin-top: 8px; }
  .token-table th { text-align: left; font-weight: 600; padding: 6px 12px; border-bottom: 1px solid rgb(var(--border-1)); }
  .token-table td { padding: 6px 12px; border-bottom: 1px solid rgb(var(--border-1)); }
  .token-table code { font-family: var(--font-mono); font-size: 12px; }
</style>
