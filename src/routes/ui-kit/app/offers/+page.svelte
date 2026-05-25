<svelte:head><title>Offers — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { OFFERS, ME } from '$lib/data/mock';

  let tab = $state<'active' | 'archived'>('active');
  let filter = $state<'all' | 'my' | 'org'>('all');
  let search = $state('');

  let filtered = $derived(
    OFFERS.filter((o) => {
      if (tab === 'active' && o.status !== 'active') return false;
      if (tab === 'archived' && o.status !== 'archived') return false;
      if (filter === 'my' && o.creator.id !== ME.id) return false;
      if (filter === 'org' && !o.org) return false;
      if (search.trim() && !o.title.toLowerCase().includes(search.toLowerCase()) && !o.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
  );
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <div class="ro-tab-group">
      <button class="ro-tab {tab === 'active' ? 'ro-tab--warning' : ''}" onclick={() => (tab = 'active')}>💡 Active Offers</button>
      <button class="ro-tab {tab === 'archived' ? 'ro-tab--warning' : ''}" onclick={() => (tab = 'archived')}>📦 Archived Offers</button>
    </div>
    <button class="btn-ds btn-ds--warning btn-ds--sm" onclick={() => goto('/ui-kit/app/create-offer')}>+ Create Offer</button>
  </div>

  <div class="ro-filter-row">
    {#each [{ k: 'all', l: 'All' }, { k: 'my', l: 'My Offers' }, { k: 'org', l: 'My Organization' }] as f}
      <button class="ro-filter-chip {filter === f.k ? 'ro-filter-chip--warn' : ''}" onclick={() => (filter = f.k as typeof filter)}>{f.l}</button>
    {/each}
  </div>

  <!-- Search matching R&O's filter controls -->
  <div class="mb-4">
    <input
      type="text"
      placeholder="Search by title or description..."
      bind:value={search}
      class="input w-full max-w-sm"
    />
  </div>

  {#if filtered.length}
    <div class="ro-listings-grid">
      {#each filtered as offer}
        <button class="ro-listing-card" onclick={() => goto('/ui-kit/app/offer-detail')}>
          <div class="ro-listing-head">
            <span class="ro-chip ro-chip--warning">💡 Offer</span>
            {#if offer.org}<span class="ro-chip ro-chip--surface">{offer.org.name}</span>{/if}
            {#if offer.status === 'archived'}<span class="ro-chip ro-chip--warning">Archived</span>{/if}
            <span class="ro-listing-meta">{offer.interaction}</span>
          </div>
          <h3 class="ro-listing-title">{offer.title}</h3>
          <p class="ro-listing-desc">{offer.description}</p>
          <div class="ro-listing-tags">
            {#each offer.serviceTypes as st}<span class="ro-chip ro-chip--primary">{st}</span>{/each}
          </div>
          <div class="ro-listing-foot">
            <div class="ro-av ro-av--xs">{offer.creator.name[0]}</div>
            <span class="ro-listing-creator">{offer.creator.name}</span>
            <span class="ro-listing-pref">{offer.timePreference}</span>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div class="ro-empty">
      <p>No {tab} offers found.</p>
      <button class="btn-ds btn-ds--warning" onclick={() => goto('/ui-kit/app/create-offer')}>Create your first offer</button>
    </div>
  {/if}
</div>
