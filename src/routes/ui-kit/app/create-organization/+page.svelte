<svelte:head><title>Create Organization — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';

  let name = $state('');
  let legal = $state('');
  let email = $state('');
  let loc = $state('');
  let desc = $state('');
  let urls = $state('');
</script>

<div class="ro-page">
  <div class="ro-detail-nav"><button class="btn-ghost" onclick={() => goto('/ui-kit/app/organizations')}>← Back</button></div>
  <h1 class="ro-h1" style="margin-bottom:24px">Create new Organization</h1>
  <form class="ro-form-card" onsubmit={(e) => e.preventDefault()}>
    <p class="ro-form-note">* required fields</p>

    <div class="ro-file-drop">
      <div class="ro-org-logo-lg" style="margin:0 auto 8px">?</div>
      <button type="button" class="btn-ghost btn-ghost--sm">Upload Logo</button>
    </div>

    <div class="ro-field"><label class="ro-field-label">Name *</label><input class="ro-input" bind:value={name} placeholder="Organization name" /></div>
    <div class="ro-field"><label class="ro-field-label">Full Legal Name *</label><input class="ro-input" bind:value={legal} placeholder="Official legal name of your organization" /></div>
    <div class="ro-field"><label class="ro-field-label">Email *</label><input type="email" class="ro-input" bind:value={email} placeholder="contact@org.example" /></div>
    <div class="ro-field"><label class="ro-field-label">Location *</label><input class="ro-input" bind:value={loc} placeholder="City, Country" /></div>

    <div class="ro-field"><label class="ro-field-label">Vision / Mission * <span class="ro-field-hint">Markdown supported · max 1000 chars</span></label>
      <textarea class="ro-input" rows="6" bind:value={desc} placeholder="Describe your organization's vision and mission... (Markdown supported)" maxlength="1000"></textarea>
      <div class="ro-char-count">{desc.length}/1000</div></div>

    <div class="ro-field"><label class="ro-field-label">Website URLs <span class="ro-field-hint">website, x, github, other... (comma-separated)</span></label>
      <textarea class="ro-input" rows="2" bind:value={urls} placeholder="https://org.example, https://github.com/org"></textarea></div>

    <div class="ro-form-actions">
      <button type="button" class="btn-ghost" onclick={() => goto('/ui-kit/app/organizations')}>Cancel</button>
      <button type="button" class="btn-ds btn-ds--primary" onclick={() => goto('/ui-kit/app/organizations')}>Create Organization</button>
    </div>
  </form>
</div>
