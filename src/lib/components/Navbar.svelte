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

  const dropdownGroups = ['My Activity', 'Community', 'Resources'];

  let path = $derived(page.url.pathname);
  let onRequests = $derived(path.startsWith('/ui-kit/app/requests'));
  let onOffers = $derived(path.startsWith('/ui-kit/app/offers'));
  let onAdmin = $derived(path.startsWith('/ui-kit/app/admin'));
</script>

<header class="flex items-center gap-3 px-4 py-2 bg-primary-500 text-white shadow-md">
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

  <!-- Dropdown nav groups (visual placeholders) -->
  <nav class="hidden md:flex items-center gap-1 flex-1">
    {#each dropdownGroups as group}
      <button class="btn btn-sm text-white/80 hover:text-white hover:bg-white/10 gap-1">
        {group} <span class="text-xs opacity-60">▾</span>
      </button>
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
