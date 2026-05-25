<svelte:head><title>My Profile — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { ME, REQUESTS, OFFERS, ORGS, md } from '$lib/data/mock';

  let tabSet = $state(0);
  let requestsTab = $state<'active' | 'archived'>('active');
  let offersTab = $state<'active' | 'archived'>('active');

  const myOrgs = ORGS; // ME is coordinator of hAppenings CIC and member of Open Tech Coop

  const myRequests = $derived(
    requestsTab === 'active'
      ? REQUESTS.filter((r) => r.creator.id === ME.id && r.status === 'active')
      : REQUESTS.filter((r) => r.creator.id === ME.id && r.status === 'archived')
  );
  const myOffers = $derived(
    offersTab === 'active'
      ? OFFERS.filter((o) => o.creator.id === ME.id && o.status === 'active')
      : OFFERS.filter((o) => o.creator.id === ME.id && o.status === 'archived')
  );
</script>

<section class="flex flex-col items-center px-4 sm:px-6">
  <!-- Title row -->
  <div class="mb-6 flex w-full max-w-4xl items-center justify-between">
    <h1 class="h1">
      Welcome <span class="font-bold text-primary-500">{ME.name}</span>!
    </h1>
    <button
      class="variant-filled-primary btn"
      onclick={() => goto('/ui-kit/app/edit-profile')}
    >
      Edit Profile
    </button>
  </div>

  <!-- Main profile card -->
  <div class="card w-full max-w-4xl p-4 md:p-6">
    <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <!-- Avatar -->
      <div class="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary-200 text-4xl font-bold text-primary-800">
        {ME.name[0]}
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <h2 class="h2">{ME.nickname}</h2>
        </div>
        <div class="mt-4 text-lg opacity-80">{@html md(ME.bio)}</div>
        <!-- Status -->
        <div class="mt-4 flex flex-col gap-2">
          <h3 class="h3 text-wrap">
            <b>Status:</b>
            <span class="text-green-400"> {ME.status}</span>
          </h3>
          <button class="variant-filled-secondary btn w-fit btn-sm">
            Status History
          </button>
        </div>
      </div>
    </header>

    <!-- Details grid -->
    <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div class="card p-4">
        <h3 class="h3 mb-2">Contact</h3>
        <p><strong>Type:</strong> {ME.type}</p>
        <p><strong>Email:</strong> {ME.email}</p>
      </div>
      <div class="card p-4">
        <h3 class="h3 mb-2">Location</h3>
        {#if ME.timeZone}<p><strong>Timezone:</strong> {ME.timeZone}</p>{/if}
        {#if ME.location}<p><strong>Location:</strong> {ME.location}</p>{/if}
      </div>
    </div>
  </div>

  <!-- Tabs card -->
  <div class="card mt-6 w-full max-w-4xl p-4 md:p-6">
    <!-- Tab buttons -->
    <div class="bg-surface-100-800-token/90 mb-4 flex justify-center gap-2 rounded-container-token p-2">
      <button
        class="btn btn-sm {tabSet === 0 ? 'bg-primary-500 text-white' : 'variant-ghost'}"
        onclick={() => (tabSet = 0)}
      >
        Organizations
      </button>
      <button
        class="btn btn-sm {tabSet === 1 ? 'bg-primary-500 text-white' : 'variant-ghost'}"
        onclick={() => (tabSet = 1)}
      >
        My Requests
      </button>
      <button
        class="btn btn-sm {tabSet === 2 ? 'bg-primary-500 text-white' : 'variant-ghost'}"
        onclick={() => (tabSet = 2)}
      >
        My Offers
      </button>
    </div>

    <!-- Tab panels -->
    {#if tabSet === 0}
      <!-- Organizations -->
      <div class="bg-surface-100-800-token/90 card rounded-container-token p-4 backdrop-blur-lg">
        {#if myOrgs.length > 0}
          <h4 class="h4 mb-4">My Coordinated Organizations</h4>
          <div class="space-y-3">
            {#each myOrgs as org}
              <button
                class="w-full text-left rounded-lg border border-surface-200 bg-white p-4 hover:border-primary-300 hover:shadow-sm transition-all"
                onclick={() => goto('/ui-kit/app/organization-detail')}
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-200 font-bold text-primary-800">
                    {org.name[0]}
                  </div>
                  <div>
                    <div class="font-semibold text-primary-700">{org.name}</div>
                    <div class="text-sm text-surface-500">{org.location} · {org.members} members</div>
                  </div>
                </div>
              </button>
            {/each}
          </div>
        {:else}
          <div class="flex flex-col items-center justify-center p-8">
            <p class="mb-4 text-center text-lg">You are not a member of any organizations yet.</p>
            <button class="variant-filled-primary btn" onclick={() => goto('/ui-kit/app/organizations')}>
              Browse Organizations
            </button>
          </div>
        {/if}
      </div>

    {:else if tabSet === 1}
      <!-- Requests -->
      <div class="bg-surface-100-800-token/90 card rounded-container-token p-4 backdrop-blur-lg">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex gap-2">
            <button
              class="btn btn-sm {requestsTab === 'active' ? 'variant-filled-primary' : 'variant-ghost-primary'}"
              onclick={() => (requestsTab = 'active')}
            >
              📋 Active
            </button>
            <button
              class="btn btn-sm {requestsTab === 'archived' ? 'variant-filled-warning' : 'variant-ghost-warning'}"
              onclick={() => (requestsTab = 'archived')}
            >
              📦 Archived
            </button>
          </div>
          <div class="flex items-center gap-3">
            <h3 class="h3">My Requests</h3>
            <button class="variant-filled-primary btn btn-sm" onclick={() => goto('/ui-kit/app/create-request')}>
              Create New Request
            </button>
          </div>
        </div>

        {#if myRequests.length === 0}
          <div class="flex flex-col items-center justify-center p-8">
            <p class="mb-4 text-center text-lg">
              {requestsTab === 'active'
                ? "You haven't created any active requests yet."
                : "You haven't created any archived requests yet."}
            </p>
          </div>
        {:else}
          <div class="flex flex-col gap-3">
            {#each myRequests as req}
              <div class="card variant-ghost-surface p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 space-y-2">
                    <h3 class="h5 font-semibold">{req.title}</h3>
                    <p class="line-clamp-2 text-sm text-surface-500">{req.description}</p>
                    <div class="flex flex-wrap gap-1">
                      {#each req.serviceTypes as st}
                        <span class="variant-soft-primary badge text-xs">{st}</span>
                      {/each}
                    </div>
                  </div>
                  <button
                    class="variant-filled-secondary btn btn-sm shrink-0"
                    onclick={() => goto('/ui-kit/app/request-detail')}
                  >
                    Details
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

    {:else if tabSet === 2}
      <!-- Offers -->
      <div class="bg-surface-100-800-token/90 card rounded-container-token p-4 backdrop-blur-lg">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex gap-2">
            <button
              class="btn btn-sm {offersTab === 'active' ? 'variant-filled-primary' : 'variant-ghost-primary'}"
              onclick={() => (offersTab = 'active')}
            >
              📋 Active
            </button>
            <button
              class="btn btn-sm {offersTab === 'archived' ? 'variant-filled-warning' : 'variant-ghost-warning'}"
              onclick={() => (offersTab = 'archived')}
            >
              📦 Archived
            </button>
          </div>
          <div class="flex items-center gap-3">
            <h3 class="h3">My Offers</h3>
            <button class="variant-filled-primary btn btn-sm" onclick={() => goto('/ui-kit/app/create-offer')}>
              Create New Offer
            </button>
          </div>
        </div>

        {#if myOffers.length === 0}
          <div class="flex flex-col items-center justify-center p-8">
            <p class="mb-4 text-center text-lg">
              {offersTab === 'active'
                ? "You haven't created any active offers yet."
                : "You haven't created any archived offers yet."}
            </p>
          </div>
        {:else}
          <div class="flex flex-col gap-3">
            {#each myOffers as offer}
              <div class="card variant-ghost-surface p-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1 space-y-2">
                    <h3 class="h5 font-semibold">{offer.title}</h3>
                    <p class="line-clamp-2 text-sm text-surface-500">{offer.description}</p>
                    <div class="flex flex-wrap gap-1">
                      {#each offer.serviceTypes as st}
                        <span class="variant-soft-primary badge text-xs">{st}</span>
                      {/each}
                    </div>
                  </div>
                  <button
                    class="variant-filled-secondary btn btn-sm shrink-0"
                    onclick={() => goto('/ui-kit/app/offer-detail')}
                  >
                    Details
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</section>
