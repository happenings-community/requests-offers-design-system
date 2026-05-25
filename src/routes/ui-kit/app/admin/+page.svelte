<svelte:head><title>Admin Dashboard — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { USERS, ORGS, REQUESTS, ADMINS } from '$lib/data/mock';

  let pendingUsers = $derived(USERS.filter((u) => u.status === 'pending'));
  const stats = [
    { label: 'Administrators', value: String(ADMINS.length), icon: '🛡️' },
    { label: 'Total Users', value: String(USERS.length), icon: '👥' },
    { label: 'Organizations', value: String(ORGS.length), icon: '🏢' },
    { label: 'Active Requests', value: String(REQUESTS.filter((r) => r.status === 'active').length), icon: '📝' }
  ];
</script>

<div class="ro-admin-main">
  <div class="ro-admin-header">
    <h1 class="ro-admin-title">Admin Dashboard</h1>
  </div>

  <div class="ro-stats-grid">
    {#each stats as s}
      <div class="ro-stat-card"><span class="ro-stat-icon">{s.icon}</span><div class="ro-stat-value">{s.value}</div><div class="ro-stat-label">{s.label}</div></div>
    {/each}
  </div>

  <section class="ro-admin-section">
    <h2 class="ro-section-title">Moderation Queue</h2>
    <div class="ro-filter-row">
      <button class="ro-filter-chip ro-filter-chip--active">Pending Users ({pendingUsers.length})</button>
      <button class="ro-filter-chip">Pending Orgs (0)</button>
    </div>
    {#each pendingUsers as u}
      <div class="ro-moderation-row">
        <div class="ro-av ro-av--md">{u.name[0]}</div>
        <div class="ro-moderation-info"><div class="ro-moderation-name">{u.name}</div><div class="ro-moderation-meta">{u.location} · {u.type}</div></div>
        <div class="ro-moderation-actions">
          <button class="btn-ghost" onclick={() => goto('/ui-kit/app/admin/users')}>View</button>
          <button class="btn-ds btn-ds--error btn-ds--sm">Reject</button>
          <button class="btn-ds btn-ds--primary btn-ds--sm">Approve</button>
        </div>
      </div>
    {:else}
      <p class="ro-small">No pending users.</p>
    {/each}
  </section>
</div>
