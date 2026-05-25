<svelte:head><title>Organizations — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { ORGS } from '$lib/data/mock';
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <h1 class="ro-h1">Organizations</h1>
    <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => goto('/ui-kit/app/create-organization')}>+ Create Organization</button>
  </div>

  <div class="ro-listings-grid">
    {#each ORGS as org}
      <button class="ro-listing-card" onclick={() => goto('/ui-kit/app/organization-detail')}>
        <div class="ro-org-logo">{org.name[0]}</div>
        <h3 class="ro-listing-title">{org.name}</h3>
        <p class="ro-listing-desc">{org.description}</p>
        <div class="ro-listing-foot">
          <span class="ro-small">👥 {org.members} members</span>
          <span class="ro-listing-meta">📍 {org.location}</span>
        </div>
        <span class="btn-ds btn-ds--ghost btn-ds--sm" style="align-self:flex-start">View</span>
      </button>
    {/each}
  </div>
</div>
