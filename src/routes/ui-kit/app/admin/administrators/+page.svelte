<svelte:head><title>Administrators — Admin</title></svelte:head>

<script lang="ts">
  import { ADMINS } from '$lib/data/mock';
</script>

<div class="ro-admin-main">
  <div class="ro-admin-header">
    <h1 class="ro-admin-title">Administrators</h1>
    <button class="btn-ds btn-ds--primary btn-ds--sm">+ Add Administrator</button>
  </div>

  <p class="ro-small" style="margin-bottom:16px">{ADMINS.length} network administrator{ADMINS.length !== 1 ? 's' : ''}</p>

  <section class="ro-admin-section">
    <table class="ro-data-table">
      <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th>Actions</th></tr></thead>
      <tbody>
        {#each ADMINS as u}
          <tr>
            <td><div class="ro-av ro-av--sm">{u.name[0]}</div></td>
            <td class="ro-td-name">{u.name}</td>
            <td><span class="ro-badge-type">{u.type}</span></td>
            <td class="ro-td-muted">{u.location}</td>
            <td>
              <button class="btn-ghost btn-ghost--sm">View</button>
              <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Remove</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>
