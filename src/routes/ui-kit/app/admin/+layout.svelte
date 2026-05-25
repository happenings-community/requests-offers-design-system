<script lang="ts">
  import type { Snippet } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  let { children }: { children: Snippet } = $props();

  const navItems = [
    { path: '/ui-kit/app/admin', label: 'Dashboard', icon: '🏠' },
    { path: '/ui-kit/app/admin/users', label: 'Users', icon: '👥' },
    { path: '/ui-kit/app/admin/organizations', label: 'Organizations', icon: '🏢' },
    { path: '/ui-kit/app/admin/service-types', label: 'Service Types', icon: '🏷️' },
    { path: '/ui-kit/app/admin/mediums', label: 'Mediums', icon: '💛' },
    { path: '/ui-kit/app/admin/administrators', label: 'Administrators', icon: '🛡️' }
  ];

  let current = $derived(page.url.pathname);
</script>

<div style="display:flex; min-height:100vh;">
  <aside style="width:220px; flex-shrink:0; background:rgb(var(--color-surface-900)); padding:16px; display:flex; flex-direction:column; gap:4px;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; padding:4px 8px;">
      <img src="/assets/hAppeningsCIClogo.png" alt="" width="32" height="32" />
      <span style="font-weight:700; color:white;">Admin</span>
    </div>
    <nav style="flex:1; display:flex; flex-direction:column; gap:2px;">
      {#each navItems as item}
        <button
          style="display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:8px; text-align:left; font-size:14px; border:none; cursor:pointer; transition:background 0.1s;
            background:{current === item.path ? 'rgb(var(--color-secondary-500))' : 'transparent'};
            color:{current === item.path ? '#111' : 'rgba(255,255,255,0.7)'};
            font-weight:{current === item.path ? '600' : '400'};"
          onclick={() => goto(item.path)}
          onmouseenter={(e) => { if (current !== item.path) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'white'; } }}
          onmouseleave={(e) => { if (current !== item.path) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; } }}
        >
          <span>{item.icon}</span>{item.label}
        </button>
      {/each}
    </nav>
    <button
      style="display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.3); color:rgba(255,255,255,0.8); background:transparent; cursor:pointer; font-size:13px; margin-top:8px;"
      onclick={() => goto('/ui-kit/app/home')}
    >← Exit Admin</button>
  </aside>
  <main style="flex:1; background:rgb(var(--color-surface-50)); min-height:100vh;">
    {@render children()}
  </main>
</div>
