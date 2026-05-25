<svelte:head><title>Organizations — Admin</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { ORGS } from '$lib/data/mock';

  function toneFor(status: string) {
    return status === 'active' ? 'ro-chip--success' : status === 'pending' ? 'ro-chip--warning' : 'ro-chip--error';
  }
</script>

<div class="ro-admin-main">
  <div class="ro-admin-header">
    <h1 class="ro-admin-title">Organizations Management</h1>
    <button class="btn-ghost">Status History</button>
  </div>

  <section class="ro-admin-section">
    <table class="ro-data-table">
      <thead><tr><th></th><th>Name</th><th>Location</th><th>Members</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {#each ORGS as o}
          <tr>
            <td><div class="ro-org-logo" style="width:32px;height:32px;font-size:14px;border-radius:8px;margin:0">{o.name[0]}</div></td>
            <td class="ro-td-name">{o.name}</td>
            <td class="ro-td-muted">{o.location}</td>
            <td class="ro-td-muted">{o.members}</td>
            <td><span class="ro-chip {toneFor(o.status)}">{o.status}</span></td>
            <td>
              <button class="btn-ghost btn-ghost--sm" onclick={() => goto('/ui-kit/app/organization-detail')}>View</button>
              <button class="btn-ghost btn-ghost--sm btn-ghost--danger">Suspend</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>
