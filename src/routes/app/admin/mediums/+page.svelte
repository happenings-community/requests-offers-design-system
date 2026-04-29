<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Mediums of Exchange — Admin</title></svelte:head>
<div class="admin-page-header">
  <h1 class="admin-page-title">Mediums of Exchange</h1>
  <button class="btn-ds btn-ds--primary btn-ds--sm">+ Create Medium</button>
</div>
<table class="admin-table">
  <thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
  <tbody>
    {#each state.mediums as m}
      <tr>
        <td class="td-name">{m.code}</td>
        <td>{m.name}</td>
        <td><ds-chip tone={m.type==='base'?'surface':'tertiary'}>{m.type==='base'?'📂 Base':'💰 Currency'}</ds-chip></td>
        <td><ds-chip tone={m.status==='approved'?'success':'warning'}>{m.status}</ds-chip></td>
        <td>
          {#if m.status==='pending'}
            <button class="btn-ghost btn-ghost--sm">Approve</button>
            <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))">Reject</button>
          {/if}
          <button class="btn-ghost btn-ghost--sm">Edit</button>
          <button class="btn-ghost btn-ghost--sm" style="color:rgb(var(--color-error-600))"
            onclick={() => state.confirmModal = { message: `Delete medium "${m.name}"?`, onConfirm: () => {} }}>Delete</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
