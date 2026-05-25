<svelte:head><title>Member Profile — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { USERS, REQUESTS, OFFERS, md } from '$lib/data/mock';

  const u = USERS[1]; // Marco Delgado
  let activeReqs = $derived(REQUESTS.filter((r) => r.creator.id === u.id && r.status === 'active'));
  let activeOffers = $derived(OFFERS.filter((o) => o.creator.id === u.id && o.status === 'active'));
</script>

<div class="ro-page">
  <div class="ro-detail-nav">
    <button class="btn-ghost" onclick={() => goto('/ui-kit/app/members')}>← Back</button>
  </div>

  <div class="ro-profile-header">
    <div class="ro-av ro-av--xl">{u.name[0]}</div>
    <div class="ro-profile-info">
      <h1 class="ro-h1">{u.name}</h1>
      <div class="ro-profile-meta">
        <span class="ro-chip ro-chip--surface">{u.type}</span>
        <span class="ro-small">📍 {u.location}</span>
        {#if u.status === 'pending'}
          <span class="ro-chip ro-chip--warning">Pending Review</span>
        {:else}
          <span class="ro-small" style="color:rgb(var(--color-success-600))">● Accepted</span>
        {/if}
      </div>
      <p class="ro-p">{@html md(u.bio)}</p>
      <button class="btn-ds btn-ds--primary btn-ds--sm" style="margin-top:12px">🤝 Contact {u.name.split(' ')[0]}</button>
    </div>
  </div>

  <section style="margin-bottom:24px">
    <h3 class="ro-section-title">Active Requests ({activeReqs.length})</h3>
    <div class="ro-listings-grid">
      {#each activeReqs as req}
        <button class="ro-listing-card" onclick={() => goto('/ui-kit/app/request-detail')}>
          <h3 class="ro-listing-title">{req.title}</h3>
          <div class="ro-listing-tags">{#each req.serviceTypes as st}<span class="ro-chip ro-chip--primary">{st}</span>{/each}</div>
        </button>
      {:else}<p class="ro-small">No active requests.</p>{/each}
    </div>
  </section>

  <section>
    <h3 class="ro-section-title">Active Offers ({activeOffers.length})</h3>
    <div class="ro-listings-grid">
      {#each activeOffers as offer}
        <button class="ro-listing-card" onclick={() => goto('/ui-kit/app/offer-detail')}>
          <h3 class="ro-listing-title">{offer.title}</h3>
          <div class="ro-listing-tags">{#each offer.serviceTypes as st}<span class="ro-chip ro-chip--primary">{st}</span>{/each}</div>
        </button>
      {:else}<p class="ro-small">No active offers.</p>{/each}
    </div>
  </section>
</div>
