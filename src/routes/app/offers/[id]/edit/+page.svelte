<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { state } from '$lib/state.svelte';
  import { toggleArr, addLink } from '$lib/utils';
  import { TZS } from '$lib/mock';

  const off = $derived(state.offers.find(o => o.id === page.params.id));
  const MEDIUM_NAMES = $derived(state.mediums.map(m => m.name));

  let title      = $state(off?.title ?? '');
  let desc       = $state(off?.description ?? '');
  let interaction= $state(off?.interaction ?? 'Virtual');
  let timePref   = $state(off?.timePreference ?? 'No Preference');
  let tz         = $state(off?.timeZone ?? 'Europe/Paris');
  let st         = $state<string[]>(off?.serviceTypes ?? []);
  let med        = $state<string[]>(off?.mediums ?? []);
  let links      = $state<string[]>(off?.links ?? []);
  let linkIn     = $state('');
  let org        = $state(off?.org?.id ?? '');
</script>

<svelte:head><title>Edit Offer — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app/offers/{page.params.id}" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:24px">Edit Offer</h1>
  {#if off}
    <form class="form-card" onsubmit={(e) => { e.preventDefault(); goto(`/app/offers/${off.id}`); }}>
      <div class="field"><label class="field-label">Title *</label><input class="ds-input" bind:value={title}/></div>
      <div class="field"><label class="field-label">Description * <span class="field-hint">Markdown supported</span></label>
        <textarea class="ds-input" rows="5" bind:value={desc} maxlength="1000"></textarea>
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
        </div></div>
      <div class="field"><label class="field-label">Time Zone *</label>
        <select class="ds-input" bind:value={tz}>{#each TZS as t}<option value={t}>{t}</option>{/each}</select></div>
      <div class="field"><label class="field-label">Links</label>
        <div class="chip-input-row">
          <input class="ds-input" bind:value={linkIn} placeholder="Add a link"
            onkeydown={(e)=>{if(e.key==='Enter'){e.preventDefault();[links,linkIn]=addLink(links,linkIn);}}}/>
          <button type="button" class="btn-ghost" onclick={() => {[links,linkIn]=addLink(links,linkIn);}}>Add</button>
        </div>
        <div class="chip-list">
          {#each links as l,i}<span class="link-chip">{l}<button type="button" onclick={()=>links=links.filter((_,idx)=>idx!==i)}>×</button></span>{/each}
        </div></div>
      <div class="form-actions">
        <a href="/app/offers/{off.id}" class="btn-ghost">Cancel</a>
        <button type="submit" class="btn-ds btn-ds--warning">💡 Save Changes</button>
      </div>
    </form>
  {:else}
    <div class="placeholder"><p>Offer not found.</p><a href="/app/offers" class="btn-ghost">← Back</a></div>
  {/if}
</div>
