<svelte:head><title>My Offers — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import ListingCard from '$lib/components/ListingCard.svelte';
  import { OFFERS, ME } from '$lib/data/mock';

  let mine = $derived(OFFERS.filter((o) => o.creator.id === ME.id));
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <div>
      <h1 class="ro-h1">My Offers</h1>
      <p class="ro-small">Manage the offers you have posted</p>
    </div>
    <button class="btn-ds btn-ds--warning btn-ds--sm" onclick={() => goto('/ui-kit/app/create-offer')}>+ New Offer</button>
  </div>

  {#if mine.length}
    <div class="ro-listings-grid">
      {#each mine as offer}
        <ListingCard
          mode="mine"
          kind="offer"
          title={offer.title}
          ownerInitial={offer.creator.name[0]}
          timeLabel="Time"
          timeframe={offer.timePreference}
          interactionType={offer.interaction}
          serviceTypes={offer.serviceTypes.join(',')}
          moE={offer.mediums.join(',')}
          ondetails={() => goto('/ui-kit/app/offer-detail')}
        />
      {/each}
    </div>
  {:else}
    <div class="ro-empty">
      <p>You have not posted any offers yet.</p>
      <button class="btn-ds btn-ds--warning" onclick={() => goto('/ui-kit/app/create-offer')}>Create your first offer</button>
    </div>
  {/if}
</div>
