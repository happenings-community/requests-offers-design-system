<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { state, ME_ID } from '$lib/state.svelte';
  import { md } from '$lib/utils';

  const req = $derived(state.requests.find(r => r.id === page.params.id));
  const me  = $derived(state.users.find(u => u.id === ME_ID)!);
</script>

<svelte:head><title>{req?.title ?? 'Request'} — R&O</title></svelte:head>
{#if req}
  <div class="page">
    <div class="detail-nav">
      <a href="/app/requests" class="btn-ghost">← Back</a>
      {#if req.creator.id === me.id}
        <a href="/app/requests/{req.id}/edit" class="btn-ghost">Edit</a>
        <button class="btn-ghost btn-ghost--danger" onclick={() => { state.confirmModal = { message: `Delete "${req.title}"?`, onConfirm: () => goto('/app/requests') }; }}>Delete</button>
      {/if}
    </div>
    <div class="detail-header">
      <div class="detail-header-top">
        <h1 class="ds-h2">{req.title}</h1>
        <div class="detail-badges">
          <ds-chip tone="secondary">📝 Request</ds-chip>
          <ds-chip tone="tertiary">{req.interaction}</ds-chip>
          {#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
        </div>
      </div>
      <p class="ds-p">{@html md(req.description)}</p>
    </div>
    <div class="detail-sections">
      <div class="detail-section">
        <h4 class="detail-section-label">Service Types</h4>
        <div class="tags-row">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
      </div>
      <div class="detail-section">
        <h4 class="detail-section-label">Mediums of Exchange</h4>
        <div class="tags-row">{#each req.mediums as m}<ds-chip tone="surface">{m}</ds-chip>{/each}</div>
      </div>
      <div class="detail-section detail-section--meta">
        <div class="meta-row"><span class="meta-label">Time Estimate</span><span class="meta-value">{req.timeEstimate ? `${req.timeEstimate}h` : '—'}</span></div>
        <div class="meta-row"><span class="meta-label">Time Preference</span><span class="meta-value">{req.timePreference}</span></div>
        <div class="meta-row"><span class="meta-label">Time Zone</span><span class="meta-value">{req.timeZone}</span></div>
        <div class="meta-row"><span class="meta-label">Interaction</span><span class="meta-value">{req.interaction}</span></div>
      </div>
      {#if req.links.length}
        <div class="detail-section">
          <h4 class="detail-section-label">Related Links</h4>
          {#each req.links as l}<a href={l} class="ds-link" target="_blank">{l}</a>{/each}
        </div>
      {/if}
    </div>
    <div class="creator-card">
      <div class="av av--md">{req.creator.name[0]}</div>
      <div class="creator-info">
        <a href="/app/users/{req.creator.id}" class="creator-name">{req.creator.name}</a>
        <span class="ds-small">{req.creator.type} · {req.creator.location}</span>
        <p class="ds-small">{req.creator.bio}</p>
      </div>
      <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => { state.contactModal = { user: req.creator, org: req.org, listingType: 'request', listingTitle: req.title }; }}>🤝 Interested?</button>
    </div>
  </div>
{:else}
  <div class="page"><div class="placeholder"><p>Request not found.</p><a href="/app/requests" class="btn-ghost">← Back</a></div></div>
{/if}
