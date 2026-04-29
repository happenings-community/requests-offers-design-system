<script lang="ts">
  import { goto } from '$app/navigation';
  import { state } from '$lib/state.svelte';
  import { toggleArr, addLink } from '$lib/utils';
  import { TZS } from '$lib/mock';

  const MEDIUM_NAMES = $derived(state.mediums.map(m => m.name));

  let title=$state(''), desc=$state(''), interaction=$state('Virtual');
  let timePref=$state('No Preference'), timePrefOther=$state('');
  let tz=$state('Europe/Paris'), st=$state<string[]>([]), med=$state<string[]>([]);
  let links=$state<string[]>([]), linkIn=$state(''), org=$state(''), est=$state<number|null>(null);
</script>

<svelte:head><title>Create Offer — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app/offers" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:24px">Create Offer</h1>
  <form class="form-card" onsubmit={(e) => { e.preventDefault(); goto('/app/offers'); }}>
    <p class="ds-small form-note">* required fields</p>
    <div class="field"><label class="field-label">Title *</label><input class="ds-input" bind:value={title} placeholder="Enter offer title"/></div>
    <div class="field"><label class="field-label">Description * <span class="field-hint">Markdown supported · max 1000 chars</span></label>
      <textarea class="ds-input" rows="5" bind:value={desc} placeholder="Describe what you're offering in detail" maxlength="1000"></textarea>
      <div class="char-count">{desc.length}/1000</div></div>
    <div class="field"><label class="field-label">Service Types *</label>
      <div class="multi-chips">
        {#each state.serviceTypes as s}
          <button type="button" class="sel-chip {st.includes(s.name)?'sel-chip--on':''}" onclick={() => st = toggleArr(st, s.name)}>{s.name}</button>
        {/each}
      </div></div>
    <div class="form-card-section"><label class="field-label">Mediums of Exchange</label>
      <div class="multi-chips">
        {#each MEDIUM_NAMES as m}
          <button type="button" class="sel-chip {med.includes(m)?'sel-chip--on':''}" onclick={() => med = toggleArr(med, m)}>{m}</button>
        {/each}
      </div></div>
    <div class="form-card-section"><label class="field-label">Interaction Type *</label>
      <div class="radio-group">
        {#each ['Virtual','In Person'] as opt}
          <label class="radio-opt"><input type="radio" name="interaction" value={opt} bind:group={interaction}/><span>{opt}</span></label>
        {/each}
      </div></div>
    <div class="form-card-section"><label class="field-label">Time Preference *</label>
      <div class="radio-group">
        {#each ['Morning','Afternoon','Evening','No Preference','Other'] as opt}
          <label class="radio-opt"><input type="radio" name="timepref" value={opt} bind:group={timePref}/><span>{opt}</span></label>
        {/each}
      </div>
      {#if timePref==='Other'}<input class="ds-input" style="margin-top:8px" bind:value={timePrefOther} placeholder="Specify..."/>{/if}
    </div>
    <div class="field"><label class="field-label">Time Zone *</label>
      <select class="ds-input" bind:value={tz}>{#each TZS as t}<option value={t}>{t}</option>{/each}</select></div>
    <div class="field"><label class="field-label">Time Estimate (hours, optional)</label>
      <input type="number" class="ds-input" style="max-width:180px" bind:value={est} min="0" step="0.5" placeholder="Estimated hours"/></div>
    <div class="field"><label class="field-label">Links</label>
      <div class="chip-input-row">
        <input class="ds-input" bind:value={linkIn} placeholder="Add a link and press Enter"
          onkeydown={(e)=>{if(e.key==='Enter'){e.preventDefault();[links,linkIn]=addLink(links,linkIn);}}}/>
        <button type="button" class="btn-ghost" onclick={() => {[links,linkIn]=addLink(links,linkIn);}}>Add</button>
      </div>
      <div class="chip-list">
        {#each links as l,i}<span class="link-chip">{l}<button type="button" onclick={()=>links=links.filter((_,idx)=>idx!==i)}>×</button></span>{/each}
      </div></div>
    <div class="field"><label class="field-label">Organization (optional)</label>
      <select class="ds-input" bind:value={org}>
        <option value="">No organization</option>
        {#each state.orgs as o}<option value={o.id}>{o.name}</option>{/each}
      </select></div>
    <div class="form-actions">
      <a href="/app/offers" class="btn-ghost">Cancel</a>
      <button type="submit" class="btn-ds btn-ds--warning">💡 Create Offer</button>
    </div>
  </form>
</div>
