<script lang="ts">
  import { goto } from '$app/navigation';

  let name           = $state('');
  let description    = $state('');
  let classification = $state<'technical'|'non-technical'>('non-technical');
  let rationale      = $state('');
</script>

<svelte:head><title>Suggest Service Type — R&O</title></svelte:head>
<div class="page">
  <div class="detail-nav"><a href="/app/service-types" class="btn-ghost">← Back</a></div>
  <h1 class="ds-h2" style="margin-bottom:8px">Suggest a Service Type</h1>
  <p class="ds-p" style="color:rgb(var(--fg-2));margin-bottom:24px">Help expand the community's vocabulary for exchange. Suggestions are reviewed by coordinators before being added.</p>
  <form class="form-card" onsubmit={(e) => { e.preventDefault(); goto('/app/service-types'); }}>
    <p class="ds-small form-note">* required fields</p>
    <div class="field">
      <label class="field-label">Service Type Name *</label>
      <input class="ds-input" bind:value={name} placeholder="e.g. Graphic Design, Childcare, Legal Translation"/>
    </div>
    <div class="field">
      <label class="field-label">Description * <span class="field-hint">What does this service type cover? · max 300 chars</span></label>
      <textarea class="ds-input" rows="4" bind:value={description} placeholder="Describe the kinds of services this category encompasses" maxlength="300"></textarea>
      <div class="char-count">{description.length}/300</div>
    </div>
    <div class="field">
      <label class="field-label">Classification *</label>
      <div class="radio-group">
        <label class="radio-opt">
          <input type="radio" name="classification" value="technical" bind:group={classification}/>
          <span>Technical — requires specific tools, software, or technical expertise</span>
        </label>
        <label class="radio-opt">
          <input type="radio" name="classification" value="non-technical" bind:group={classification}/>
          <span>Non-Technical — skills, knowledge, or services not primarily technical</span>
        </label>
      </div>
    </div>
    <div class="field">
      <label class="field-label">Why is this needed? <span class="field-hint">Optional · max 300 chars</span></label>
      <textarea class="ds-input" rows="3" bind:value={rationale} placeholder="Explain why the community would benefit from this service type" maxlength="300"></textarea>
      <div class="char-count">{rationale.length}/300</div>
    </div>
    <div class="form-actions">
      <a href="/app/service-types" class="btn-ghost">Cancel</a>
      <button type="submit" class="btn-ds btn-ds--primary">🏷️ Submit Suggestion</button>
    </div>
  </form>
</div>
