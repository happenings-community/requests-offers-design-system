<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';

  interface Props {
    open?: boolean;
    onclose?: () => void;
  }

  let { open = false, onclose }: Props = $props();

  type ScreenStatus = 'live' | 'upcoming';

  interface Screen {
    route: string; // relative path after /ui-kit/app/
    label: string;
    icon: string;
    desc: string;
    status: ScreenStatus;
  }

  interface Section {
    label: string;
    screens: Screen[];
  }

  const sections: Section[] = [
    {
      label: 'Browse',
      screens: [
        { route: 'requests', label: 'Requests', icon: '📝', desc: 'Browse community requests', status: 'live' },
        { route: 'offers', label: 'Offers', icon: '💡', desc: 'Browse community offers', status: 'live' },
        { route: 'members', label: 'Members', icon: '👥', desc: 'Community members', status: 'live' },
        { route: 'organizations', label: 'Organizations', icon: '🏢', desc: 'Member organizations', status: 'live' },
        { route: 'service-types', label: 'Service Types', icon: '🏷️', desc: 'Available service categories', status: 'live' },
        { route: 'mediums', label: 'Mediums', icon: '💛', desc: 'Exchange currencies', status: 'live' }
      ]
    },
    {
      label: 'My Space',
      screens: [
        { route: 'home', label: 'Dashboard', icon: '🏠', desc: 'Welcome & activity overview', status: 'live' },
        { route: 'my-requests', label: 'My Requests', icon: '📋', desc: 'Your active requests', status: 'live' },
        { route: 'my-offers', label: 'My Offers', icon: '✨', desc: 'Your active offers', status: 'live' },
        { route: 'my-profile', label: 'My Profile', icon: '👤', desc: 'Your public profile', status: 'live' },
        { route: 'my-organizations', label: 'My Orgs', icon: '🏛️', desc: 'Your organizations', status: 'live' }
      ]
    },
    {
      label: 'Create / Edit',
      screens: [
        { route: 'create-request', label: 'Create Request', icon: '✏️', desc: 'Post a new request', status: 'live' },
        { route: 'create-offer', label: 'Create Offer', icon: '✏️', desc: 'Post a new offer', status: 'live' },
        { route: 'create-organization', label: 'Create Org', icon: '✏️', desc: 'New organization', status: 'live' },
        { route: 'edit-profile', label: 'Edit Profile', icon: '✏️', desc: 'Update your profile', status: 'live' }
      ]
    },
    {
      label: 'Detail Views',
      screens: [
        { route: 'request-detail', label: 'Request Detail', icon: '🔍', desc: 'View a request', status: 'live' },
        { route: 'offer-detail', label: 'Offer Detail', icon: '🔍', desc: 'View an offer', status: 'live' },
        { route: 'member-profile', label: 'Member Profile', icon: '👤', desc: "Another member's profile", status: 'live' },
        { route: 'organization-detail', label: 'Org Detail', icon: '🏢', desc: 'Organization page', status: 'live' }
      ]
    },
    {
      label: 'Exchanges',
      screens: [
        { route: 'exchanges', label: 'My Exchanges', icon: '🤝', desc: 'Active exchanges', status: 'upcoming' },
        { route: 'exchange-detail', label: 'Exchange Detail', icon: '📊', desc: 'Exchange overview', status: 'upcoming' },
        { route: 'exchange-process', label: 'Exchange Process', icon: '⚙️', desc: 'Step-by-step flow', status: 'upcoming' }
      ]
    },
    {
      label: 'Chat',
      screens: [
        { route: 'chat', label: 'Conversations', icon: '💬', desc: 'Message threads', status: 'upcoming' },
        { route: 'chat-thread', label: 'Chat Thread', icon: '✉️', desc: 'Single conversation', status: 'upcoming' }
      ]
    },
    {
      label: 'Admin',
      screens: [
        { route: 'admin', label: 'Dashboard', icon: '⚙️', desc: 'Admin overview', status: 'live' },
        { route: 'admin/users', label: 'Users', icon: '👥', desc: 'User moderation', status: 'live' },
        { route: 'admin/organizations', label: 'Organizations', icon: '🏢', desc: 'Org moderation', status: 'live' },
        { route: 'admin/service-types', label: 'Service Types', icon: '🏷️', desc: 'Manage service types', status: 'live' },
        { route: 'admin/mediums', label: 'Mediums', icon: '💛', desc: 'Manage exchange mediums', status: 'live' }
      ]
    },
    {
      label: 'Onboarding',
      screens: [
        { route: 'connecting', label: 'Connecting', icon: '🔗', desc: 'App loading & connection', status: 'live' }
      ]
    }
  ];

  let path = $derived(page.url.pathname);

  function isActive(route: string): boolean {
    return path === '/ui-kit/app/' + route;
  }

  function open_screen(screen: Screen) {
    if (screen.status !== 'live') return;
    goto('/ui-kit/app/' + screen.route);
    onclose?.();
  }
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    role="dialog"
    aria-modal="true"
    onclick={onclose}
    onkeydown={(e) => e.key === 'Escape' && onclose?.()}
    tabindex="-1"
  >
    <div
      class="card variant-filled-surface m-4 w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6"
      role="presentation"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="h4">Screen Map</h2>
        <button class="btn btn-sm variant-ghost-surface" onclick={onclose}>✕</button>
      </div>

      <div class="flex flex-col gap-6">
        {#each sections as section}
          <div>
            <div class="mb-2 text-xs font-bold uppercase tracking-wider opacity-50">{section.label}</div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {#each section.screens as screen}
                {#if screen.status === 'upcoming'}
                  <div class="card variant-ghost p-3 text-left opacity-50 cursor-not-allowed relative">
                    <div class="text-xl mb-1">{screen.icon}</div>
                    <div class="text-sm font-semibold flex items-center gap-1">
                      {screen.label}
                      <span class="badge variant-soft-warning text-[10px] px-1 py-0">⏳</span>
                    </div>
                    <div class="text-xs opacity-60">{screen.desc}</div>
                  </div>
                {:else}
                  <button
                    class="card p-3 text-left transition-colors {isActive(screen.route)
                      ? 'variant-filled-primary'
                      : 'variant-ghost hover:variant-soft-surface'}"
                    onclick={() => open_screen(screen)}
                  >
                    <div class="text-xl mb-1">{screen.icon}</div>
                    <div class="text-sm font-semibold">{screen.label}</div>
                    <div class="text-xs opacity-60">{screen.desc}</div>
                  </button>
                {/if}
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <p class="mt-6 text-center text-xs opacity-40">Press <kbd class="kbd kbd-sm">M</kbd> to toggle</p>
    </div>
  </div>
{/if}
