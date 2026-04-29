<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Requests — Admin</title></svelte:head>
<div class="admin-page-header"><h1 class="admin-page-title">Requests Management</h1><button class="btn-ghost">Refresh</button></div>
<table class="admin-table">
  <thead><tr><th>Title</th><th>Creator</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>
    {#each state.requests as r}
      <tr>
        <td class="td-name">{r.title}</td>
        <td class="td-muted">{r.creator.name}</td>
        <td><span class="status-badge {r.status==='active'?'status-active':'status-archived'}">{r.status}</span></td>
        <td><a href="/app/requests/{r.id}" class="btn-ghost">View</a></td>
      </tr>
    {/each}
  </tbody>
</table>
