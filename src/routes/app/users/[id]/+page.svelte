<script lang="ts">
  import { page } from '$app/state';
  import { state, ME_ID } from '$lib/state.svelte';

  const user = $derived(state.users.find(u => u.id === page.params.id));
  const isMe = $derived(page.params.id === ME_ID);

  const userRequests = $derived(
    user ? state.requests.filter(r => r.creator.id === user.id && r.status === 'active') : []
  );
  const userOffers = $derived(
    user ? state.offers.filter(o => o.creator.id === user.id && o.status === 'active') : []
  );
</script>

<svelte:head><title>{user?.name ?? 'Profile'} — R&O</title></svelte:head>
{#if user}
  <div class="page">
    <div class="detail-nav">
      <a href="/app/users" class="btn-ghost">← Back</a>
      {#if isMe}
        <a href="/app/user/edit" class="btn-ghost">Edit Profile</a>
      {/if}
    </div>
    <div class="profile-header">
      <div class="av av--xl">{user.name[0]}</div>
      <div class="profile-header-info">
        <h1 class="ds-h2">{user.name}</h1>
        <p class="ds-small">{user.nickname} · {user.type} · {user.location}</p>
        {#if user.timeZone}<p class="ds-small">🕐 {user.timeZone}</p>{/if}
        <div class="profile-badges">
          <ds-chip tone={user.status === 'accepted' ? 'success' : 'warning'}>{user.status}</ds-chip>
          {#if isMe}<ds-chip tone="primary">You</ds-chip>{/if}
        </div>
      </div>
    </div>
    {#if user.bio}
      <div class="profile-bio">
        <h3 class="ds-h4">About</h3>
        <p class="ds-p">{user.bio}</p>
      </div>
    {/if}
    <div class="profile-stats">
      <div class="stat-card">
        <span class="stat-value">{userRequests.length}</span>
        <span class="stat-label">Active Requests</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{userOffers.length}</span>
        <span class="stat-label">Active Offers</span>
      </div>
    </div>
    {#if userRequests.length}
      <div class="profile-section">
        <h3 class="ds-h4">Active Requests</h3>
        <div class="listings-grid">
          {#each userRequests as req}
            <a href="/app/requests/{req.id}" class="listing-card">
              <div class="listing-head">
                <ds-chip tone="secondary">📝 Request</ds-chip>
                <span class="listing-meta">{req.interaction}</span>
              </div>
              <h3 class="listing-title">{req.title}</h3>
              <p class="listing-desc">{req.description}</p>
              <div class="listing-tags">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
    {#if userOffers.length}
      <div class="profile-section">
        <h3 class="ds-h4">Active Offers</h3>
        <div class="listings-grid">
          {#each userOffers as off}
            <a href="/app/offers/{off.id}" class="listing-card">
              <div class="listing-head">
                <ds-chip tone="warning">💡 Offer</ds-chip>
                <span class="listing-meta">{off.interaction}</span>
              </div>
              <h3 class="listing-title">{off.title}</h3>
              <p class="listing-desc">{off.description}</p>
              <div class="listing-tags">{#each off.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
    {#if !userRequests.length && !userOffers.length}
      <div class="empty">
        <p>No active listings from this member.</p>
      </div>
    {/if}
  </div>
{:else}
  <div class="page"><div class="placeholder"><p>User not found.</p><a href="/app/users" class="btn-ghost">← Back</a></div></div>
{/if}
