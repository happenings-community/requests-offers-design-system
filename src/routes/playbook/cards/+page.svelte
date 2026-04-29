<svelte:head><title>Cards — Playbook</title></svelte:head>

<h1 class="ds-h2" style="margin-bottom: 24px;">Cards</h1>

<section class="pb-section">
  <h2 class="pb-label">ActionCard — 3-up Grid</h2>
  <div class="action-grid">
    <ds-action-card
      icon="🔍"
      title="Discover Opportunities"
      description="Browse active requests from community members looking for skills and support."
      cta-label="Browse Requests"
      cta-tone="secondary">
    </ds-action-card>
    <ds-action-card
      icon="🌟"
      title="Offer Your Skills"
      description="Share what you can contribute. Post skills, time, or resources for the community."
      cta-label="Post an Offer"
      cta-tone="warning">
    </ds-action-card>
    <ds-action-card
      icon="🏘️"
      title="Explore Community"
      description="Meet members and organizations working toward a collaborative local economy."
      cta-label="Meet People"
      cta-tone="tertiary">
    </ds-action-card>
  </div>
  <pre class="pb-code"><code>&lt;ds-action-card
  icon="🔍"
  title="Discover Opportunities"
  description="Browse active requests…"
  cta-label="Browse Requests"
  cta-tone="secondary"&gt;
&lt;/ds-action-card&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">ListingCard — Request</h2>
  <div style="max-width: 420px;">
    <ds-listing-card
      kind="request"
      title="Looking for a Holochain mentor"
      owner="Anya Kovaleva"
      owner-initial="A"
      time="2 hours ago"
      description="I'm building my first hApp and need guidance on zome architecture and entry validation. Happy to exchange language tutoring."
      tags="Holochain,Mentoring,Rust">
    </ds-listing-card>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">ListingCard — Offer</h2>
  <div style="max-width: 420px;">
    <ds-listing-card
      kind="offer"
      title="UI/UX design consultation — 2 sessions"
      owner="Marco Delgado"
      owner-initial="M"
      time="Yesterday"
      description="I can help with wireframes, user flows, and visual design reviews. I specialize in accessibility-first design for web applications."
      tags="Design,UX,Figma,Accessibility">
    </ds-listing-card>
  </div>
  <pre class="pb-code"><code>&lt;ds-listing-card
  kind="offer"
  title="UI/UX design consultation"
  owner="Marco Delgado"
  owner-initial="M"
  time="Yesterday"
  description="…"
  tags="Design,UX,Figma"&gt;
&lt;/ds-listing-card&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Banner — CSS Layout Pattern</h2>
  <p class="ds-small" style="margin-bottom: 12px;">Not a custom element — apply the <code>.banner</code> CSS class directly.</p>
  <div class="banner">
    <h2>Welcome to Requests &amp; Offers</h2>
    <p>A peer-to-peer exchange platform for the hAppenings community. Share skills, resources, and time.</p>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <ds-button variant="secondary">Browse Requests</ds-button>
      <ds-button variant="on-violet">Post an Offer</ds-button>
    </div>
  </div>
  <pre class="pb-code"><code>&lt;div class="banner"&gt;
  &lt;h2&gt;Heading&lt;/h2&gt;
  &lt;p&gt;Description…&lt;/p&gt;
&lt;/div&gt;</code></pre>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: rgb(var(--fg-3)); margin: 0 0 16px; }
  .action-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .banner {
    border-radius: 16px; padding: 32px; color: #fff; box-shadow: var(--shadow-lg);
    background: linear-gradient(90deg, rgb(var(--color-primary-500)) 0%, rgb(var(--color-secondary-500)) 100%);
  }
  .banner h2 { margin: 0 0 8px; font: 700 28px/34px var(--font-base); }
  .banner p  { margin: 0 0 16px; font: 400 16px/24px var(--font-base); opacity: .92; }
</style>
