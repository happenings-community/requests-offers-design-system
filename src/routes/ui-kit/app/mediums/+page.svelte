<svelte:head><title>Mediums — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { MEDIUMS } from '$lib/data/mock';
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <h1 class="ro-h1">Mediums of Exchange</h1>
  </div>

  <div class="ro-st-grid">
    {#each MEDIUMS as m}
      <div class="ro-st-card">
        <div class="ro-st-card-head">
          <span class="ro-st-name">{m.name}</span>
          <span class="ro-chip ro-chip--surface">{m.code}</span>
        </div>
        <div class="ro-listing-head">
          <span class="ro-chip {m.type === 'base' ? 'ro-chip--surface' : 'ro-chip--tertiary'}">{m.type === 'base' ? '📂 Base' : '💰 Currency'}</span>
          <span class="ro-chip {m.status === 'approved' ? 'ro-chip--success' : 'ro-chip--warning'}">{m.status}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
