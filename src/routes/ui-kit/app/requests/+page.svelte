<svelte:head><title>Requests — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { REQUESTS, ME } from '$lib/data/mock';

  let tab = $state<'active' | 'archived'>('active');
  let filter = $state<'all' | 'my' | 'org'>('all');
  let search = $state('');

  let filtered = $derived(
    REQUESTS.filter((r) => {
      if (tab === 'active' && r.status !== 'active') return false;
      if (tab === 'archived' && r.status !== 'archived') return false;
      if (filter === 'my' && r.creator.id !== ME.id) return false;
      if (filter === 'org' && !r.org) return false;
      if (search.trim() && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
  );
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <div class="ro-tab-group">
      <button class="ro-tab {tab === 'active' ? 'ro-tab--primary' : ''}" onclick={() => (tab = 'active')}>📋 Active Requests</button>
      <button class="ro-tab {tab === 'archived' ? 'ro-tab--warning' : ''}" onclick={() => (tab = 'archived')}>📦 Archived Requests</button>
    </div>
    <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => goto('/ui-kit/app/create-request')}>+ Create Request</button>
  </div>

  <div class="ro-filter-row">
    {#each [{ k: 'all', l: 'All' }, { k: 'my', l: 'My Requests' }, { k: 'org', l: 'My Organization' }] as f}
      <button class="ro-filter-chip {filter === f.k ? 'ro-filter-chip--active' : ''}" onclick={() => (filter = f.k as typeof filter)}>{f.l}</button>
    {/each}
  </div>

  <!-- Search matching R&O's RequestFilterControls -->
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
      {#each filtered as req}
        <button class="ro-listing-card" onclick={() => goto('/ui-kit/app/request-detail')}>
          <div class="ro-listing-head">
            <span class="ro-chip ro-chip--secondary">📝 Request</span>
            {#if req.org}<span class="ro-chip ro-chip--surface">{req.org.name}</span>{/if}
            {#if req.status === 'archived'}<span class="ro-chip ro-chip--warning">Archived</span>{/if}
            <span class="ro-listing-meta">{req.interaction}</span>
          </div>
          <h3 class="ro-listing-title">{req.title}</h3>
          <p class="ro-listing-desc">{req.description}</p>
          <div class="ro-listing-tags">
            {#each req.serviceTypes as st}<span class="ro-chip ro-chip--primary">{st}</span>{/each}
          </div>
          <div class="ro-listing-foot">
            <div class="ro-av ro-av--xs">{req.creator.name[0]}</div>
            <span class="ro-listing-creator">{req.creator.name}</span>
            <span class="ro-listing-pref">{req.timePreference}</span>
          </div>
        </button>
      {/each}
    </div>
  {:else}
    <div class="ro-empty">
      <p>No {tab} requests found.</p>
      <button class="btn-ds btn-ds--primary" onclick={() => goto('/ui-kit/app/create-request')}>Create your first request</button>
    </div>
  {/if}
</div>
