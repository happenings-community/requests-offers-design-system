<script lang="ts">
  import ActionCard from '$lib/components/ActionCard.svelte';
  import ListingCard from '$lib/components/ListingCard.svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head><title>Cards — Playbook</title></svelte:head>

<h1 class="h2 mb-6">Cards</h1>

<section class="pb-section">
  <h2 class="pb-label">ActionCard — 3-up Grid</h2>
  <div class="action-grid">
    <ActionCard
      icon="🔍"
      title="Discover Opportunities"
      description="Browse active requests from community members looking for skills and support."
      ctaLabel="Browse Requests"
      ctaTone="secondary"
    />
    <ActionCard
      icon="🌟"
      title="Offer Your Skills"
      description="Share what you can contribute. Post skills, time, or resources for the community."
      ctaLabel="Post an Offer"
      ctaTone="warning"
    />
    <ActionCard
      icon="🏘️"
      title="Explore Community"
      description="Meet members and organizations working toward a collaborative local economy."
      ctaLabel="Meet People"
      ctaTone="tertiary"
    />
  </div>
  <pre class="pb-code"><code>&lt;ActionCard
  icon="🔍"
  title="Discover Opportunities"
  description="Browse active requests…"
  ctaLabel="Browse Requests"
  ctaTone="secondary"
/&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">ListingCard — Request</h2>
  <div style="max-width: 420px;">
    <ListingCard
      kind="request"
      title="Looking for a Holochain mentor"
      owner="Anya Kovaleva"
      ownerInitial="A"
      time="2 hours ago"
      description="I'm building my first hApp and need guidance on zome architecture and entry validation. Happy to exchange language tutoring."
      tags="Holochain,Mentoring,Rust"
    />
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">ListingCard — Offer</h2>
  <div style="max-width: 420px;">
    <ListingCard
      kind="offer"
      title="UI/UX design consultation — 2 sessions"
      owner="Marco Delgado"
      ownerInitial="M"
      time="Yesterday"
      description="I can help with wireframes, user flows, and visual design reviews. I specialize in accessibility-first design for web applications."
      tags="Design,UX,Figma,Accessibility"
    />
  </div>
  <pre class="pb-code"><code>&lt;ListingCard
  kind="offer"
  title="UI/UX design consultation"
  owner="Marco Delgado"
  ownerInitial="M"
  time="Yesterday"
  description="…"
  tags="Design,UX,Figma"
/&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Banner — Gradient Layout Pattern</h2>
  <div class="banner">
    <h2>Welcome to Requests &amp; Offers</h2>
    <p>A peer-to-peer exchange platform for the hAppenings community. Share skills, resources, and time.</p>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <Button variant="secondary">Browse Requests</Button>
      <Button variant="on-violet">Post an Offer</Button>
    </div>
  </div>
  <pre class="pb-code"><code>&lt;div class="banner"&gt;
  &lt;h2&gt;Heading&lt;/h2&gt;
  &lt;p&gt;Description…&lt;/p&gt;
&lt;/div&gt;</code></pre>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: var(--fg-3); margin: 0 0 16px; }
  .action-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .banner {
    border-radius: 16px; padding: 32px; color: #fff; box-shadow: var(--shadow-lg);
    background: linear-gradient(90deg, rgb(var(--color-primary-500)) 0%, rgb(var(--color-secondary-500)) 100%);
  }
  .banner h2 { margin: 0 0 8px; font: 700 28px/34px var(--font-base); }
  .banner p  { margin: 0 0 16px; font: 400 16px/24px var(--font-base); opacity: .92; }
</style>
