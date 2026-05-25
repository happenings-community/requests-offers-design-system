<svelte:head><title>Service Types — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { SERVICE_TYPES } from '$lib/data/mock';
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <h1 class="ro-h1">Available Service Types</h1>
  </div>

  <div class="ro-st-grid">
    {#each SERVICE_TYPES as st}
      <div class="ro-st-card">
        <div class="ro-st-card-head">
          <span class="ro-st-name">{st.name}</span>
          <span class="ro-chip {st.technical ? 'ro-chip--tertiary' : 'ro-chip--surface'}">{st.technical ? 'Technical' : 'Non-Technical'}</span>
        </div>
      </div>
    {/each}
  </div>
</div>
