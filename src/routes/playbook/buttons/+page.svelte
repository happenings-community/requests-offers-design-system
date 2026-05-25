<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head><title>Buttons — Playbook</title></svelte:head>

<h1 class="h2 mb-6">Buttons</h1>

<section class="pb-section">
  <h2 class="pb-label">Variants</h2>
  <div class="row">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="warning">Warning</Button>
    <Button variant="error">Error</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="soft">Soft</Button>
    <div class="on-violet-bg">
      <Button variant="on-violet">On Violet</Button>
    </div>
  </div>
  <pre class="pb-code"><code>&lt;Button variant="primary"&gt;Label&lt;/Button&gt;
&lt;Button variant="ghost"&gt;Label&lt;/Button&gt;
&lt;Button variant="on-violet"&gt;Label&lt;/Button&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Sizes</h2>
  <div class="row">
    <Button variant="primary" size="md">Medium (default)</Button>
    <Button variant="primary" size="sm">Small</Button>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Icon Slot</h2>
  <div class="row">
    <Button variant="secondary">
      {#snippet icon()}📝 {/snippet}
      Create Request
    </Button>
    <Button variant="warning">
      {#snippet icon()}💡 {/snippet}
      Post Offer
    </Button>
    <Button variant="ghost">
      {#snippet icon()}✕ {/snippet}
      Cancel
    </Button>
  </div>
  <pre class="pb-code"><code>&lt;Button variant="secondary"&gt;
  {"{#snippet icon()}📝 {/snippet}"}
  Create Request
&lt;/Button&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Disabled State</h2>
  <div class="row">
    <Button variant="primary" disabled>Primary</Button>
    <Button variant="secondary" disabled>Secondary</Button>
    <Button variant="ghost" disabled>Ghost</Button>
  </div>
  <pre class="pb-code"><code>&lt;Button variant="primary" disabled&gt;Submit&lt;/Button&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Token Reference</h2>
  <table class="token-table">
    <thead><tr><th>Variant</th><th>Skeleton class</th><th>Color</th></tr></thead>
    <tbody>
      <tr><td>primary</td><td><code>variant-filled-primary</code></td><td>#4720b7</td></tr>
      <tr><td>secondary</td><td><code>variant-filled-secondary</code></td><td>#ebc634</td></tr>
      <tr><td>ghost</td><td><code>variant-ghost</code></td><td>transparent</td></tr>
      <tr><td>soft</td><td><code>variant-soft-surface</code></td><td>surface tint</td></tr>
    </tbody>
  </table>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: var(--fg-3); margin: 0 0 16px; }
  .row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
  .on-violet-bg { background: rgb(var(--color-primary-500)); border-radius: 8px; padding: 8px 12px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .token-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); margin-top: 8px; }
  .token-table th { text-align: left; font-weight: 600; padding: 6px 12px; border-bottom: 1px solid var(--border-1); }
  .token-table td { padding: 6px 12px; border-bottom: 1px solid var(--border-1); }
  .token-table code { font-family: var(--font-mono); font-size: 12px; }
</style>
