<script lang="ts">
  import Chip from '$lib/components/Chip.svelte';
  import StatusDot from '$lib/components/StatusDot.svelte';
</script>

<svelte:head><title>Badges — Playbook</title></svelte:head>

<h1 class="h2 mb-6">Badges</h1>

<section class="pb-section">
  <h2 class="pb-label">Chip Tones</h2>
  <div class="row">
    <Chip tone="primary">Primary</Chip>
    <Chip tone="secondary">Secondary</Chip>
    <Chip tone="tertiary">Tertiary</Chip>
    <Chip tone="warning">Warning</Chip>
    <Chip tone="success">Success</Chip>
    <Chip tone="error">Error</Chip>
    <Chip tone="surface">Surface</Chip>
  </div>
  <pre class="pb-code"><code>&lt;Chip tone="primary"&gt;Label&lt;/Chip&gt;
&lt;Chip tone="success"&gt;Active&lt;/Chip&gt;
&lt;Chip tone="error"&gt;Rejected&lt;/Chip&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Chips with Icons (Common Patterns)</h2>
  <div class="row">
    <Chip tone="secondary">📝 Request</Chip>
    <Chip tone="warning">💡 Offer</Chip>
    <Chip tone="surface">🏷️ Mentoring</Chip>
    <Chip tone="surface">🏷️ Design</Chip>
    <Chip tone="tertiary">🏢 hAppenings CIC</Chip>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Status Dot — Connection States</h2>
  <p class="text-sm opacity-60 mb-3">Designed for the violet navbar context. Shown on a matching background.</p>
  <div class="violet-band">
    <StatusDot status="connected" />
    <StatusDot status="checking" />
    <StatusDot status="disconnected" />
    <StatusDot status="error" />
  </div>
  <pre class="pb-code"><code>&lt;StatusDot status="connected" /&gt;
&lt;StatusDot status="checking" /&gt;
&lt;StatusDot status="disconnected" /&gt;
&lt;StatusDot status="error" /&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Token Reference</h2>
  <table class="token-table">
    <thead><tr><th>Chip tone</th><th>Skeleton class</th></tr></thead>
    <tbody>
      <tr><td>primary</td><td><code>variant-soft-primary</code></td></tr>
      <tr><td>secondary</td><td><code>variant-soft-secondary</code></td></tr>
      <tr><td>success</td><td><code>variant-soft-success</code></td></tr>
      <tr><td>surface</td><td><code>variant-soft-surface</code></td></tr>
    </tbody>
  </table>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: var(--fg-3); margin: 0 0 16px; }
  .row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
  .violet-band {
    background: rgb(var(--color-primary-500)); border-radius: 10px; padding: 16px 20px;
    display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .token-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); margin-top: 8px; }
  .token-table th { text-align: left; font-weight: 600; padding: 6px 12px; border-bottom: 1px solid var(--border-1); }
  .token-table td { padding: 6px 12px; border-bottom: 1px solid var(--border-1); }
  .token-table code { font-family: var(--font-mono); font-size: 12px; }
</style>
