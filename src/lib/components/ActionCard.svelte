<script lang="ts">
  type Tone = 'primary' | 'secondary' | 'tertiary' | 'warning';

  interface Props {
    icon?: string;
    title?: string;
    description?: string;
    ctaLabel?: string;
    ctaTone?: Tone;
    onclick?: () => void;
  }

  let {
    icon = '',
    title = '',
    description = '',
    ctaLabel = '',
    ctaTone = 'secondary',
    onclick
  }: Props = $props();

  const ctaMap: Record<Tone, string> = {
    primary: 'variant-filled-primary',
    secondary: 'variant-filled-secondary',
    tertiary: 'variant-filled-tertiary',
    warning: 'variant-filled-warning'
  };
</script>

<div
  class="card variant-ghost p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-150 hover:scale-[1.01]"
  role="button"
  tabindex="0"
  {onclick}
  onkeydown={(e) => e.key === 'Enter' && onclick?.()}
>
  <div class="text-4xl mb-3">{icon}</div>
  <h3 class="h4 mb-2">{title}</h3>
  <p class="text-sm opacity-70 mb-4">{description}</p>
  {#if ctaLabel}
    <button class="btn btn-sm {ctaMap[ctaTone]}">{ctaLabel}</button>
  {/if}
</div>
