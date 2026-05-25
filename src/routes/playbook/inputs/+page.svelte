<script lang="ts">
  import Field from '$lib/components/Field.svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head><title>Inputs — Playbook</title></svelte:head>

<h1 class="h2 mb-6">Inputs</h1>

<section class="pb-section">
  <h2 class="pb-label">Text Input</h2>
  <div style="max-width: 380px;">
    <Field label="Title" hint="Keep it short and action-first.">
      <input class="input" placeholder="Looking for a Holochain mentor" />
    </Field>
  </div>
  <pre class="pb-code"><code>&lt;Field label="Title" hint="Keep it short and action-first."&gt;
  &lt;input class="input" placeholder="…" /&gt;
&lt;/Field&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Textarea</h2>
  <div style="max-width: 380px;">
    <Field label="Description" hint="Describe what you need in 2-3 sentences.">
      <textarea class="textarea" rows="3" placeholder="I'm looking for someone who can help me…"></textarea>
    </Field>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Select</h2>
  <div style="max-width: 380px;">
    <Field label="Service Type">
      <select class="select">
        <option value="">Choose a category…</option>
        <option>Mentoring</option>
        <option>Design</option>
        <option>Development</option>
        <option>Translation</option>
      </select>
    </Field>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Error State</h2>
  <div style="max-width: 380px;">
    <Field label="Title" error="This field is required.">
      <input class="input input-error" value="" />
    </Field>
  </div>
  <pre class="pb-code"><code>&lt;Field label="Title" error="This field is required."&gt;
  &lt;input class="input input-error" /&gt;
&lt;/Field&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Full Form — Create Request</h2>
  <form class="form" onsubmit={(e) => e.preventDefault()}>
    <Field label="Title" hint="Action-first: 'Looking for…' or 'Need help with…'">
      <input class="input" placeholder="Looking for a Holochain mentor" />
    </Field>
    <Field label="Service Type">
      <select class="select">
        <option value="">Choose a category…</option>
        <option>Mentoring</option>
        <option>Design</option>
        <option>Development</option>
      </select>
    </Field>
    <Field label="Description" hint="What do you need? What can you offer in exchange?">
      <textarea class="textarea" rows="4" placeholder="Describe your request…"></textarea>
    </Field>
    <div class="form-actions">
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary" type="submit">Publish Request</Button>
    </div>
  </form>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: var(--fg-3); margin: 0 0 16px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .form { max-width: 480px; }
  .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
</style>
