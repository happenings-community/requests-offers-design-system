<script lang="ts">
  import { state } from '$lib/state.svelte';

  let search = $state('');

  const accepted = $derived(
    state.users
      .filter(u => u.status === 'accepted')
      .filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase()))
  );
</script>

<svelte:head><title>Community — R&O</title></svelte:head>
<div class="page">
  <div class="page-header">
    <h1 class="ds-h2">Community Members</h1>
    <span class="ds-small">{accepted.length} member{accepted.length !== 1 ? 's' : ''}</span>
  </div>
  <div class="search-row">
    <input class="ds-input" bind:value={search} placeholder="Search by name or location…"/>
  </div>
  {#if accepted.length}
    <div class="users-table">
      <div class="users-table-head">
        <span>Name</span>
        <span>Location</span>
        <span>Type</span>
        <span>Requests</span>
        <span>Offers</span>
        <span></span>
      </div>
      {#each accepted as u}
        <div class="users-table-row">
          <div class="user-cell-name">
            <div class="av av--sm">{u.name[0]}</div>
            <div>
              <span class="user-name">{u.name}</span>
              <span class="ds-small">{u.nickname}</span>
            </div>
          </div>
          <span class="ds-small">{u.location}</span>
          <span class="ds-small">{u.type}</span>
          <span class="ds-small">{state.requests.filter(r=>r.creator.id===u.id&&r.status==='active').length}</span>
          <span class="ds-small">{state.offers.filter(o=>o.creator.id===u.id&&o.status==='active').length}</span>
          <a href="/app/users/{u.id}" class="btn-ghost btn-ghost--sm">Profile →</a>
        </div>
      {/each}
    </div>
  {:else}
    <div class="empty">
      <p>No members found{search ? ` matching "${search}"` : ''}.</p>
    </div>
  {/if}
</div>
