<svelte:head><title>Service Types — Admin</title></svelte:head>

<script lang="ts">
  import { SERVICE_TYPES } from '$lib/data/mock';
</script>

<div class="ro-admin-main">
  <div class="ro-admin-header">
    <h1 class="ro-admin-title">Service Types Management</h1>
    <button class="btn-ds btn-ds--primary btn-ds--sm">+ Create Type</button>
  </div>

  <section class="ro-admin-section">
    <table class="ro-data-table">
      <thead><tr><th>Name</th><th>Classification</th><th>Actions</th></tr></thead>
      <tbody>
        {#each SERVICE_TYPES as st}
          <tr>
            <td class="ro-td-name">{st.name}</td>
            <td><span class="ro-chip {st.technical ? 'ro-chip--tertiary' : 'ro-chip--surface'}">{st.technical ? 'Technical' : 'Non-Technical'}</span></td>
            <td>
              <button class="btn-ghost btn-ghost--sm">Edit</button>
              <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>
