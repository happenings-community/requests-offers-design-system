<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Service Types — Admin</title></svelte:head>
<div class="admin-page-header">
  <h1 class="admin-page-title">Service Types Management</h1>
  <button class="btn-ds btn-ds--primary btn-ds--sm">+ Create Type</button>
</div>
<table class="admin-table">
  <thead><tr><th>Name</th><th>Classification</th><th>Actions</th></tr></thead>
  <tbody>
    {#each state.serviceTypes as st}
      <tr>
        <td class="td-name">{st.name}</td>
        <td><ds-chip tone={st.technical?'tertiary':'surface'}>{st.technical?'Technical':'Non-Technical'}</ds-chip></td>
        <td>
          <button class="btn-ghost btn-ghost--sm">Edit</button>
          <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
            onclick={() => state.confirmModal = { message: `Delete "${st.name}"? This cannot be undone.`, onConfirm: () => {} }}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
