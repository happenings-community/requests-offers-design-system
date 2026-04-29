<script lang="ts">
  import { page } from '$app/state';
  import { state } from '$lib/state.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  const current = $derived(page.url.pathname);

  const NAV = [
    { href: '/app/admin',               label: 'Dashboard',           icon: '🏠' },
    { href: '/app/admin/users',         label: 'Users',               icon: '👥' },
    { href: '/app/admin/organizations', label: 'Organizations',       icon: '🏢' },
    { href: '/app/admin/requests',      label: 'Requests',            icon: '📝' },
    { href: '/app/admin/offers',        label: 'Offers',              icon: '💡' },
    { href: '/app/admin/service-types', label: 'Service Types',       icon: '🏷️' },
    { href: '/app/admin/mediums',       label: 'Mediums of Exchange', icon: '💱' },
    { href: '/app/admin/administrators',label: 'Administrators',      icon: '🛡️' },
  ];
</script>

<div class="admin-wrap">
  <aside class="admin-sidebar">
    <a href="/app/admin" class="admin-logo">
      <img src="/assets/hAppeningsCIClogo.png" alt="" width="36" height="36" />
      <span>Admin</span>
    </a>
    <nav class="admin-nav">
      {#each NAV as item}
        <a href={item.href}
          class="admin-nav-item {current === item.href ? 'is-active' : ''}">
          <span>{item.icon}</span>{item.label}
        </a>
      {/each}
    </nav>
    <div class="admin-sidebar-foot">
      <a href="/app" class="admin-exit">← Exit Admin</a>
    </div>
  </aside>
  <main class="admin-main">
    {@render children()}
  </main>
</div>
