<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { state, ME_ID } from '$lib/state.svelte';
  import { md } from '$lib/utils';

  const off = $derived(state.offers.find(o => o.id === page.params.id));
  const me  = $derived(state.users.find(u => u.id === ME_ID)!);
</script>

<svelte:head><title>{off?.title ?? 'Offer'} — R&O</title></svelte:head>
{#if off}
  <div class="page">
    <div class="detail-nav">
      <a href="/app/offers" class="btn-ghost">← Back</a>
      {#if off.creator.id === me.id}
        <a href="/app/offers/{off.id}/edit" class="btn-ghost">Edit</a>
        <button class="btn-ghost btn-ghost--danger" onclick={() => { state.confirmModal = { message: `Delete "${off.title}"?`, onConfirm: () => goto('/app/offers') }; }}>Delete</button>
      {/if}
    </div>
    <div class="detail-header">
      <div class="detail-header-top">
        <h1 class="ds-h2">{off.title}</h1>
        <div class="detail-badges">
          <ds-chip tone="warning">💡 Offer</ds-chip>
          <ds-chip tone="tertiary">{off.interaction}</ds-chip>
          {#if off.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
        </div>
      </div>
      <p class="ds-p">{@html md(off.description)}</p>
    </div>
    <div class="detail-sections">
      <div class="detail-section">
        <h4 class="detail-section-label">Service Types</h4>
        <div class="tags-row">{#each off.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
      </div>
      <div class="detail-section">
        <h4 class="detail-section-label">Mediums of Exchange</h4>
        <div class="tags-row">{#each off.mediums as m}<ds-chip tone="surface">{m}</ds-chip>{/each}</div>
      </div>
      <div class="detail-section detail-section--meta">
        <div class="meta-row"><span class="meta-label">Time Estimate</span><span class="meta-value">{off.timeEstimate ? `${off.timeEstimate}h` : '—'}</span></div>
        <div class="meta-row"><span class="meta-label">Time Preference</span><span class="meta-value">{off.timePreference}</span></div>
        <div class="meta-row"><span class="meta-label">Time Zone</span><span class="meta-value">{off.timeZone}</span></div>
        <div class="meta-row"><span class="meta-label">Interaction</span><span class="meta-value">{off.interaction}</span></div>
      </div>
      {#if off.links.length}
        <div class="detail-section">
          <h4 class="detail-section-label">Related Links</h4>
          {#each off.links as l}<a href={l} class="ds-link" target="_blank">{l}</a>{/each}
        </div>
      {/if}
    </div>
    <div class="creator-card">
      <div class="av av--md">{off.creator.name[0]}</div>
      <div class="creator-info">
        <a href="/app/users/{off.creator.id}" class="creator-name">{off.creator.name}</a>
        <span class="ds-small">{off.creator.type} · {off.creator.location}</span>
        <p class="ds-small">{off.creator.bio}</p>
      </div>
      <button class="btn-ds btn-ds--warning btn-ds--sm" onclick={() => { state.contactModal = { user: off.creator, org: off.org, listingType: 'offer', listingTitle: off.title }; }}>🤝 Interested?</button>
    </div>
  </div>
{:else}
  <div class="page"><div class="placeholder"><p>Offer not found.</p><a href="/app/offers" class="btn-ghost">← Back</a></div></div>
{/if}
