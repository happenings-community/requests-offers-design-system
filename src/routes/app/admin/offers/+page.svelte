<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Offers — Admin</title></svelte:head>
<div class="admin-page-header"><h1 class="admin-page-title">Offers Management</h1><button class="btn-ghost">Refresh</button></div>
<table class="admin-table">
  <thead><tr><th>Title</th><th>Creator</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>
    {#each state.offers as o}
      <tr>
        <td class="td-name">{o.title}</td>
        <td class="td-muted">{o.creator.name}</td>
        <td><span class="status-badge {o.status==='active'?'status-active':'status-archived'}">{o.status}</span></td>
        <td><a href="/app/offers/{o.id}" class="btn-ghost">View</a></td>
      </tr>
    {/each}
  </tbody>
</table>
