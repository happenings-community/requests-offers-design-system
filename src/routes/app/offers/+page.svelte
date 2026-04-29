<script lang="ts">
  import { state } from '$lib/state.svelte';

  let offTab    = $state<'active'|'archived'>('active');
  let offFilter = $state<'all'|'my'|'org'>('all');
  const ME_ID = 'u5';

  const filtered = $derived(state.offers.filter(o => {
    if (offTab === 'active'   && o.status !== 'active')   return false;
    if (offTab === 'archived' && o.status !== 'archived') return false;
    if (offFilter === 'my'  && o.creator.id !== ME_ID)    return false;
    if (offFilter === 'org' && !o.org)                    return false;
    return true;
  }));
</script>

<svelte:head><title>Offers — R&O</title></svelte:head>
<div class="page">
  <div class="page-header">
    <div class="tab-group">
      <button class="tab {offTab==='active'?'tab--warning':''}"   onclick={() => offTab='active'}>✨ Active Offers</button>
      <button class="tab {offTab==='archived'?'tab--warning':''}" onclick={() => offTab='archived'}>📦 Archived Offers</button>
    </div>
    <a href="/app/offers/create" class="btn-ds btn-ds--warning btn-ds--sm">+ Create Offer</a>
  </div>
  <div class="filter-row">
    {#each [{k:'all',l:'All'},{k:'my',l:'My'},{k:'org',l:'Organization'}] as f}
      <button class="filter-chip {offFilter===f.k?'filter-chip--active':''}" onclick={() => offFilter = f.k as typeof offFilter}>{f.l}</button>
    {/each}
  </div>
  {#if filtered.length}
    <div class="listings-grid">
      {#each filtered as off}
        <a href="/app/offers/{off.id}" class="listing-card">
          <div class="listing-head">
            <ds-chip tone="warning">💡 Offer</ds-chip>
            {#if off.org}<ds-chip tone="surface">{off.org.name}</ds-chip>{/if}
            {#if off.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
            <span class="listing-meta">{off.interaction}</span>
          </div>
          <h3 class="listing-title">{off.title}</h3>
          <p class="listing-desc">{off.description}</p>
          <div class="listing-tags">{#each off.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
          <div class="listing-foot">
            <div class="av av--xs">{off.creator.name[0]}</div>
            <span class="listing-creator">{off.creator.name}</span>
            <span class="listing-pref">{off.timePreference}</span>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="empty">
      <p>No {offTab} offers found.</p>
      <a href="/app/offers/create" class="btn-ds btn-ds--warning">Create your first offer</a>
    </div>
  {/if}
</div>
