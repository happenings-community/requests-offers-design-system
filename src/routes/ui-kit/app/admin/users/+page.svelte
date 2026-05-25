<svelte:head><title>Users — Admin</title></svelte:head>

<script lang="ts">
  import { USERS } from '$lib/data/mock';

  const categories = [
    { label: 'Pending Users', users: USERS.filter((u) => u.status === 'pending'), color: '71 32 183' },
    { label: 'Accepted Users', users: USERS.filter((u) => u.status === 'accepted'), color: '132 204 22' }
  ];
</script>

<div class="ro-admin-main">
  <div class="ro-admin-header">
    <h1 class="ro-admin-title">Users Management</h1>
    <button class="btn-ghost">Status History</button>
  </div>

  {#each categories as cat}
    <section class="ro-admin-section" style="border-left:3px solid rgb({cat.color})">
      <h3 class="ro-section-title">{cat.label} ({cat.users.length})</h3>
      <table class="ro-data-table">
        <thead><tr><th></th><th>Name</th><th>Type</th><th>Location</th><th>Actions</th></tr></thead>
        <tbody>
          {#each cat.users as u}
            <tr>
              <td><div class="ro-av ro-av--sm">{u.name[0]}</div></td>
              <td class="ro-td-name">
                {u.name}
                {#if u.status === 'pending'}<span class="ro-chip ro-chip--warning" style="margin-left:6px;font-size:10px">Pending</span>{/if}
              </td>
              <td><span class="ro-badge-type">{u.type}</span></td>
              <td class="ro-td-muted">{u.location}</td>
              <td>
                {#if u.status === 'pending'}
                  <button class="btn-ghost btn-ghost--sm">Approve</button>
                  <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Reject</button>
                {:else}
                  <button class="btn-ghost btn-ghost--sm">View</button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  {/each}
</div>
