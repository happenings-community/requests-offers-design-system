<script lang="ts">
  import { page } from '$app/state';
  import { state } from '$lib/state.svelte';

  let orgTab = $state<'members'|'coordinators'|'requests'|'offers'>('requests');

  const org = $derived(state.orgs.find(o => o.id === page.params.id));

  const orgRequests = $derived(
    org ? state.requests.filter(r => r.org?.id === org.id) : []
  );
  const orgOffers = $derived(
    org ? state.offers.filter(o => o.org?.id === org.id) : []
  );
  const orgMembers = $derived(
    org ? state.users.filter(u => u.status === 'accepted') : []
  );
</script>

<svelte:head><title>{org?.name ?? 'Organization'} — R&O</title></svelte:head>
{#if org}
  <div class="page">
    <div class="detail-nav">
      <a href="/app/organizations" class="btn-ghost">← Back</a>
      <a href="/app/organizations/{org.id}/edit" class="btn-ghost">Edit</a>
    </div>
    <div class="org-detail-header">
      <div class="av av--xl org-av">{org.name[0]}</div>
      <div class="org-detail-info">
        <h1 class="ds-h2">{org.name}</h1>
        <p class="ds-small">{org.location} · ✉️ {org.email}</p>
        <ds-chip tone={org.status === 'active' ? 'success' : org.status === 'pending' ? 'warning' : 'danger'}>{org.status}</ds-chip>
      </div>
    </div>
    <div class="org-about">
      <p class="ds-p">{org.description}</p>
    </div>
    <div class="tab-group" style="margin-top:24px">
      <button class="tab {orgTab==='requests'?'tab--secondary':''}" onclick={() => orgTab='requests'}>
        📋 Requests <span class="tab-count">{orgRequests.length}</span>
      </button>
      <button class="tab {orgTab==='offers'?'tab--warning':''}" onclick={() => orgTab='offers'}>
        💡 Offers <span class="tab-count">{orgOffers.length}</span>
      </button>
      <button class="tab {orgTab==='members'?'tab--primary':''}" onclick={() => orgTab='members'}>
        👥 Members <span class="tab-count">{orgMembers.length}</span>
      </button>
      <button class="tab {orgTab==='coordinators'?'tab--tertiary':''}" onclick={() => orgTab='coordinators'}>
        ⭐ Coordinators
      </button>
    </div>

    {#if orgTab === 'requests'}
      {#if orgRequests.length}
        <div class="listings-grid">
          {#each orgRequests as req}
            <a href="/app/requests/{req.id}" class="listing-card">
              <div class="listing-head">
                <ds-chip tone="secondary">📝 Request</ds-chip>
                {#if req.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
                <span class="listing-meta">{req.interaction}</span>
              </div>
              <h3 class="listing-title">{req.title}</h3>
              <p class="listing-desc">{req.description}</p>
              <div class="listing-tags">{#each req.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
              <div class="listing-foot">
                <div class="av av--xs">{req.creator.name[0]}</div>
                <span class="listing-creator">{req.creator.name}</span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="empty"><p>No requests from this organization.</p></div>
      {/if}

    {:else if orgTab === 'offers'}
      {#if orgOffers.length}
        <div class="listings-grid">
          {#each orgOffers as off}
            <a href="/app/offers/{off.id}" class="listing-card">
              <div class="listing-head">
                <ds-chip tone="warning">💡 Offer</ds-chip>
                {#if off.status==='archived'}<ds-chip tone="warning">Archived</ds-chip>{/if}
                <span class="listing-meta">{off.interaction}</span>
              </div>
              <h3 class="listing-title">{off.title}</h3>
              <p class="listing-desc">{off.description}</p>
              <div class="listing-tags">{#each off.serviceTypes as st}<ds-chip tone="primary">{st}</ds-chip>{/each}</div>
              <div class="listing-foot">
                <div class="av av--xs">{off.creator.name[0]}</div>
                <span class="listing-creator">{off.creator.name}</span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <div class="empty"><p>No offers from this organization.</p></div>
      {/if}

    {:else if orgTab === 'members'}
      <div class="members-grid">
        {#each orgMembers as u}
          <a href="/app/users/{u.id}" class="member-card">
            <div class="av av--md">{u.name[0]}</div>
            <div class="member-info">
              <span class="member-name">{u.name}</span>
              <span class="ds-small">{u.type} · {u.location}</span>
            </div>
          </a>
        {/each}
      </div>

    {:else if orgTab === 'coordinators'}
      <div class="empty">
        <p>No coordinators assigned yet.</p>
      </div>
    {/if}
  </div>
{:else}
  <div class="page"><div class="placeholder"><p>Organization not found.</p><a href="/app/organizations" class="btn-ghost">← Back</a></div></div>
{/if}
