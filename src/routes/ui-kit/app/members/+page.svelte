<svelte:head><title>Members — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { USERS, ME } from '$lib/data/mock';

  let members = $derived(USERS.filter((u) => u.status === 'accepted'));
</script>

<div class="ro-page">
  <div class="ro-page-header">
    <h1 class="ro-h1">Members</h1>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each members as u}
      <div class="ro-listing-card" style="cursor:default">
        <div class="ro-listing-foot" style="gap:12px">
          <div class="ro-av ro-av--md">{u.name[0]}</div>
          <div>
            <div class="ro-td-name">{u.name} {#if u.id === ME.id}<span class="ro-badge-you">you</span>{/if}</div>
            <div class="ro-small">@{u.nickname}</div>
          </div>
        </div>
        <div class="ro-listing-head">
          <span class="ro-chip ro-chip--surface">{u.type}</span>
          <span class="ro-small">📍 {u.location}</span>
        </div>
        <p class="ro-listing-desc">{u.bio}</p>
        <button class="btn-ds btn-ds--ghost btn-ds--sm" style="align-self:flex-start" onclick={() => goto('/ui-kit/app/member-profile')}>View Profile</button>
      </div>
    {/each}
  </div>
</div>
