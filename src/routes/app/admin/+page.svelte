<script lang="ts">
  import { state } from '$lib/state.svelte';
  const ADMINS = $derived(state.users.slice(0, 3));
</script>

<svelte:head><title>Admin Dashboard — R&O</title></svelte:head>
<div class="admin-page-header">
  <h1 class="admin-page-title">Admin Dashboard</h1>
  <ds-status-dot status="connected"></ds-status-dot>
</div>
<div class="stats-grid">
  {#each [
    {label:'Administrators', value:'3',                                                   icon:'🛡️'},
    {label:'Total Users',    value:String(state.users.length),                            icon:'👥'},
    {label:'Organizations',  value:String(state.orgs.length),                            icon:'🏢'},
    {label:'Active Requests',value:String(state.requests.filter(r=>r.status==='active').length), icon:'📝'},
  ] as s}
    <div class="stat-card"><span class="stat-icon">{s.icon}</span><div class="stat-value">{s.value}</div><div class="stat-label">{s.label}</div></div>
  {/each}
</div>
<section class="admin-section">
  <h2 class="admin-section-title">Moderation Queue</h2>
  <div class="admin-tabs">
    <button class="admin-tab is-active">Pending Users ({state.users.filter(u=>u.status==='pending').length})</button>
    <button class="admin-tab">Pending Orgs (0)</button>
  </div>
  {#each state.users.filter(u=>u.status==='pending') as u}
    <div class="moderation-row">
      <div class="av av--md">{u.name[0]}</div>
      <div class="moderation-info"><div class="moderation-name">{u.name}</div><div class="moderation-meta">{u.location} · {u.type}</div></div>
      <div class="moderation-actions">
        <a href="/app/users/{u.id}" class="btn-ghost">View</a>
        <button class="btn-ds btn-ds--error btn-ds--sm">Reject</button>
        <button class="btn-ds btn-ds--primary btn-ds--sm">Approve</button>
      </div>
    </div>
  {:else}
    <p class="empty-note">No pending users.</p>
  {/each}
</section>
