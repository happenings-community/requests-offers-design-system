<script lang="ts">
  import { goto } from '$app/navigation';
  import { state } from '$lib/state.svelte';

  let name        = $state('');
  let email       = $state('');
  let location    = $state('');
  let description = $state('');
</script>

<svelte:head><title>Add Organization — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app/organizations" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:24px">Add Organization</h1>
  <form class="form-card" onsubmit={(e) => { e.preventDefault(); goto('/app/organizations'); }}>
    <p class="ds-small form-note">* required fields</p>
    <div class="field">
      <label class="field-label">Organization Name *</label>
      <input class="ds-input" bind:value={name} placeholder="Organization name"/>
    </div>
    <div class="field">
      <label class="field-label">Email *</label>
      <input type="email" class="ds-input" bind:value={email} placeholder="contact@organization.org"/>
    </div>
    <div class="field">
      <label class="field-label">Location *</label>
      <input class="ds-input" bind:value={location} placeholder="City, Country"/>
    </div>
    <div class="field">
      <label class="field-label">Description * <span class="field-hint">max 500 chars</span></label>
      <textarea class="ds-input" rows="5" bind:value={description} placeholder="Describe the organization's mission and activities" maxlength="500"></textarea>
      <div class="char-count">{description.length}/500</div>
    </div>
    <div class="form-actions">
      <a href="/app/organizations" class="btn-ghost">Cancel</a>
      <button type="submit" class="btn-ds btn-ds--primary">🏢 Add Organization</button>
    </div>
  </form>
</div>
