<svelte:head><title>Edit Profile — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { ME, TZS } from '$lib/data/mock';

  let name = $state(ME.name);
  let nick = $state(ME.nickname);
  let bio = $state(ME.bio);
  let email = $state(ME.email ?? '');
  let loc = $state(ME.location);
  let type = $state<'advocate' | 'creator'>(ME.type === 'advocate' ? 'advocate' : 'creator');
  let tz = $state(ME.timeZone ?? 'Europe/Paris');
</script>

<div class="ro-page">
  <div class="ro-detail-nav"><button class="btn-ghost" onclick={() => goto('/ui-kit/app/my-profile')}>← Back</button></div>
  <h1 class="ro-h1" style="margin-bottom:24px">Edit Profile</h1>
  <form class="ro-form-card" onsubmit={(e) => e.preventDefault()}>
    <div class="ro-file-drop">
      <div class="ro-av ro-av--xl" style="margin:0 auto 8px">{name ? name[0] : '?'}</div>
      <button type="button" class="btn-ghost btn-ghost--sm">Upload Picture</button>
      <p class="ro-small">Accepts: JPG, PNG, WebP</p>
    </div>

    <div class="ro-form-row-2">
      <div class="ro-field"><label class="ro-field-label">Name *</label><input class="ro-input" bind:value={name} placeholder="Your full name" /></div>
      <div class="ro-field"><label class="ro-field-label">Nickname *</label><input class="ro-input" bind:value={nick} placeholder="@handle" /></div>
    </div>

    <div class="ro-field"><label class="ro-field-label">Bio <span class="ro-field-hint">Markdown supported · max 1000 chars</span></label>
      <textarea class="ro-input" rows="4" bind:value={bio} placeholder="Tell us about yourself... (Markdown supported)" maxlength="1000"></textarea>
      <div class="ro-char-count">{bio.length}/1000</div></div>

    <div class="ro-form-section"><label class="ro-field-label">User Type *</label>
      <div class="ro-radio-group">
        <label class="ro-radio-opt"><input type="radio" name="p-type" value="advocate" bind:group={type} /><span><strong>Advocate</strong> — supports and promotes the community</span></label>
        <label class="ro-radio-opt"><input type="radio" name="p-type" value="creator" bind:group={type} /><span><strong>Creator</strong> — actively creates requests and offers</span></label>
      </div></div>

    <div class="ro-form-row-2">
      <div class="ro-field"><label class="ro-field-label">Email *</label><input type="email" class="ro-input" bind:value={email} placeholder="you@example.com" /></div>
      <div class="ro-field"><label class="ro-field-label">Location</label><input class="ro-input" bind:value={loc} placeholder="City, Country" /></div>
    </div>

    <div class="ro-field"><label class="ro-field-label">Time Zone *</label>
      <select class="ro-input" bind:value={tz}>{#each TZS as t}<option value={t}>{t}</option>{/each}</select></div>

    <div class="ro-form-actions">
      <button type="button" class="btn-ghost" onclick={() => goto('/ui-kit/app/my-profile')}>Cancel</button>
      <button type="button" class="btn-ds btn-ds--primary" onclick={() => goto('/ui-kit/app/my-profile')}>👤 Update Profile</button>
    </div>
  </form>
</div>
