<svelte:head><title>Request Detail — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { REQUESTS, md } from '$lib/data/mock';

  const req = REQUESTS[0];
</script>

<div class="ro-page">
  <div class="ro-detail-nav">
    <button class="btn-ghost" onclick={() => goto('/ui-kit/app/requests')}>← Back</button>
  </div>

  <div class="ro-detail-header">
    <div class="ro-detail-header-top">
      <h1 class="ro-h1">{req.title}</h1>
      <div class="ro-detail-badges">
        <span class="ro-chip ro-chip--secondary">📝 Request</span>
        <span class="ro-chip ro-chip--tertiary">{req.interaction}</span>
        {#if req.status === 'archived'}<span class="ro-chip ro-chip--warning">Archived</span>{/if}
      </div>
    </div>
    <p class="ro-p">{@html md(req.description)}</p>
  </div>

  <div class="ro-detail-sections">
    <div class="ro-detail-section">
      <h4 class="ro-detail-section-label">Service Types</h4>
      <div class="ro-tags-row">{#each req.serviceTypes as st}<span class="ro-chip ro-chip--primary">{st}</span>{/each}</div>
    </div>
    <div class="ro-detail-section">
      <h4 class="ro-detail-section-label">Mediums of Exchange</h4>
      <div class="ro-tags-row">{#each req.mediums as m}<span class="ro-chip ro-chip--surface">{m}</span>{/each}</div>
    </div>
    <div class="ro-detail-section ro-detail-section--meta">
      <div class="ro-meta-row"><span class="ro-meta-label">Time Estimate</span><span class="ro-meta-value">{req.timeEstimate ? `${req.timeEstimate}h` : '—'}</span></div>
      <div class="ro-meta-row"><span class="ro-meta-label">Time Preference</span><span class="ro-meta-value">{req.timePreference}</span></div>
      <div class="ro-meta-row"><span class="ro-meta-label">Time Zone</span><span class="ro-meta-value">{req.timeZone}</span></div>
      <div class="ro-meta-row"><span class="ro-meta-label">Interaction</span><span class="ro-meta-value">{req.interaction}</span></div>
    </div>
    {#if req.links.length}
      <div class="ro-detail-section">
        <h4 class="ro-detail-section-label">Related Links</h4>
        {#each req.links as l}<a href={l} class="ro-link" target="_blank" rel="noopener">{l}</a>{/each}
      </div>
    {/if}
  </div>

  <div class="ro-creator-card">
    <div class="ro-av ro-av--md">{req.creator.name[0]}</div>
    <div class="ro-creator-info">
      <button class="ro-creator-name" onclick={() => goto('/ui-kit/app/member-profile')}>{req.creator.name}</button>
      <span class="ro-small">{req.creator.type} · {req.creator.location}</span>
      <p class="ro-small">{req.creator.bio}</p>
    </div>
    <button class="btn-ds btn-ds--primary btn-ds--sm">🤝 Interested?</button>
  </div>
</div>
