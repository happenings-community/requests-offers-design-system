<script lang="ts">
  import { state } from '$lib/state.svelte';

  let search = $state('');

  const filtered = $derived(
    state.orgs.filter(o =>
      !search ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.location.toLowerCase().includes(search.toLowerCase())
    )
  );
</script>

<svelte:head><title>Organizations — R&O</title></svelte:head>
<div class="page">
  <div class="page-header">
    <h1 class="ds-h2">Organizations</h1>
    <a href="/app/organizations/create" class="btn-ds btn-ds--primary btn-ds--sm">+ Add Organization</a>
  </div>
  <div class="search-row">
    <input class="ds-input" bind:value={search} placeholder="Search organizations…"/>
  </div>
  {#if filtered.length}
    <div class="org-grid">
      {#each filtered as org}
        <a href="/app/organizations/{org.id}" class="org-card">
          <div class="org-card-head">
            <div class="av av--md org-av">{org.name[0]}</div>
            <div>
              <h3 class="org-card-title">{org.name}</h3>
              <span class="ds-small">{org.location}</span>
            </div>
            <ds-chip tone={org.status === 'active' ? 'success' : org.status === 'pending' ? 'warning' : 'danger'}>{org.status}</ds-chip>
          </div>
          <p class="org-card-desc">{org.description}</p>
          <div class="org-card-foot">
            <span class="ds-small">👥 {org.members} member{org.members !== 1 ? 's' : ''}</span>
            <span class="ds-small">✉️ {org.email}</span>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="empty">
      <p>No organizations found{search ? ` matching "${search}"` : ''}.</p>
      <a href="/app/organizations/create" class="btn-ds btn-ds--primary">Add first organization</a>
    </div>
  {/if}
</div>
