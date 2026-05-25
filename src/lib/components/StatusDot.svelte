<script lang="ts">
  type Status = 'connected' | 'checking' | 'disconnected' | 'error';

  interface Props {
    status?: Status;
    showLabel?: boolean;
  }

  let { status = 'disconnected', showLabel = false }: Props = $props();

  const statusConfig: Record<Status, { color: string; label: string; pulse: boolean; icon: string }> = {
    connected:    { color: 'bg-success-400',  label: 'Connected',    pulse: false, icon: '🟢' },
    checking:     { color: 'bg-warning-400',  label: 'Checking...', pulse: true,  icon: '🟡' },
    disconnected: { color: 'bg-surface-400',  label: 'Disconnected', pulse: false, icon: '🟠' },
    error:        { color: 'bg-error-400',    label: 'Error',        pulse: false, icon: '🔴' }
  };

  const config = $derived(statusConfig[status]);
</script>

<div class="flex items-center gap-1.5" title={config.label}>
  <span class="relative flex h-2.5 w-2.5">
    {#if config.pulse}
      <span class="absolute inline-flex h-full w-full animate-ping rounded-full {config.color} opacity-75"></span>
    {/if}
    <span class="relative inline-flex h-2.5 w-2.5 rounded-full {config.color}"></span>
  </span>
  {#if showLabel}
    <span class="text-sm text-white/90">{config.label}</span>
  {/if}
</div>
