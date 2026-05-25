<svelte:head><title>Mediums — Admin</title></svelte:head>

<script lang="ts">
  import { MEDIUMS } from '$lib/data/mock';
</script>

<div class="ro-admin-main">
  <div class="ro-admin-header">
    <h1 class="ro-admin-title">Mediums of Exchange</h1>
    <button class="btn-ds btn-ds--primary btn-ds--sm">+ Create Medium</button>
  </div>

  <section class="ro-admin-section">
    <table class="ro-data-table">
      <thead><tr><th>Code</th><th>Name</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {#each MEDIUMS as m}
          <tr>
            <td class="ro-td-name">{m.code}</td>
            <td class="ro-td-muted">{m.name}</td>
            <td><span class="ro-chip {m.type === 'base' ? 'ro-chip--surface' : 'ro-chip--tertiary'}">{m.type === 'base' ? '📂 Base' : '💰 Currency'}</span></td>
            <td><span class="ro-chip {m.status === 'approved' ? 'ro-chip--success' : 'ro-chip--warning'}">{m.status}</span></td>
            <td>
              {#if m.status === 'pending'}
                <button class="btn-ghost btn-ghost--sm">Approve</button>
                <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Reject</button>
              {/if}
              <button class="btn-ghost btn-ghost--sm">Edit</button>
              <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>
