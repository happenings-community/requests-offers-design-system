<svelte:head><title>Dashboard — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import ActionCard from '$lib/components/ActionCard.svelte';
  import { ME, REQUESTS, OFFERS } from '$lib/data/mock';

  let myActiveReqs = $derived(REQUESTS.filter((r) => r.creator.id === ME.id && r.status === 'active').length);
  let myActiveOffers = $derived(OFFERS.filter((o) => o.creator.id === ME.id && o.status === 'active').length);
  let myReqCount = $derived(REQUESTS.filter((r) => r.creator.id === ME.id).length);
  let myOfferCount = $derived(OFFERS.filter((o) => o.creator.id === ME.id).length);
</script>

<div class="ro-page">
  <div class="ro-banner">
    <h2>Welcome to Requests &amp; Offers</h2>
    <p>A peer-to-peer exchange platform for the hAppenings community.</p>
    <div class="ro-banner-btns">
      <button class="btn-ds btn-ds--secondary" onclick={() => goto('/ui-kit/app/requests')}>📝 Browse Requests</button>
      <button class="btn-ds btn-ds--warning" onclick={() => goto('/ui-kit/app/create-offer')}>💡 Post an Offer</button>
    </div>
  </div>

  <div class="ro-welcome">
    <div class="ro-av ro-av--lg">{ME.name[0]}</div>
    <div>
      <h2 class="ro-h2">Welcome back, {ME.nickname}!</h2>
      <p class="ro-small">{myActiveReqs} active requests · {myActiveOffers} active offers</p>
    </div>
  </div>

  <div class="ro-quick-cards">
    <button class="ro-quick-card" onclick={() => goto('/ui-kit/app/my-requests')}>
      <span class="ro-quick-icon">📋</span>
      <span class="ro-quick-label">My Requests</span>
      <span class="ro-quick-count">{myReqCount}</span>
    </button>
    <button class="ro-quick-card" onclick={() => goto('/ui-kit/app/my-offers')}>
      <span class="ro-quick-icon">🎯</span>
      <span class="ro-quick-label">My Offers</span>
      <span class="ro-quick-count">{myOfferCount}</span>
    </button>
    <button class="ro-quick-card" onclick={() => goto('/ui-kit/app/my-profile')}>
      <span class="ro-quick-icon">👤</span>
      <span class="ro-quick-label">My Profile</span>
      <span class="ro-quick-count">→</span>
    </button>
  </div>

  <div class="ro-action-grid">
    <ActionCard
      icon="🔍"
      title="Discover Opportunities"
      description="Browse active requests from community members looking for skills."
      ctaLabel="Browse Requests"
      ctaTone="secondary"
      onclick={() => goto('/ui-kit/app/requests')}
    />
    <ActionCard
      icon="✨"
      title="Offer Your Skills"
      description="Share what you can contribute to the community."
      ctaLabel="Post an Offer"
      ctaTone="warning"
      onclick={() => goto('/ui-kit/app/create-offer')}
    />
    <ActionCard
      icon="👥"
      title="Explore Community"
      description="Meet members and organisations working together."
      ctaLabel="Meet People"
      ctaTone="tertiary"
      onclick={() => goto('/ui-kit/app/members')}
    />
  </div>

  <div>
    <h3 class="ro-section-title">Community Resources</h3>
    <div class="ro-community-links">
      <button class="ro-community-link" onclick={() => goto('/ui-kit/app/service-types')}>🏷️ Service Types</button>
      <button class="ro-community-link" onclick={() => goto('/ui-kit/app/organizations')}>🏢 Organizations</button>
      <button class="ro-community-link" onclick={() => goto('/ui-kit/app/members')}>👥 All Members</button>
      <button class="ro-community-link" onclick={() => goto('/ui-kit/app/mediums')}>💛 Mediums</button>
    </div>
  </div>
</div>
