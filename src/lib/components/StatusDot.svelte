<script lang="ts">
  type Status = 'connected' | 'checking' | 'disconnected' | 'error';

  interface Props {
    status?: Status;
  }

  let { status = 'disconnected' }: Props = $props();

  const statusConfig: Record<Status, { color: string; label: string; pulse: boolean }> = {
    connected: { color: 'bg-success-400', label: 'Connected', pulse: false },
    checking: { color: 'bg-warning-400', label: 'Checking...', pulse: true },
    disconnected: { color: 'bg-surface-400', label: 'Disconnected', pulse: false },
    error: { color: 'bg-error-400', label: 'Error', pulse: false }
  };

  const config = $derived(statusConfig[status]);
</script>

<div class="flex items-center gap-1.5" title={config.label}>
  <span class="relative flex h-2.5 w-2.5">
    {#if config.pulse}
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full {config.color} opacity-75"
      ></span>
    {/if}
    <span class="relative inline-flex h-2.5 w-2.5 rounded-full {config.color}"></span>
  </span>
</div>
