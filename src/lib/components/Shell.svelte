<script lang="ts">
  import type { Snippet } from 'svelte';
  import Navbar from './Navbar.svelte';
  import ScreenMap from './ScreenMap.svelte';

  interface Props {
    appName?: string;
    logoSrc?: string;
    isAdmin?: boolean;
    showAdmin?: boolean;
    children: Snippet;
  }

  let {
    appName = 'Requests & Offers',
    logoSrc = '',
    isAdmin = false,
    showAdmin = true,
    children
  }: Props = $props();

  let mapOpen = $state(false);

  function handleKey(e: KeyboardEvent) {
    const target = e.target as HTMLElement | null;
    const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if (typing) return;
    if (e.key === 'm' || e.key === 'M') mapOpen = !mapOpen;
  }
</script>

<svelte:window onkeydown={handleKey} />

<div class="flex h-full min-h-screen flex-col bg-surface-50 text-surface-900">
  {#if !isAdmin}
    <Navbar {appName} {logoSrc} {showAdmin} />
  {/if}

  <main class="{isAdmin ? 'flex-1' : 'flex-1 p-4'}">
    {@render children()}
  </main>

  {#if isAdmin}
    <button
      class="fixed bottom-6 right-6 btn variant-filled-primary rounded-full shadow-xl"
      onclick={() => (mapOpen = true)}
      title="Screen map"
    >
      🗺️
    </button>
  {/if}

  <ScreenMap open={mapOpen} onclose={() => (mapOpen = false)} />
</div>
