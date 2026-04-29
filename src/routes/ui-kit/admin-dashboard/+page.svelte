<svelte:head><title>Admin Dashboard — UI Kit</title></svelte:head>

<script lang="ts">
  const stats = [
    { label: 'Administrators', value: '3', icon: '🛡️' },
    { label: 'Total Users', value: '142', icon: '👥' },
    { label: 'Organizations', value: '18', icon: '🏢' },
    { label: 'Active Mediums', value: '6', icon: '💱' },
  ];

  const pendingUsers = [
    { name: 'Sophie Laurent', location: 'Lyon, France', joined: '2 days ago', initial: 'S' },
    { name: 'Kwame Asante', location: 'Accra, Ghana', joined: '4 days ago', initial: 'K' },
  ];

  const navItems = [
    { key: 'admin',                label: 'Dashboard',          ic: '🏠', active: true },
    { key: 'admin-mediums',        label: 'Mediums of Exchange', ic: '💱' },
    { key: 'admin-service-types',  label: 'Service Types',       ic: '🏷️' },
    { key: 'admin-orgs',           label: 'Organizations',       ic: '🏢' },
    { key: 'admin-requests',       label: 'Requests',            ic: '📝' },
    { key: 'admin-offers',         label: 'Offers',              ic: '💡' },
    { key: 'admin-administrators', label: 'Administrators',      ic: '🛡️' },
  ];
</script>

<div class="admin-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img src="/assets/hAppeningsCIClogo.png" alt="hAppenings" width="36" height="36" />
      <span class="sidebar-logo-text">Admin</span>
    </div>
    <nav class="sidebar-nav">
      {#each navItems as item}
        <button class="sidebar-item {item.active ? 'sidebar-item--active' : ''}">
          <span class="sidebar-ic">{item.ic}</span>
          {item.label}
        </button>
      {/each}
    </nav>
    <div class="sidebar-footer">
      <ds-button variant="error" size="sm">Exit Admin</ds-button>
    </div>
  </aside>

  <!-- Main -->
  <main class="admin-main">
    <header class="admin-header">
      <h1 class="admin-title">Admin Dashboard</h1>
      <ds-status-dot status="connected"></ds-status-dot>
    </header>

    <!-- Stats -->
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat-card">
          <span class="stat-icon">{stat.icon}</span>
          <div class="stat-value">{stat.value}</div>
          <div class="stat-label">{stat.label}</div>
        </div>
      {/each}
    </div>

    <!-- Moderation queue -->
    <section class="section">
      <div class="section-head">
        <h2 class="section-title">Moderation Queue</h2>
        <ds-chip tone="warning">2 Pending</ds-chip>
      </div>
      <div class="queue-tabs">
        <button class="tab tab--active">Pending Users</button>
        <button class="tab">Pending Orgs</button>
      </div>
      <div class="queue-list">
        {#each pendingUsers as user}
          <div class="queue-row">
            <div class="user-avatar">{user.initial}</div>
            <div class="user-info">
              <div class="user-name">{user.name}</div>
              <div class="user-meta">{user.location} · Joined {user.joined}</div>
            </div>
            <div class="queue-actions">
              <ds-button variant="ghost" size="sm">View</ds-button>
              <ds-button variant="error" size="sm">Reject</ds-button>
              <ds-button variant="primary" size="sm">Approve</ds-button>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </main>
</div>

<style>
  .admin-layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }

  .sidebar {
    background: rgb(var(--color-surface-900)); color: #fff;
    display: flex; flex-direction: column; padding: 20px 12px;
  }
  .sidebar-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; padding: 0 8px; }
  .sidebar-logo-text { font: 700 16px/22px var(--font-base); }
  .sidebar-nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 10px; border-radius: 8px; border: none;
    background: none; color: rgba(255,255,255,.7);
    font: 500 13px/18px var(--font-base); cursor: pointer; text-align: left;
    transition: background 100ms, color 100ms;
  }
  .sidebar-item:hover { background: rgba(255,255,255,.08); color: #fff; }
  .sidebar-item--active { background: rgba(255,255,255,.12); color: #fff; }
  .sidebar-ic { width: 20px; text-align: center; }
  .sidebar-footer { padding-top: 16px; border-top: 1px solid rgba(255,255,255,.1); }

  .admin-main { background: rgb(var(--color-surface-800)); padding: 28px; overflow-y: auto; }
  .admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .admin-title { margin: 0; font: 700 22px/28px var(--font-base); color: #fff; }

  .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px; }
  .stat-card {
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1);
    border-radius: 12px; padding: 18px; text-align: center;
  }
  .stat-icon { font-size: 24px; display: block; margin-bottom: 8px; }
  .stat-value { font: 700 28px/32px var(--font-base); color: #fff; }
  .stat-label { font: 500 12px/16px var(--font-base); color: rgba(255,255,255,.6); margin-top: 4px; }

  .section { background: rgba(255,255,255,.05); border-radius: 12px; padding: 20px; }
  .section-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .section-title { margin: 0; font: 600 16px/22px var(--font-base); color: #fff; }
  .queue-tabs { display: flex; gap: 2px; margin-bottom: 16px; }
  .tab { padding: 6px 14px; border-radius: 6px; border: none; background: none; color: rgba(255,255,255,.6); font: 500 13px/20px var(--font-base); cursor: pointer; }
  .tab--active { background: rgba(255,255,255,.12); color: #fff; }
  .queue-list { display: flex; flex-direction: column; gap: 2px; }
  .queue-row {
    display: flex; align-items: center; gap: 12px;
    padding: 12px; border-radius: 8px; background: rgba(255,255,255,.05);
  }
  .user-avatar {
    width: 36px; height: 36px; border-radius: 9999px; flex-shrink: 0;
    background: rgb(var(--color-primary-300)); color: rgb(var(--color-primary-900));
    display: grid; place-items: center; font: 700 14px/1 var(--font-base);
  }
  .user-info { flex: 1; }
  .user-name { font: 600 14px/20px var(--font-base); color: #fff; }
  .user-meta { font: 400 12px/16px var(--font-base); color: rgba(255,255,255,.5); }
  .queue-actions { display: flex; gap: 6px; }
</style>
