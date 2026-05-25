<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import StatusDot from './StatusDot.svelte';

  interface Props {
    appName?: string;
    logoSrc?: string;
    status?: 'connected' | 'checking' | 'disconnected' | 'error';
    showAdmin?: boolean;
  }

  let {
    appName = 'Requests & Offers',
    logoSrc = '',
    status = 'connected',
    showAdmin = false
  }: Props = $props();

  let path = $derived(page.url.pathname);
  let onRequests = $derived(path.startsWith('/ui-kit/app/requests'));
  let onOffers = $derived(path.startsWith('/ui-kit/app/offers'));
  let onAdmin = $derived(path.startsWith('/ui-kit/app/admin'));

  let openMenu = $state<string | null>(null);

  function toggleMenu(name: string) {
    openMenu = openMenu === name ? null : name;
  }

  function nav(route: string) {
    goto('/ui-kit/app/' + route);
    openMenu = null;
  }

  function closeMenu() {
    openMenu = null;
  }

  const menus: Record<string, { label: string; route: string }[]> = {
    'My Activity': [
      { label: '📋 My Requests',     route: 'my-requests' },
      { label: '✨ My Offers',        route: 'my-offers' },
      { label: '👤 My Profile',       route: 'my-profile' },
      { label: '🏛️ My Organizations', route: 'my-organizations' },
    ],
    'Community': [
      { label: '👥 Members',          route: 'members' },
      { label: '🏢 Organizations',    route: 'organizations' },
    ],
    'Resources': [
      { label: '🏷️ Service Types',    route: 'service-types' },
      { label: '💛 Mediums',          route: 'mediums' },
    ],
  };
</script>

<!-- Close dropdown on outside click -->
<svelte:document onclick={closeMenu} />

<header class="relative flex items-center gap-3 px-4 py-2 bg-primary-500 text-white shadow-md">
  <!-- Brand -->
  <div class="flex items-center gap-2 shrink-0">
    {#if logoSrc}
      <img src={logoSrc} alt={appName} class="h-8 w-8 rounded-full" />
    {/if}
    <span class="font-bold text-sm whitespace-nowrap">{appName}</span>
  </div>

  <!-- Quick-access pills -->
  <button
    class="btn btn-sm border border-white/30 {onRequests ? 'variant-filled-secondary' : 'variant-filled-primary'}"
    onclick={() => goto('/ui-kit/app/requests')}
  >
    📝 Requests
  </button>
  <button
    class="btn btn-sm {onOffers ? 'variant-filled-secondary' : 'variant-filled-warning'}"
    onclick={() => goto('/ui-kit/app/offers')}
  >
    💡 Offers
  </button>

  <!-- Dropdown nav groups -->
  <nav class="hidden md:flex items-center gap-1 flex-1">
    {#each Object.entries(menus) as [name, items]}
      <div class="relative">
        <button
          class="btn btn-sm text-white/80 hover:text-white hover:bg-white/10 gap-1"
          onclick={(e) => { e.stopPropagation(); toggleMenu(name); }}
        >
          {name} <span class="text-xs opacity-60 transition-transform {openMenu === name ? 'rotate-180' : ''}">▾</span>
        </button>

        {#if openMenu === name}
          <div
            class="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-lg bg-white shadow-lg border border-surface-200 py-1 overflow-hidden"
            onclick={(e) => e.stopPropagation()}
            role="menu"
          >
            {#each items as item}
              <button
                class="w-full text-left px-4 py-2 text-sm text-surface-800 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                onclick={() => nav(item.route)}
                role="menuitem"
              >
                {item.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </nav>

  <!-- Right side -->
  <div class="flex items-center gap-3 ml-auto">
    <StatusDot {status} />
    {#if showAdmin}
      <button
        class="btn btn-sm border border-white/40 text-white hover:bg-white/10 {onAdmin ? 'variant-filled-secondary' : ''}"
        onclick={() => goto('/ui-kit/app/admin')}
      >
        ⚙️ Admin
      </button>
    {/if}
  </div>
</header>
