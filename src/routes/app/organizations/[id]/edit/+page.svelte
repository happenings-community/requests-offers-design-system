<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { state } from '$lib/state.svelte';

  const org = $derived(state.orgs.find(o => o.id === page.params.id));

  let name        = $state(org?.name ?? '');
  let email       = $state(org?.email ?? '');
  let location    = $state(org?.location ?? '');
  let description = $state(org?.description ?? '');
  let status      = $state(org?.status ?? 'active');
</script>

<svelte:head><title>Edit Organization — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app/organizations/{page.params.id}" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:24px">Edit Organization</h1>
  {#if org}
    <form class="form-card" onsubmit={(e) => { e.preventDefault(); goto(`/app/organizations/${org.id}`); }}>
      <div class="field">
        <label class="field-label">Organization Name *</label>
        <input class="ds-input" bind:value={name}/>
      </div>
      <div class="field">
        <label class="field-label">Email *</label>
        <input type="email" class="ds-input" bind:value={email}/>
      </div>
      <div class="field">
        <label class="field-label">Location *</label>
        <input class="ds-input" bind:value={location}/>
      </div>
      <div class="field">
        <label class="field-label">Description * <span class="field-hint">max 500 chars</span></label>
        <textarea class="ds-input" rows="5" bind:value={description} maxlength="500"></textarea>
        <div class="char-count">{description.length}/500</div>
      </div>
      <div class="field">
        <label class="field-label">Status</label>
        <div class="radio-group">
          {#each ['active','pending','suspended'] as opt}
            <label class="radio-opt"><input type="radio" name="status" value={opt} bind:group={status}/><span class="capitalize">{opt}</span></label>
          {/each}
        </div>
      </div>
      <div class="form-actions">
        <a href="/app/organizations/{org.id}" class="btn-ghost">Cancel</a>
        <button type="submit" class="btn-ds btn-ds--primary">💾 Save Changes</button>
      </div>
    </form>
  {:else}
    <div class="placeholder"><p>Organization not found.</p><a href="/app/organizations" class="btn-ghost">← Back</a></div>
  {/if}
</div>
