<script lang="ts">
  import type { Snippet } from 'svelte';

  type Tone = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'success' | 'error' | 'surface';

  interface Props {
    tone?: Tone;
    children: Snippet;
  }

  let { tone = 'surface', children }: Props = $props();

  const toneMap: Record<Tone, string> = {
    primary: 'variant-soft-primary',
    secondary: 'variant-soft-secondary',
    tertiary: 'variant-soft-tertiary',
    warning: 'variant-soft-warning',
    success: 'variant-soft-success',
    error: 'variant-soft-error',
    surface: 'variant-soft-surface'
  };
</script>

<span class="badge {toneMap[tone]}">
  {@render children()}
</span>
