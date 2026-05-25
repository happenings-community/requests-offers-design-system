<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'ghost' | 'soft' | 'on-violet';
  type Size = 'md' | 'sm';

  interface Props {
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    icon?: Snippet;
    children: Snippet;
    onclick?: () => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    icon,
    children,
    onclick
  }: Props = $props();

  const variantMap: Record<Variant, string> = {
    primary: 'variant-filled-primary',
    secondary: 'variant-filled-secondary',
    tertiary: 'variant-filled-tertiary',
    warning: 'variant-filled-warning',
    error: 'variant-filled-error',
    ghost: 'variant-ghost',
    soft: 'variant-soft-surface',
    'on-violet': '!bg-white/10 !text-white border border-white/25 hover:!bg-white/20'
  };
</script>

<button
  {type}
  class="btn {size === 'sm' ? 'btn-sm' : ''} {variantMap[variant]}"
  {disabled}
  {onclick}
>
  {#if icon}{@render icon()}{/if}
  {@render children()}
</button>
