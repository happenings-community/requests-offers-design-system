<script lang="ts">
  import { goto } from '$app/navigation';
  import { state, ME_ID } from '$lib/state.svelte';
  import { TZS } from '$lib/mock';

  const me = $derived(state.users.find(u => u.id === ME_ID)!);

  let name     = $state(me?.name ?? '');
  let nickname = $state(me?.nickname ?? '');
  let type     = $state(me?.type ?? 'creator');
  let location = $state(me?.location ?? '');
  let bio      = $state(me?.bio ?? '');
  let email    = $state(me?.email ?? '');
  let timeZone = $state(me?.timeZone ?? 'Europe/Paris');
</script>

<svelte:head><title>Edit Profile — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app/users/{ME_ID}" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:24px">Edit Profile</h1>
  {#if me}
    <form class="form-card" onsubmit={(e) => {
      e.preventDefault();
      goto(`/app/users/${ME_ID}`);
    }}>
      <div class="field">
        <label class="field-label">Full Name *</label>
        <input class="ds-input" bind:value={name}/>
      </div>
      <div class="field">
        <label class="field-label">Nickname *</label>
        <input class="ds-input" bind:value={nickname}/>
      </div>
      <div class="field">
        <label class="field-label">Email *</label>
        <input type="email" class="ds-input" bind:value={email}/>
      </div>
      <div class="field">
        <label class="field-label">Member Type *</label>
        <div class="radio-group">
          {#each ['creator','advocate','supporter'] as opt}
            <label class="radio-opt"><input type="radio" name="type" value={opt} bind:group={type}/><span class="capitalize">{opt}</span></label>
          {/each}
        </div>
      </div>
      <div class="field">
        <label class="field-label">Location *</label>
        <input class="ds-input" bind:value={location}/>
      </div>
      <div class="field">
        <label class="field-label">Bio <span class="field-hint">max 500 chars</span></label>
        <textarea class="ds-input" rows="4" bind:value={bio} maxlength="500"></textarea>
        <div class="char-count">{bio.length}/500</div>
      </div>
      <div class="field">
        <label class="field-label">Time Zone *</label>
        <select class="ds-input" bind:value={timeZone}>
          {#each TZS as t}<option value={t}>{t}</option>{/each}
        </select>
      </div>
      <div class="form-actions">
        <a href="/app/users/{ME_ID}" class="btn-ghost">Cancel</a>
        <button type="submit" class="btn-ds btn-ds--primary">💾 Save Profile</button>
      </div>
    </form>
  {:else}
    <div class="placeholder"><p>Profile not found.</p><a href="/app" class="btn-ghost">← Home</a></div>
  {/if}
</div>
