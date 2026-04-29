<svelte:head><title>Browse Active — UI Kit</title></svelte:head>

<script lang="ts">
  const requests = [
    { title: 'Looking for a Holochain mentor', owner: 'Anya Kovaleva', ownerInitial: 'A', time: '2h ago', description: 'Building my first hApp and need guidance on zome architecture and entry validation. Happy to exchange language tutoring.', tags: 'Holochain,Mentoring,Rust' },
    { title: 'Help with UI design for community app', owner: 'Jordan Lee', ownerInitial: 'J', time: '5h ago', description: 'Looking for a designer to help wireframe a community exchange platform. Figma experience preferred.', tags: 'Design,Figma,UX' },
    { title: 'Spanish conversation practice partner', owner: 'Pierre Dubois', ownerInitial: 'P', time: 'Yesterday', description: 'I am a B2 Spanish learner looking for weekly conversation sessions. Can offer French lessons in return.', tags: 'Language,Spanish,Teaching' },
    { title: 'Permaculture site assessment', owner: 'Rania Ahmed', ownerInitial: 'R', time: '2 days ago', description: 'I have a 500m² garden in Bristol and would love a permaculture consultation to redesign the layout.', tags: 'Permaculture,Gardening,Ecology' },
  ];
</script>

<ds-shell app-name="Requests & Offers" logo-src="/assets/hAppeningsCIClogo.png" route="home">
  <div class="content">
    <!-- Hero banner -->
    <div class="banner">
      <h2>Welcome to Requests &amp; Offers</h2>
      <p>A peer-to-peer exchange platform for the hAppenings community.</p>
      <div class="banner-btns">
        <ds-button variant="secondary"><span slot="icon">📝</span>Browse Requests</ds-button>
        <ds-button variant="on-violet">Post an Offer</ds-button>
      </div>
    </div>

    <!-- ActionCard row -->
    <div class="action-grid">
      <ds-action-card icon="🔍" title="Discover Opportunities" description="Browse active requests from community members." cta-label="Browse Requests" cta-tone="secondary"></ds-action-card>
      <ds-action-card icon="🌟" title="Offer Your Skills" description="Share what you can contribute to the community." cta-label="Post an Offer" cta-tone="warning"></ds-action-card>
      <ds-action-card icon="🏘️" title="Explore Community" description="Meet members and organizations working together." cta-label="Meet People" cta-tone="tertiary"></ds-action-card>
    </div>

    <!-- Requests browse -->
    <section class="listings">
      <div class="listings-head">
        <h2 class="ds-h3">Active Requests</h2>
        <div class="filters">
          <ds-chip tone="primary">All</ds-chip>
          <ds-chip tone="surface">My Requests</ds-chip>
          <ds-chip tone="surface">My Organization</ds-chip>
        </div>
      </div>
      <div class="listings-grid">
        {#each requests as req}
          <ds-listing-card
            kind="request"
            title={req.title}
            owner={req.owner}
            owner-initial={req.ownerInitial}
            time={req.time}
            description={req.description}
            tags={req.tags}>
          </ds-listing-card>
        {/each}
      </div>
    </section>
  </div>
</ds-shell>

<style>
  .content { max-width: 1000px; margin: 0 auto; padding: 32px 16px 64px; }
  .banner {
    border-radius: 16px; padding: 32px; color: #fff; box-shadow: var(--shadow-lg); margin-bottom: 32px;
    background: linear-gradient(90deg, rgb(var(--color-primary-500)) 0%, rgb(var(--color-secondary-500)) 100%);
  }
  .banner h2 { margin: 0 0 8px; font: 700 28px/34px var(--font-base); }
  .banner p  { margin: 0 0 16px; font: 400 16px/24px var(--font-base); opacity: .92; }
  .banner-btns { display: flex; gap: 10px; flex-wrap: wrap; }
  .action-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 40px; }
  .listings-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
  .filters { display: flex; gap: 8px; flex-wrap: wrap; }
  .listings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
</style>
