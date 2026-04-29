<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Organizations — Admin</title></svelte:head>
<div class="admin-page-header">
  <h1 class="admin-page-title">Organizations Management</h1>
  <button class="btn-ghost">Status History</button>
</div>
<table class="admin-table">
  <thead><tr><th></th><th>Name</th><th>Location</th><th>Members</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>
    {#each state.orgs as o}
      <tr>
        <td><div class="org-logo" style="width:32px;height:32px;font-size:14px;border-radius:8px">{o.name[0]}</div></td>
        <td class="td-name">{o.name}</td>
        <td class="td-muted">{o.location}</td>
        <td class="td-muted">{o.members}</td>
        <td><ds-chip tone={o.status==='active'?'success':o.status==='pending'?'warning':'error'}>{o.status}</ds-chip></td>
        <td>
          <a href="/app/organizations/{o.id}" class="btn-ghost btn-ghost--sm">View</a>
          <a href="/app/organizations/{o.id}/edit" class="btn-ghost btn-ghost--sm">Edit</a>
          <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
            onclick={() => state.confirmModal = { message: `Suspend "${o.name}"?`, onConfirm: () => {} }}>Suspend</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
