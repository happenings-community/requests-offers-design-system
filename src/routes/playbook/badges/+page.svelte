<svelte:head><title>Badges — Playbook</title></svelte:head>

<h1 class="ds-h2" style="margin-bottom: 24px;">Badges</h1>

<section class="pb-section">
  <h2 class="pb-label">Chip Tones</h2>
  <div class="row">
    <ds-chip tone="primary">Primary</ds-chip>
    <ds-chip tone="secondary">Secondary</ds-chip>
    <ds-chip tone="tertiary">Tertiary</ds-chip>
    <ds-chip tone="warning">Warning</ds-chip>
    <ds-chip tone="success">Success</ds-chip>
    <ds-chip tone="error">Error</ds-chip>
    <ds-chip tone="surface">Surface</ds-chip>
  </div>
  <pre class="pb-code"><code>&lt;ds-chip tone="primary"&gt;Label&lt;/ds-chip&gt;
&lt;ds-chip tone="success"&gt;Active&lt;/ds-chip&gt;
&lt;ds-chip tone="error"&gt;Rejected&lt;/ds-chip&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Chips with Icons (Common Patterns)</h2>
  <div class="row">
    <ds-chip tone="secondary">📝 Request</ds-chip>
    <ds-chip tone="warning">💡 Offer</ds-chip>
    <ds-chip tone="surface">🏷️ Mentoring</ds-chip>
    <ds-chip tone="surface">🏷️ Design</ds-chip>
    <ds-chip tone="tertiary">🏢 hAppenings CIC</ds-chip>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Status Dot — Connection States</h2>
  <p class="ds-small" style="margin-bottom: 12px;">Designed for the violet navbar context. Shown on a matching background.</p>
  <div class="violet-band">
    <ds-status-dot status="connected"></ds-status-dot>
    <ds-status-dot status="checking"></ds-status-dot>
    <ds-status-dot status="disconnected"></ds-status-dot>
    <ds-status-dot status="error"></ds-status-dot>
  </div>
  <pre class="pb-code"><code>&lt;ds-status-dot status="connected"&gt;&lt;/ds-status-dot&gt;
&lt;ds-status-dot status="checking"&gt;&lt;/ds-status-dot&gt;
&lt;ds-status-dot status="disconnected"&gt;&lt;/ds-status-dot&gt;
&lt;ds-status-dot status="error"&gt;&lt;/ds-status-dot&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Token Reference</h2>
  <table class="token-table">
    <thead><tr><th>Chip tone</th><th>Background</th><th>Text</th></tr></thead>
    <tbody>
      <tr><td>primary</td><td><code>--color-primary-100</code></td><td><code>--color-primary-800</code></td></tr>
      <tr><td>secondary</td><td><code>--color-secondary-100</code></td><td><code>--color-secondary-900</code></td></tr>
      <tr><td>success</td><td><code>--color-success-100</code></td><td><code>--color-success-900</code></td></tr>
      <tr><td>surface</td><td><code>--color-surface-100</code></td><td><code>--color-surface-800</code></td></tr>
    </tbody>
  </table>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: rgb(var(--fg-3)); margin: 0 0 16px; }
  .row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
  .violet-band {
    background: rgb(var(--color-primary-500)); border-radius: 10px; padding: 16px 20px;
    display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .token-table { width: 100%; border-collapse: collapse; font: 400 13px/20px var(--font-base); margin-top: 8px; }
  .token-table th { text-align: left; font-weight: 600; padding: 6px 12px; border-bottom: 1px solid rgb(var(--border-1)); }
  .token-table td { padding: 6px 12px; border-bottom: 1px solid rgb(var(--border-1)); }
  .token-table code { font-family: var(--font-mono); font-size: 12px; }
</style>
