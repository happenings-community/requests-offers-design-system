<script lang="ts">
  import { page } from '$app/state';
  import { state } from '$lib/state.svelte';

  let listTab = $state<'requests'|'offers'>('requests');

  const st = $derived(state.serviceTypes.find(s => s.id === page.params.id));

  const matchingRequests = $derived(
    st ? state.requests.filter(r => r.serviceTypes.includes(st.name) && r.status === 'active') : []
  );
  const matchingOffers = $derived(
    st ? state.offers.filter(o => o.serviceTypes.includes(st.name) && o.status === 'active') : []
  );
</script>

<svelte:head><title>{st?.name ?? 'Service Type'} — R&O</title></svelte:head>
{#if st}
  <div class="page">
    <div class="detail-nav">
      <a href="/app/service-types" class="btn-ghost">← Back</a>
    </div>
    <div class="detail-header">
      <div class="detail-header-top">
        <h1 class="ds-h2">{st.name}</h1>
        <div class="detail-badges">
          {#if st.technical}
            <ds-chip tone="primary">Technical</ds-chip>
          {:else}
            <ds-chip tone="tertiary">Non-Technical</ds-chip>
          {/if}
        </div>
      </div>
    </div>
    <div class="detail-section detail-section--meta" style="margin-bottom:24px">
      <div class="meta-row">
        <span class="meta-label">Active Requests</span>
        <span class="meta-value">{matchingRequests.length}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">Active Offers</span>
        <span class="meta-value">{matchingOffers.length}</span>
      </div>
    </div>
    <div class="tab-group">
      <button class="tab {listTab==='requests'?'tab--secondary':''}" onclick={() => listTab='requests'}>
        📋 Requests <span class="tab-count">{matchingRequests.length}</span>
      </button>
      <button class="tab {listTab==='offers'?'tab--warning':''}" onclick={() => listTab='offers'}>
        💡 Offers <span class="tab-count">{matchingOffers.length}</span>
      </button>
    </div>
    {#if listTab === 'requests'}
      {#if matchingRequests.length}
        <div class="listings-grid">
          {#each matchingRequests as req}
            <a href="/app/requests/{req.id}" class="listing-card">
              <div class="listing-head">
                <ds-chip tone="secondary">📝 Request</ds-chip>
                <span class="listing-meta">{req.interaction}</span>
              </div>
              <h3 class="listing-title">{req.title}</h3>
              <p class="listing-desc">{req.description}</p>
              <div class="listing-foot">
                <div class="av av--xs">{req.creator.name[0]}</div>
                <span class="listing-creator">{req.creator.name}</span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="empty"><p>No active requests for this service type.</p></div>
      {/if}
    {:else}
      {#if matchingOffers.length}
        <div class="listings-grid">
          {#each matchingOffers as off}
            <a href="/app/offers/{off.id}" class="listing-card">
              <div class="listing-head">
                <ds-chip tone="warning">💡 Offer</ds-chip>
                <span class="listing-meta">{off.interaction}</span>
              </div>
              <h3 class="listing-title">{off.title}</h3>
              <p class="listing-desc">{off.description}</p>
              <div class="listing-foot">
                <div class="av av--xs">{off.creator.name[0]}</div>
                <span class="listing-creator">{off.creator.name}</span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="empty"><p>No active offers for this service type.</p></div>
      {/if}
    {/if}
  </div>
{:else}
  <div class="page"><div class="placeholder"><p>Service type not found.</p><a href="/app/service-types" class="btn-ghost">← Back</a></div></div>
{/if}
