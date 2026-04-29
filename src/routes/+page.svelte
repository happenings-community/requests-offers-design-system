<svelte:head><title>hAppenings Design System</title></svelte:head>
<main class="home">
  <header class="hero">
    <img src="/assets/hAppeningsCIClogo.png" alt="hAppenings logo" class="hero-logo" />
    <h1 class="ds-display">hAppenings Design System</h1>
    <p class="ds-p" style="color: rgb(var(--fg-2)); max-width: 480px; text-align: center;">
      Component library and visual language for the Requests &amp; Offers hApp.
    </p>
  </header>
  <section class="section">
    <h2 class="ds-h3">Explore</h2>
    <div class="nav-grid">
      <a href="/playbook" class="nav-card"><span class="nav-card-icon">📖</span><strong>Playbook</strong></a>
      <a href="/ui-kit" class="nav-card"><span class="nav-card-icon">🖼️</span><strong>UI Kit</strong></a>
    </div>
  </section>
</main>
<style>
  .home { max-width: 960px; margin: 0 auto; padding: 48px 20px; }
  .hero { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 48px; }
  .hero-logo { width: 80px; height: 80px; }
  .section { margin-bottom: 48px; }
  .nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-top: 16px; }
  .nav-card { display: flex; flex-direction: column; gap: 6px; padding: 20px; border-radius: 12px; border: 1px solid rgb(var(--border-1)); background: #fff; box-shadow: var(--shadow-sm); text-decoration: none; color: inherit; }
  .nav-card:hover { box-shadow: var(--shadow-md); border-color: rgb(var(--color-primary-300)); }
  .nav-card-icon { font-size: 28px; }
</style>
