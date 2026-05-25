<svelte:head><title>My Requests — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import ListingCard from '$lib/components/ListingCard.svelte';
  import { REQUESTS, ME } from '$lib/data/mock';

  let mine = $derived(REQUESTS.filter((r) => r.creator.id === ME.id));
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <div>
      <h1 class="ro-h1">My Requests</h1>
      <p class="ro-small">Manage the requests you have posted</p>
    </div>
    <button class="btn-ds btn-ds--primary btn-ds--sm" onclick={() => goto('/ui-kit/app/create-request')}>+ New Request</button>
  </div>

  {#if mine.length}
    <div class="ro-listings-grid">
      {#each mine as req}
        <ListingCard
          mode="mine"
          kind="request"
          title={req.title}
          ownerInitial={req.creator.name[0]}
          timeLabel="Time"
          timeframe={req.timePreference}
          interactionType={req.interaction}
          serviceTypes={req.serviceTypes.join(',')}
          moE={req.mediums.join(',')}
          ondetails={() => goto('/ui-kit/app/request-detail')}
        />
      {/each}
    </div>
  {:else}
    <div class="ro-empty">
      <p>You have not posted any requests yet.</p>
      <button class="btn-ds btn-ds--primary" onclick={() => goto('/ui-kit/app/create-request')}>Create your first request</button>
    </div>
  {/if}
</div>
