<script lang="ts">
  import { state } from '$lib/state.svelte';

  let filter = $state<'all'|'technical'|'non-technical'>('all');

  const filtered = $derived(
    state.serviceTypes.filter(s => {
      if (filter === 'technical')     return s.technical === true;
      if (filter === 'non-technical') return s.technical === false;
      return true;
    })
  );

  function countFor(name: string, collection: typeof state.requests) {
    return collection.filter(i => i.serviceTypes.includes(name) && i.status === 'active').length;
  }
</script>

<svelte:head><title>Service Types — R&O</title></svelte:head>
<div class="page">
  <div class="page-header">
    <h1 class="ds-h2">Service Types</h1>
    <a href="/app/service-types/suggest" class="btn-ds btn-ds--ghost btn-ds--sm">+ Suggest New</a>
  </div>
  <div class="filter-row">
    {#each [{k:'all',l:'All'},{k:'technical',l:'Technical'},{k:'non-technical',l:'Non-Technical'}] as f}
      <button class="filter-chip {filter===f.k?'filter-chip--active':''}" onclick={() => filter = f.k as typeof filter}>{f.l}</button>
    {/each}
  </div>
  <div class="service-types-grid">
    {#each filtered as st}
      <a href="/app/service-types/{st.id}" class="service-type-card">
        <div class="service-type-head">
          <h3 class="service-type-name">{st.name}</h3>
          {#if st.technical}
            <ds-chip tone="primary">Technical</ds-chip>
          {:else}
            <ds-chip tone="tertiary">Non-Technical</ds-chip>
          {/if}
        </div>
        <div class="service-type-stats">
          <span class="ds-small">📝 {countFor(st.name, state.requests)} request{countFor(st.name, state.requests) !== 1 ? 's' : ''}</span>
          <span class="ds-small">💡 {countFor(st.name, state.offers)} offer{countFor(st.name, state.offers) !== 1 ? 's' : ''}</span>
        </div>
      </a>
    {/each}
  </div>
</div>
