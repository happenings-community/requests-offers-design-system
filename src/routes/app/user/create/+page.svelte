<script lang="ts">
  import { goto } from '$app/navigation';
  import { state } from '$lib/state.svelte';
  import { TZS } from '$lib/mock';

  let name      = $state('');
  let nickname  = $state('');
  let type      = $state('creator');
  let location  = $state('');
  let bio       = $state('');
  let email     = $state('');
  let timeZone  = $state('Europe/Paris');
</script>

<svelte:head><title>Create Profile — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:24px">Create Your Profile</h1>
  <form class="form-card" onsubmit={(e) => {
    e.preventDefault();
    state.hasProfile = true;
    goto('/app');
  }}>
    <p class="ds-small form-note">* required fields</p>
    <div class="field">
      <label class="field-label">Full Name *</label>
      <input class="ds-input" bind:value={name} placeholder="Your full name"/>
    </div>
    <div class="field">
      <label class="field-label">Nickname *</label>
      <input class="ds-input" bind:value={nickname} placeholder="@username"/>
    </div>
    <div class="field">
      <label class="field-label">Email *</label>
      <input type="email" class="ds-input" bind:value={email} placeholder="your@email.com"/>
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
      <input class="ds-input" bind:value={location} placeholder="City, Country"/>
    </div>
    <div class="field">
      <label class="field-label">Bio <span class="field-hint">Tell the community about yourself · max 500 chars</span></label>
      <textarea class="ds-input" rows="4" bind:value={bio} placeholder="Share a bit about yourself and your skills" maxlength="500"></textarea>
      <div class="char-count">{bio.length}/500</div>
    </div>
    <div class="field">
      <label class="field-label">Time Zone *</label>
      <select class="ds-input" bind:value={timeZone}>
        {#each TZS as t}<option value={t}>{t}</option>{/each}
      </select>
    </div>
    <div class="form-actions">
      <a href="/app" class="btn-ghost">Cancel</a>
      <button type="submit" class="btn-ds btn-ds--primary">👤 Create Profile</button>
    </div>
  </form>
</div>
