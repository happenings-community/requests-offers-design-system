<script lang="ts">
  import { state } from '$lib/state.svelte';

  let reqTab    = $state<'active'|'archived'>('active');
  let reqFilter = $state<'all'|'my'|'org'>('all');
  const ME_ID = 'u5';

  const filtered = $derived(state.requests.filter(r => {
    if (reqTab === 'active'   && r.status !== 'active')   return false;
    if (reqTab === 'archived' && r.status !== 'archived') return false;
    if (reqFilter === 'my'  && r.creator.id !== ME_ID)    return false;
    if (reqFilter === 'org' && !r.org)                    return false;
    return true;
  }));
</script>

<svelte:head><title>Requests — R&O</title></svelte:head>
<div class="page">
  <div class="page-header">
    <div class="tab-group">
      <button class="tab {reqTab==='active'?'tab--primary':''}"   onclick={() => reqTab='active'}>📋 Active Requests</button>
      <button class="tab {reqTab==='archived'?'tab--warning':''}" onclick={() => reqTab='archived'}>📦 Archived Requests</button>
    </div>
    <a href="/app/requests/create" class="btn-ds btn-ds--primary btn-ds--sm">+ Create Request</a>
  </div>
  <div class="filter-row">
    {#each [{k:'all',l:'All'},{k:'my',l:'My'},{k:'org',l:'Organization'}] as f}
      <button class="filter-chip {reqFilter===f.k?'filter-chip--active':''}" onclick={() => reqFilter = f.k as typeof reqFilter}>{f.l}</button>
    {/each}
  </div>
  {#if filtered.length}
    <div class="listings-grid">
      {#each filtered as req}
        <a href="/app/requests/{req.id}" class="listing-card">
          <div class="listing-head">
            <ds-chip tone="secondary">📝 Request</ds-chip>
            {#if req.org}<ds-chip tone="surface">{req.org.name}</ds-chip>{/if}
            {#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
            <span class="listing-meta">{req.interaction}</span>
          </div>
          <h3 class="listing-title">{req.title}</h3>
          <p class="listing-desc">{req.description}</p>
          <div class="listing-tags">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
          <div class="listing-foot">
            <div class="av av--xs">{req.creator.name[0]}</div>
            <span class="listing-creator">{req.creator.name}</span>
            <span class="listing-pref">{req.timePreference}</span>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="empty">
      <p>No {reqTab} requests found.</p>
      <a href="/app/requests/create" class="btn-ds btn-ds--primary">Create your first request</a>
    </div>
  {/if}
</div>
