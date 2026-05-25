<svelte:head><title>Create Offer — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { SERVICE_TYPES, MEDIUM_NAMES, TZS, ORGS, toggleArr, addLink } from '$lib/data/mock';

  let title = $state('');
  let desc = $state('');
  let interaction = $state('Virtual');
  let timePref = $state('No Preference');
  let timePrefOther = $state('');
  let tz = $state('Europe/Paris');
  let st = $state<string[]>([]);
  let med = $state<string[]>([]);
  let links = $state<string[]>([]);
  let linkIn = $state('');
  let org = $state('');
</script>

<div class="ro-page">
  <div class="ro-detail-nav"><button class="btn-ghost" onclick={() => goto('/ui-kit/app/offers')}>← Back</button></div>
  <h1 class="ro-h1" style="margin-bottom:24px">Create Offer</h1>
  <form class="ro-form-card" onsubmit={(e) => e.preventDefault()}>
    <p class="ro-form-note">* required fields</p>

    <div class="ro-field"><label class="ro-field-label">Title *</label>
      <input class="ro-input" bind:value={title} placeholder="What are you offering?" /></div>

    <div class="ro-field"><label class="ro-field-label">Description * <span class="ro-field-hint">Markdown supported · max 1000 chars</span></label>
      <textarea class="ro-input" rows="5" bind:value={desc} placeholder="Describe your offer in detail (Markdown supported)" maxlength="1000"></textarea>
      <div class="ro-char-count">{desc.length}/1000</div></div>

    <div class="ro-field"><label class="ro-field-label">Service Types *</label>
      <div class="ro-multi-chips">
        {#each SERVICE_TYPES as svc}
          <button type="button" class="ro-sel-chip {st.includes(svc.name) ? 'ro-sel-chip--on' : ''}" onclick={() => (st = toggleArr(st, svc.name))}>{svc.name}</button>
        {/each}
      </div></div>

    <div class="ro-form-section"><label class="ro-field-label">Mediums of Exchange</label>
      <div class="ro-multi-chips">
        {#each MEDIUM_NAMES as m}
          <button type="button" class="ro-sel-chip {med.includes(m) ? 'ro-sel-chip--on' : ''}" onclick={() => (med = toggleArr(med, m))}>{m}</button>
        {/each}
      </div>
      <p class="ro-small" style="margin-top:8px"><button type="button" class="btn-ghost btn-ghost--sm">💡 Suggest New Medium</button></p>
    </div>

    <div class="ro-form-section"><label class="ro-field-label">Interaction Type *</label>
      <div class="ro-radio-group">{#each ['Virtual', 'In Person'] as opt}<label class="ro-radio-opt"><input type="radio" name="o-interaction" value={opt} bind:group={interaction} /><span>{opt}</span></label>{/each}</div></div>

    <div class="ro-form-section"><label class="ro-field-label">Time Preference *</label>
      <div class="ro-radio-group">
        {#each ['Morning', 'Afternoon', 'Evening', 'No Preference', 'Other'] as opt}
          <label class="ro-radio-opt"><input type="radio" name="o-timepref" value={opt} bind:group={timePref} /><span>{opt}</span></label>
        {/each}
      </div>
      {#if timePref === 'Other'}<input class="ro-input" style="margin-top:8px" bind:value={timePrefOther} placeholder="e.g., Weekends only, Late night, etc." />{/if}
    </div>

    <div class="ro-field"><label class="ro-field-label">Time Zone *</label>
      <select class="ro-input" bind:value={tz}>{#each TZS as t}<option value={t}>{t}</option>{/each}</select></div>

    <div class="ro-field"><label class="ro-field-label">Links</label>
      <div class="ro-chip-input-row">
        <input class="ro-input" bind:value={linkIn} placeholder="Add links (press Enter to add)"
          onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); [links, linkIn] = addLink(links, linkIn); } }} />
        <button type="button" class="btn-ghost" onclick={() => { [links, linkIn] = addLink(links, linkIn); }}>Add</button>
      </div>
      <div class="ro-chip-list">
        {#each links as l, i}<span class="ro-link-chip">{l}<button type="button" onclick={() => (links = links.filter((_, idx) => idx !== i))}>×</button></span>{/each}
      </div></div>

    <div class="ro-field"><label class="ro-field-label">Organization (optional)</label>
      <select class="ro-input" bind:value={org}><option value="">No organization</option>{#each ORGS as o}<option value={o.id}>{o.name}</option>{/each}</select></div>

    <div class="ro-form-actions">
      <button type="button" class="btn-ghost" onclick={() => goto('/ui-kit/app/offers')}>Cancel</button>
      <button type="button" class="btn-ds btn-ds--warning" onclick={() => goto('/ui-kit/app/offers')}>💡 Create Offer</button>
    </div>
  </form>
</div>
