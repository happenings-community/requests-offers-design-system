<script lang="ts">
  import type { Snippet } from 'svelte';
  import Shell from '$lib/components/Shell.svelte';
  import { page } from '$app/state';
  import '$lib/data/app-shared.css';

  let { children }: { children: Snippet } = $props();
  let isAdmin = $derived(page.url.pathname.startsWith('/ui-kit/app/admin'));
</script>

<Shell {isAdmin} showAdmin={true} appName="Requests & Offers" logoSrc="/assets/hAppeningsCIClogo.png">
  {@render children()}
</Shell>
