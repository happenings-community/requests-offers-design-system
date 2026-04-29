<script lang="ts">
  import { goto } from '$app/navigation';
  import { state, ME_ID } from '$lib/state.svelte';

  const me = $derived(state.users.find(u => u.id === ME_ID)!);
</script>

<svelte:head><title>Home — R&O</title></svelte:head>
<div class="page">
  {#if !state.hasProfile}
    <div class="home-hero">
      <h1 class="ds-h2">Welcome to Requests &amp; Offers</h1>
      <p class="ds-p" style="color:rgb(var(--fg-2));max-width:520px;text-align:center">Connect with the hAppenings community to exchange skills, resources, and support.</p>
      <a href="/app/user/create" class="btn-ds btn-ds--primary">👤 Join the Community</a>
    </div>
    <div class="action-grid">
      <a href="/app/requests" class="action-card">
        <div class="action-card-icon">🔍</div>
        <h3 class="action-card-title">Discover Opportunities</h3>
        <p class="action-card-desc">Browse active requests from community members looking for skills.</p>
        <span class="action-card-cta cta--secondary">Browse Requests</span>
      </a>
      <a href="/app/offers" class="action-card">
        <div class="action-card-icon">✨</div>
        <h3 class="action-card-title">Offer Your Skills</h3>
        <p class="action-card-desc">Share what you can contribute to the community.</p>
        <span class="action-card-cta cta--warning">Post an Offer</span>
      </a>
      <a href="/app/users" class="action-card">
        <div class="action-card-icon">👥</div>
        <h3 class="action-card-title">Explore Community</h3>
        <p class="action-card-desc">Meet members and organisations working together.</p>
        <span class="action-card-cta cta--tertiary">Meet People</span>
      </a>
    </div>
  {:else}
    <div class="home-welcome">
      <div class="av av--lg">{me.name[0]}</div>
      <div>
        <h2 class="ds-h3">Welcome back, {me.nickname}!</h2>
        <p class="ds-small">{state.requests.filter(r=>r.creator.id===me.id&&r.status==='active').length} active requests · {state.offers.filter(o=>o.creator.id===me.id&&o.status==='active').length} active offers</p>
      </div>
    </div>
    <div class="quick-cards">
      <a href="/app/my-listings" class="quick-card">
        <span class="quick-card-icon">📋</span>
        <span class="quick-card-label">My Requests</span>
        <span class="quick-card-count">{state.requests.filter(r=>r.creator.id===me.id).length}</span>
      </a>
      <a href="/app/my-listings" class="quick-card">
        <span class="quick-card-icon">🎯</span>
        <span class="quick-card-label">My Offers</span>
        <span class="quick-card-count">{state.offers.filter(o=>o.creator.id===me.id).length}</span>
      </a>
      <a href="/app/users/{me.id}" class="quick-card">
        <span class="quick-card-icon">👤</span>
        <span class="quick-card-label">My Profile</span>
        <span class="quick-card-count">→</span>
      </a>
    </div>
    <div class="home-primary-actions">
      <a href="/app/requests" class="btn-ds btn-ds--secondary">📝 Browse Requests</a>
      <a href="/app/offers" class="btn-ds btn-ds--warning">💡 Browse Offers</a>
      <a href="/app/admin" class="btn-ds btn-ds--ghost">⚙️ Admin Panel</a>
    </div>
    <div class="home-community">
      <h3 class="ds-h4">Community Resources</h3>
      <div class="community-links">
        <a href="/app/service-types" class="community-link">🏷️ Service Types</a>
        <a href="/app/organizations" class="community-link">🏢 Organizations</a>
        <a href="/app/users" class="community-link">👥 All Users</a>
      </div>
    </div>
  {/if}
</div>
