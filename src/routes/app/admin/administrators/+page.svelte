<script lang="ts">
  import { state } from '$lib/state.svelte';
  const ADMINS = $derived(state.users.slice(0, 3));
</script>

<svelte:head><title>Administrators — Admin</title></svelte:head>
<div class="admin-page-header">
  <h1 class="admin-page-title">Administrators</h1>
  <button class="btn-ds btn-ds--primary btn-ds--sm">+ Add Administrator</button>
</div>
<p class="empty-note" style="margin-bottom:16px">{ADMINS.length} network administrator{ADMINS.length !== 1 ? 's' : ''}</p>
<table class="admin-table">
  <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th>Actions</th></tr></thead>
  <tbody>
    {#each ADMINS as u}
      <tr>
        <td><div class="av av--sm">{u.name[0]}</div></td>
        <td class="td-name">{u.name}</td>
        <td><span class="badge-type">{u.type}</span></td>
        <td class="td-muted">{u.location}</td>
        <td>
          <a href="/app/users/{u.id}" class="btn-ghost btn-ghost--sm">View</a>
          <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
            onclick={() => state.confirmModal = { message: `Remove ${u.name} as administrator?`, onConfirm: () => {} }}>Remove</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
