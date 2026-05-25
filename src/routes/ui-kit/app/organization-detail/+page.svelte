<svelte:head><title>Organization — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { ORGS, USERS, md } from '$lib/data/mock';

  const org = ORGS[0]; // hAppenings CIC
  const members = USERS.slice(0, 4);
</script>

<div class="ro-page">
  <div class="ro-detail-nav">
    <button class="btn-ghost" onclick={() => goto('/ui-kit/app/organizations')}>← Back</button>
  </div>

  <div class="ro-detail-header">
    <div class="ro-org-detail-header">
      <div class="ro-org-logo-lg">{org.name[0]}</div>
      <div>
        <h1 class="ro-h1">{org.name}</h1>
        <span class="ro-small">📍 {org.location} · ✉️ {org.email}</span>
      </div>
    </div>
    <p class="ro-p">{@html md(org.description)}</p>
    <div class="ro-detail-badges" style="margin-top:12px">
      <span class="ro-chip ro-chip--success">{org.status}</span>
      <span class="ro-chip ro-chip--surface">👥 {org.members} members</span>
    </div>
  </div>

  <section>
    <h3 class="ro-section-title">Members</h3>
    <table class="ro-data-table">
      <thead><tr><th></th><th>Name</th><th>Type</th><th></th></tr></thead>
      <tbody>
        {#each members as u}
          <tr>
            <td><div class="ro-av ro-av--sm">{u.name[0]}</div></td>
            <td class="ro-td-name">{u.name}</td>
            <td><span class="ro-badge-type">{u.type}</span></td>
            <td><button class="btn-ghost btn-ghost--sm" onclick={() => goto('/ui-kit/app/member-profile')}>View</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>
