<svelte:head><title>UI Kit — hAppenings DS</title></svelte:head>

<main class="hub">
  <h1 class="ds-h2" style="margin-bottom: 8px;">UI Kit Scenarios</h1>
  <p class="ds-small" style="margin-bottom: 32px;">Full-page views demonstrating the design system in real-world contexts.</p>

  <div class="grid">
    <a href="/ui-kit/browse-active" class="card">
      <span class="card-icon">🏠</span>
      <strong>Browse Active</strong>
      <span class="ds-small">NavBar, Shell, ListingCard grid, ActionCard home. The primary browsing flow.</span>
    </a>
    <a href="/ui-kit/create-request" class="card">
      <span class="card-icon">✏️</span>
      <strong>Create Request</strong>
      <span class="ds-small">Field + Input + Select + Textarea composition. Full create-request form.</span>
    </a>
    <a href="/ui-kit/admin-dashboard" class="card">
      <span class="card-icon">⚙️</span>
      <strong>Admin Dashboard</strong>
      <span class="ds-small">Admin sidebar layout, stat cards, moderation queue. Dark surface palette.</span>
    </a>
    <a href="/ui-kit/connecting-onboarding" class="card">
      <span class="card-icon">🔗</span>
      <strong>Connecting</strong>
      <span class="ds-small">Pre-auth states: connection progress and profile guard CTA.</span>
    </a>
  </div>

  <p class="ds-small" style="margin-top: 32px; color: rgb(var(--fg-3));">
    Note: Admin Dashboard uses a custom sidebar layout, not <code>ds-shell</code> — the admin pattern is structurally distinct from the user-facing shell.
  </p>
</main>

<style>
  .hub { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
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
