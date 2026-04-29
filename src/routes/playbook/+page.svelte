<svelte:head><title>Playbook — hAppenings DS</title></svelte:head>

<div class="index">
  <h1 class="ds-h2" style="margin-bottom: 8px;">Component Playbook</h1>
  <p class="ds-small" style="margin-bottom: 32px;">Live specimens and usage documentation for every component.</p>

  <div class="grid">
    <a href="/playbook/buttons" class="card">
      <span class="card-icon">🔘</span>
      <strong>Buttons</strong>
      <span class="ds-small">8 variants, 2 sizes, icon slot, disabled state</span>
    </a>
    <a href="/playbook/badges" class="card">
      <span class="card-icon">🏷️</span>
      <strong>Badges</strong>
      <span class="ds-small">7 chip tones, 4 status-dot states</span>
    </a>
    <a href="/playbook/cards" class="card">
      <span class="card-icon">🃏</span>
      <strong>Cards</strong>
      <span class="ds-small">ActionCard, ListingCard, Banner patterns</span>
    </a>
    <a href="/playbook/inputs" class="card">
      <span class="card-icon">✏️</span>
      <strong>Inputs</strong>
      <span class="ds-small">Field, TextInput, Textarea, Select, error states</span>
    </a>
    <a href="/playbook/navigation" class="card">
      <span class="card-icon">🧭</span>
      <strong>Navigation</strong>
      <span class="ds-small">NavBar, Shell, ScreenMap — interactive</span>
    </a>
  </div>
</div>

<style>
  .index { max-width: 800px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card {
    display: flex; flex-direction: column; gap: 6px; padding: 20px;
    border-radius: 12px; border: 1px solid rgb(var(--border-1));
    background: #fff; box-shadow: var(--shadow-sm); text-decoration: none; color: inherit;
    transition: box-shadow 150ms, border-color 150ms;
  }
  .card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
  .card-icon { font-size: 24px; }
</style>
