<script lang="ts">
  type Kind = 'request' | 'offer';
  type Mode = 'browse' | 'mine';

  interface Props {
    kind?: Kind;
    mode?: Mode;
    title?: string;
    owner?: string;
    ownerInitial?: string;
    time?: string;
    description?: string;
    tags?: string;
    // mine-mode metadata
    timeframe?: string;
    timeLabel?: string;
    interactionType?: string;
    serviceTypes?: string;
    moE?: string;
    ondetails?: () => void;
    onarchive?: () => void;
    ondelete?: () => void;
  }

  let {
    kind = 'request',
    mode = 'browse',
    title = '',
    owner = '',
    ownerInitial = '?',
    time = '',
    description = '',
    tags = '',
    timeframe = '',
    timeLabel = 'Timeframe',
    interactionType = '',
    serviceTypes = '',
    moE = '',
    ondetails,
    onarchive,
    ondelete
  }: Props = $props();

  const tagList = $derived(tags ? tags.split(',').map((t) => t.trim()) : []);
  const serviceTypeList = $derived(serviceTypes ? serviceTypes.split(',').map((t) => t.trim()) : []);
  const moEList = $derived(moE ? moE.split(',').map((t) => t.trim()) : []);
  const kindClass = $derived(kind === 'request' ? 'variant-soft-secondary' : 'variant-soft-warning');
  const kindLabel = $derived(kind === 'request' ? '📝 Request' : '💡 Offer');
</script>

{#if mode === 'mine'}
  <div class="card bg-white border border-surface-200 shadow-sm p-4 space-y-3">
    <!-- Header row: avatar + metadata -->
    <div class="flex items-start gap-3">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-200 text-surface-500 text-sm font-bold">
        {ownerInitial}
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm text-surface-900">{title}</div>
        {#if timeframe}
          <div class="text-xs text-warning-600 mt-0.5">{timeLabel}: {timeframe}</div>
        {/if}
        {#if interactionType}
          <div class="mt-1">
            <span class="badge badge-sm variant-soft-primary">{interactionType}</span>
          </div>
        {/if}
      </div>
    </div>

    <!-- Service types -->
    {#if serviceTypeList.length > 0}
      <div class="space-y-1">
        <div class="text-xs font-medium text-surface-600">Service Types:</div>
        <div class="flex flex-wrap gap-1">
          {#each serviceTypeList as st}
            <span class="badge badge-sm variant-soft-primary">{st}</span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Mediums of exchange -->
    {#if moEList.length > 0}
      <div class="space-y-1">
        <div class="text-xs font-medium text-surface-600">Mediums of Exchange:</div>
        <div class="flex flex-wrap gap-1">
          {#each moEList as m}
            <span class="badge badge-sm variant-soft-secondary">💛 {m}</span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Action buttons -->
    <div class="flex items-center gap-2 pt-1">
      <button class="btn btn-sm variant-filled-primary" onclick={ondetails}>📝 Details</button>
      <button class="btn btn-sm variant-filled-warning" onclick={onarchive}>📦 Archive</button>
      <button class="btn btn-sm variant-ghost border border-error-300 text-error-600 hover:variant-soft-error" onclick={ondelete}>🗑️ Delete</button>
    </div>
  </div>
{:else}
  <!-- Browse mode (original layout) -->
  <div class="card variant-ghost p-4 space-y-3">
    <div class="flex items-start justify-between">
      <span class="badge {kindClass}">{kindLabel}</span>
      <span class="text-xs opacity-50">{time}</span>
    </div>

    <h3 class="h5">{title}</h3>

    <p class="text-sm opacity-70 line-clamp-2">{description}</p>

    {#if tagList.length > 0}
      <div class="flex flex-wrap gap-1.5">
        {#each tagList as tag}
          <span class="badge badge-sm variant-soft-surface">{tag}</span>
        {/each}
      </div>
    {/if}

    <div class="flex items-center gap-2 pt-1">
      <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
        {ownerInitial}
      </div>
      <span class="text-sm opacity-60">{owner}</span>
    </div>
  </div>
{/if}
