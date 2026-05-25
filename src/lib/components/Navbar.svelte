<script lang="ts">
  import { goto } from '$app/navigation';
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

  const menus: Record<string, { label: string; icon: string; route: string; description?: string }[]> = {
    'Profile': [
      { label: 'My Profile',       icon: '👤', route: 'my-profile',       description: 'View and edit your profile' },
      { label: 'My Requests',      icon: '📋', route: 'my-requests',      description: 'Manage your requests for help' },
      { label: 'My Offers',        icon: '🎯', route: 'my-offers',        description: 'Manage your offers to help others' },
      { label: 'My Organizations', icon: '🏛️', route: 'my-organizations', description: 'Manage your organizations' },
    ],
    'Community': [
      { label: 'All Users',     icon: '👥', route: 'members',       description: 'Browse community members' },
      { label: 'Organizations', icon: '🏢', route: 'organizations', description: 'Explore organizations and teams' },
    ],
    'Resources': [
      { label: 'Service Types',      icon: '🏷️', route: 'service-types', description: 'Browse available skill categories' },
      { label: 'Mediums of Exchange',icon: '💛', route: 'mediums',        description: 'Browse exchange mediums' },
    ],
  };
</script>

<!-- Close dropdown on outside click -->
<svelte:document onclick={closeMenu} />

<nav class="flex h-20 w-full items-center justify-between bg-primary-500 px-4 text-white shadow-lg">
  <!-- Logo Section -->
  <div class="flex items-center">
    <a
      href="/ui-kit/app/home"
      class="flex items-center gap-3 transition-opacity hover:opacity-80"
    >
      {#if logoSrc}
        <img src={logoSrc} alt={appName} class="h-12 w-12" />
      {/if}
      <span class="hidden text-lg font-bold text-white sm:block">{appName}</span>
    </a>
  </div>

  <!-- Desktop Navigation -->
  <div class="hidden items-center gap-8 lg:flex">
    <!-- Primary Action Buttons -->
    <div class="flex items-center gap-6">
      <button
        class="variant-filled-secondary btn px-6 py-2 font-semibold shadow-md transition-colors hover:shadow-lg"
        onclick={() => nav('requests')}
        aria-label="Browse requests"
      >
        📝 Requests
      </button>
      <button
        class="variant-filled-warning btn px-6 py-2 font-semibold shadow-md transition-colors hover:shadow-lg"
        onclick={() => nav('offers')}
        aria-label="Browse offers"
      >
        💡 Offers
      </button>
    </div>

    <!-- Dropdown Menus -->
    <div class="flex items-center gap-4">
      {#each Object.entries(menus) as [name, items]}
        <div class="relative">
          <button
            class="rounded px-3 py-2 text-white/90 transition-colors hover:text-white focus:outline-none"
            onclick={(e) => { e.stopPropagation(); toggleMenu(name); }}
            aria-expanded={openMenu === name}
            aria-haspopup="true"
          >
            {name}
            <svg
              class="ml-1 inline-block h-4 w-4 transition-transform duration-200 {openMenu === name ? 'rotate-180' : ''}"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if openMenu === name}
            <div
              class="absolute top-full left-0 z-50 mt-1 w-64 rounded-lg border border-gray-200 bg-white shadow-xl"
              onclick={(e) => e.stopPropagation()}
              role="menu"
            >
              <div class="py-2">
                {#each items as item}
                  <button
                    class="w-full text-left px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                    onclick={() => nav(item.route)}
                    role="menuitem"
                  >
                    <div class="flex items-center gap-3">
                      <span class="flex-shrink-0 text-lg">{item.icon}</span>
                      <div class="min-w-0 flex-1">
                        <div class="font-medium text-gray-900">{item.label}</div>
                        {#if item.description}
                          <div class="truncate text-sm text-gray-500">{item.description}</div>
                        {/if}
                      </div>
                    </div>
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- Connection Status -->
    <div class="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm transition-colors cursor-pointer hover:bg-white/20">
      <StatusDot {status} showLabel />
    </div>

    <!-- Admin -->
    {#if showAdmin}
      <button
        class="variant-ringed-secondary btn border-2 px-4 py-2 text-sm text-white transition-colors hover:variant-filled-secondary"
        onclick={() => nav('admin')}
        aria-label="Access administration panel"
      >
        ⚙️ Admin
      </button>
    {/if}
  </div>

  <!-- Mobile Menu Button -->
  <button
    class="variant-filled-secondary btn shadow-md transition-shadow hover:shadow-lg lg:hidden"
    onclick={(e) => { e.stopPropagation(); toggleMenu('mobile'); }}
    aria-label="Open navigation menu"
  >
    ≡
  </button>

  <!-- Mobile Dropdown -->
  {#if openMenu === 'mobile'}
    <div
      class="absolute top-20 left-0 right-0 z-50 bg-primary-600 shadow-xl lg:hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="flex flex-col p-4 gap-2">
        <button class="variant-filled-secondary btn w-full" onclick={() => nav('requests')}>📝 Requests</button>
        <button class="variant-filled-warning btn w-full" onclick={() => nav('offers')}>💡 Offers</button>
        <hr class="border-white/20 my-2" />
        {#each Object.values(menus).flat() as item}
          <button class="text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded" onclick={() => nav(item.route)}>
            {item.icon} {item.label}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</nav>
