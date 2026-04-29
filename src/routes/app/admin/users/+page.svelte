<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Users — Admin</title></svelte:head>
<div class="admin-page-header"><h1 class="admin-page-title">Users Management</h1><button class="btn-ghost">Status History</button></div>
{#each [
  {label:'Pending Users',  users:state.users.filter(u=>u.status==='pending'),  color:'71 32 183'},
  {label:'Accepted Users', users:state.users.filter(u=>u.status==='accepted'), color:'132 204 22'},
] as cat}
  <section class="admin-cat" style="border-left:3px solid rgb({cat.color})">
    <h3 class="admin-cat-label">{cat.label} ({cat.users.length})</h3>
    <table class="admin-table">
      <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th>Actions</th></tr></thead>
      <tbody>
        {#each cat.users as u}
          <tr>
            <td><div class="av av--sm">{u.name[0]}</div></td>
            <td class="td-name">
              {u.name}
              {#if u.status === 'pending'}<ds-chip tone="warning" style="margin-left:6px;font-size:10px">Pending</ds-chip>{/if}
            </td>
            <td><span class="badge-type">{u.type}</span></td>
            <td class="td-muted">{u.location}</td>
            <td><a href="/app/users/{u.id}" class="btn-ghost">View</a></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
{/each}
