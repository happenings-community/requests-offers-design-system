<script lang="ts">
  import { goto } from '$app/navigation';
  import { state, ME_ID } from '$lib/state.svelte';

  let activeTab = $state<'requests'|'offers'>('requests');

  const myRequests = $derived(state.requests.filter(r => r.creator.id === ME_ID));
  const myOffers   = $derived(state.offers.filter(o => o.creator.id === ME_ID));
</script>

<svelte:head><title>My Listings — R&O</title></svelte:head>
<div class="page">
  <div class="page-header">
    <h1 class="ds-h2">My Listings</h1>
    <div class="page-header-actions">
      <a href="/app/requests/create" class="btn-ds btn-ds--secondary btn-ds--sm">+ Request</a>
      <a href="/app/offers/create" class="btn-ds btn-ds--warning btn-ds--sm">+ Offer</a>
    </div>
  </div>
  <div class="tab-group">
    <button class="tab {activeTab==='requests'?'tab--secondary':''}" onclick={() => activeTab='requests'}>
      📋 Requests <span class="tab-count">{myRequests.length}</span>
    </button>
    <button class="tab {activeTab==='offers'?'tab--warning':''}" onclick={() => activeTab='offers'}>
      💡 Offers <span class="tab-count">{myOffers.length}</span>
    </button>
  </div>

  {#if activeTab === 'requests'}
    {#if myRequests.length}
      <div class="listings-grid">
        {#each myRequests as req}
          <div class="listing-card listing-card--managed">
            <div class="listing-head">
              <ds-chip tone="secondary">📝 Request</ds-chip>
              {#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{:else}<ds-chip tone="success">Active</ds-chip>{/if}
              <span class="listing-meta">{req.interaction}</span>
            </div>
            <h3 class="listing-title">{req.title}</h3>
            <p class="listing-desc">{req.description}</p>
            <div class="listing-tags">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            <div class="listing-actions">
              <a href="/app/requests/{req.id}" class="btn-ghost btn-ghost--sm">View</a>
              <a href="/app/requests/{req.id}/edit" class="btn-ghost btn-ghost--sm">Edit</a>
              <button class="btn-ghost btn-ghost--sm btn-ghost--danger" onclick={() => {
                state.confirmModal = { message: `Delete "${req.title}"?`, onConfirm: () => { state.requests = state.requests.filter(r => r.id !== req.id); } };
              }}>Delete</button>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty">
        <p>You haven't created any requests yet.</p>
        <a href="/app/requests/create" class="btn-ds btn-ds--secondary">Create your first request</a>
      </div>
    {/if}
  {:else}
    {#if myOffers.length}
      <div class="listings-grid">
        {#each myOffers as off}
          <div class="listing-card listing-card--managed">
            <div class="listing-head">
              <ds-chip tone="warning">💡 Offer</ds-chip>
              {#if off.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{:else}<ds-chip tone="success">Active</ds-chip>{/if}
              <span class="listing-meta">{off.interaction}</span>
            </div>
            <h3 class="listing-title">{off.title}</h3>
            <p class="listing-desc">{off.description}</p>
            <div class="listing-tags">{#each off.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            <div class="listing-actions">
              <a href="/app/offers/{off.id}" class="btn-ghost btn-ghost--sm">View</a>
              <a href="/app/offers/{off.id}/edit" class="btn-ghost btn-ghost--sm">Edit</a>
              <button class="btn-ghost btn-ghost--sm btn-ghost--danger" onclick={() => {
                state.confirmModal = { message: `Delete "${off.title}"?`, onConfirm: () => { state.offers = state.offers.filter(o => o.id !== off.id); } };
              }}>Delete</button>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="empty">
        <p>You haven't created any offers yet.</p>
        <a href="/app/offers/create" class="btn-ds btn-ds--warning">Create your first offer</a>
      </div>
    {/if}
  {/if}
</div>
