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

  // ─────────────────────────────────────────────────────────────────────────
  // Moderation Queue tabs — three tabs, prod-aligned (counts in labels).
  // ─────────────────────────────────────────────────────────────────────────
  type ModerationTab = 'pending-users' | 'pending-orgs' | 'member-migrations';
  let moderationTab = $state<ModerationTab>('pending-users');

  // ─────────────────────────────────────────────────────────────────────────
  // Member Migrations — generic primitive for retroactively transforming DHT
  // entries when architecture evolves. The button label and section heading
  // are deliberately named after the PRIMITIVE ("Run Member Migration") and
  // never after the specific migration; new schema migrations get added as
  // new rows in this table without UI changes.
  //
  // First concrete instance: Pre-Lobby Back-Propagation — synthesises
  // LobbyOrigin records for members who joined before the lobby DHT existed.
  // Pre-lobby records have provenance="pre-lobby" and null membraneProofHash
  // / lobbyAgentPubKey.
  //
  // Completed migrations stay visible in the list with a ✓ Completed tag,
  // matching prod's "show what's done" philosophy for one-shot architectural
  // events (in contrast to user approvals, which disappear on action).
  // ─────────────────────────────────────────────────────────────────────────
  type MigrationStatus = 'idle' | 'running' | 'completed';
  type Migration = {
    id: string;
    name: string;
    description: string;
    total: number;
    processed: number;
    lastRun: string | null;
    status: MigrationStatus;
  };

  let migrations = $state<Migration[]>([
    {
      id: 'pre-lobby-back-propagation',
      name: 'Pre-Lobby Back-Propagation',
      description:
        'Synthesise LobbyOrigin records for members who joined before the ' +
        'lobby DHT existed. Pre-lobby records carry provenance="pre-lobby" ' +
        'and null membraneProofHash / lobbyAgentPubKey.',
      total: 12,
      processed: 7,
      lastRun: '2 hours ago',
      status: 'idle'
    }
  ]);

  const activeMigrationCount = $derived(
    migrations.filter(m => m.status !== 'completed').length
  );

  async function runMigration(id: string): Promise<void> {
    const idx = migrations.findIndex(m => m.id === id);
    if (idx === -1) return;
    if (migrations[idx].status === 'running') return;

    // MOCK: in production this would invoke a coordinator zome call to step
    // the migration forward by a batch. Here we tick the processed count by
    // a ~9% slice of total per click, with a 1s spinner to convey work.
    migrations[idx].status = 'running';
    await new Promise((r) => setTimeout(r, 1000));

    const step = Math.max(1, Math.ceil(migrations[idx].total * 0.09));
    migrations[idx].processed = Math.min(
      migrations[idx].total,
      migrations[idx].processed + step
    );
    migrations[idx].lastRun = 'just now';

    if (migrations[idx].processed >= migrations[idx].total) {
      migrations[idx].status = 'completed';
    } else {
      migrations[idx].status = 'idle';
    }
  }

  function migrationPercent(m: Migration): number {
    return Math.round((m.processed / m.total) * 100);
  }
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
        <button
          class="tab {moderationTab === 'pending-users' ? 'tab--active' : ''}"
          onclick={() => moderationTab = 'pending-users'}
        >Pending Users ({pendingUsers.length})</button>
        <button
          class="tab {moderationTab === 'pending-orgs' ? 'tab--active' : ''}"
          onclick={() => moderationTab = 'pending-orgs'}
        >Pending Orgs (0)</button>
        <button
          class="tab {moderationTab === 'member-migrations' ? 'tab--active' : ''}"
          onclick={() => moderationTab = 'member-migrations'}
        >Member Migrations ({activeMigrationCount})</button>
      </div>

      {#if moderationTab === 'pending-users'}
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

      {:else if moderationTab === 'pending-orgs'}
        <p class="queue-empty">No pending organisations.</p>

      {:else if moderationTab === 'member-migrations'}
        <!--
          Member Migrations primitive — generic schema-migration UI for DHT
          entries. All migrations stay visible regardless of status; completed
          ones carry a ✓ Completed badge. One-shot architectural events stay
          in the list as a record-of-fact rather than disappearing (unlike
          user approvals, which vanish on action).
        -->
        <div class="migration-list">
          {#each migrations as m (m.id)}
            <article
              class="migration-row"
              class:migration-row--completed={m.status === 'completed'}
            >
              <header class="migration-head">
                <div>
                  <h4 class="migration-name">{m.name}</h4>
                  <p class="migration-desc">{m.description}</p>
                </div>
                {#if m.status === 'completed'}
                  <span class="migration-done-tag">✓ Completed</span>
                {:else}
                  <button
                    class="migration-run"
                    disabled={m.status === 'running'}
                    onclick={() => runMigration(m.id)}
                  >
                    {#if m.status === 'running'}⏳ Running…{:else}▶ Run Member Migration{/if}
                  </button>
                {/if}
              </header>

              <div class="migration-progress">
                <div class="migration-progress-bar">
                  <div
                    class="migration-progress-fill"
                    style="width: {migrationPercent(m)}%"
                  ></div>
                </div>
                <span class="migration-progress-text">
                  {migrationPercent(m)}% ({m.processed} of {m.total})
                </span>
              </div>
              <p class="migration-meta">
                Last run: {m.lastRun ?? 'never'}
              </p>
            </article>
          {/each}
        </div>
      {/if}
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
  .queue-empty {
    margin: 0;
    padding: 24px 12px;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
    font: 400 13px/18px var(--font-base);
  }

  /* ── Member Migrations ──────────────────────────────────────────────── */
  .migration-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .migration-row {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .migration-row--completed {
    opacity: 0.75;
  }
  .migration-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .migration-name {
    margin: 0;
    font: 600 15px/20px var(--font-base);
    color: #fff;
  }
  .migration-desc {
    margin: 4px 0 0 0;
    font: 400 12px/18px var(--font-base);
    color: rgba(255, 255, 255, 0.55);
    max-width: 540px;
  }
  .migration-run {
    flex-shrink: 0;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid rgb(var(--color-primary-500));
    background: rgb(var(--color-primary-500));
    color: #fff;
    font: 600 13px/18px var(--font-base);
    cursor: pointer;
    transition: background 100ms, border-color 100ms;
  }
  .migration-run:hover:not(:disabled) {
    background: rgb(var(--color-primary-600));
    border-color: rgb(var(--color-primary-600));
  }
  .migration-run:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  .migration-progress {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .migration-progress-bar {
    flex: 1;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }
  .migration-progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      rgb(var(--color-primary-500)) 0%,
      rgb(var(--color-secondary-500)) 100%
    );
    transition: width 400ms ease;
  }
  .migration-progress-text {
    font: 600 12px/16px var(--font-base);
    color: #fff;
    min-width: 110px;
    text-align: right;
  }
  .migration-meta {
    margin: 0;
    font: 400 11px/16px var(--font-base);
    color: rgba(255, 255, 255, 0.4);
  }
  .migration-done-tag {
    flex-shrink: 0;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.15);
    color: rgb(74, 222, 128);
    font: 600 12px/16px var(--font-base);
  }
</style>
