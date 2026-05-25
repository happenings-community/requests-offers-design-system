<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label?: string;
    hint?: string;
    error?: string;
    children: Snippet;
  }

  let { label, hint, error, children }: Props = $props();
</script>

<label class="label mb-4 block">
  {#if label}
    <span class="block text-sm font-medium mb-1">{label}</span>
  {/if}
  {@render children()}
  {#if error}
    <span class="block mt-1 text-xs text-error-500">{error}</span>
  {:else if hint}
    <span class="block mt-1 text-xs opacity-50">{hint}</span>
  {/if}
</label>
