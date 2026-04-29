<svelte:head><title>Inputs — Playbook</title></svelte:head>

<h1 class="ds-h2" style="margin-bottom: 24px;">Inputs</h1>

<section class="pb-section">
  <h2 class="pb-label">Text Input</h2>
  <div style="max-width: 380px;">
    <ds-field label="Title" hint="Keep it short and action-first.">
      <input class="ds-input" placeholder="Looking for a Holochain mentor" />
    </ds-field>
  </div>
  <pre class="pb-code"><code>&lt;ds-field label="Title" hint="Keep it short and action-first."&gt;
  &lt;input class="ds-input" placeholder="…" /&gt;
&lt;/ds-field&gt;</code></pre>
  <p class="ds-small" style="margin-top: 8px;">
    Note: use plain <code>&lt;input&gt;</code> inside <code>&lt;ds-field&gt;</code> for accessible label association.
    The <code>ds-input</code> class comes from <code>tokens.css</code>.
  </p>
</section>

<section class="pb-section">
  <h2 class="pb-label">Textarea</h2>
  <div style="max-width: 380px;">
    <ds-field label="Description" hint="Describe what you need in 2-3 sentences.">
      <textarea class="ds-input" rows="3" placeholder="I'm looking for someone who can help me…"></textarea>
    </ds-field>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Select</h2>
  <div style="max-width: 380px;">
    <ds-field label="Service Type">
      <select class="ds-input">
        <option value="">Choose a category…</option>
        <option>Mentoring</option>
        <option>Design</option>
        <option>Development</option>
        <option>Translation</option>
      </select>
    </ds-field>
  </div>
</section>

<section class="pb-section">
  <h2 class="pb-label">Error State</h2>
  <div style="max-width: 380px;">
    <ds-field label="Title" error="This field is required.">
      <input class="ds-input" value="" style="border-color: rgb(var(--color-error-500));" />
    </ds-field>
  </div>
  <pre class="pb-code"><code>&lt;ds-field label="Title" error="This field is required."&gt;
  &lt;input class="ds-input" /&gt;
&lt;/ds-field&gt;</code></pre>
</section>

<section class="pb-section">
  <h2 class="pb-label">Full Form — Create Request</h2>
  <form class="form" onsubmit={(e) => e.preventDefault()}>
    <ds-field label="Title" hint="Action-first: 'Looking for…' or 'Need help with…'">
      <input class="ds-input" placeholder="Looking for a Holochain mentor" />
    </ds-field>
    <ds-field label="Service Type">
      <select class="ds-input">
        <option value="">Choose a category…</option>
        <option>Mentoring</option>
        <option>Design</option>
        <option>Development</option>
      </select>
    </ds-field>
    <ds-field label="Description" hint="What do you need? What can you offer in exchange?">
      <textarea class="ds-input" rows="4" placeholder="Describe your request…"></textarea>
    </ds-field>
    <div class="form-actions">
      <ds-button variant="ghost">Cancel</ds-button>
      <ds-button variant="primary">Publish Request</ds-button>
    </div>
  </form>
</section>

<style>
  .pb-section { background: #fff; border-radius: 12px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
  .pb-label { font: 600 11px/16px var(--font-base); text-transform: uppercase; letter-spacing: .08em; color: rgb(var(--fg-3)); margin: 0 0 16px; }
  .pb-code { margin-top: 16px; background: rgb(var(--color-surface-900)); color: rgb(var(--color-surface-100)); border-radius: 8px; padding: 14px; font: 400 13px/20px var(--font-mono); overflow-x: auto; }
  .form { max-width: 480px; }
  .form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
  .ds-input {
    font: 400 14px/20px var(--font-base);
    border: 1px solid rgb(var(--border-2));
    border-radius: 8px; padding: 10px 12px;
    background: #fff; color: rgb(var(--fg-1));
    outline: none;
    transition: border-color 150ms, box-shadow 150ms;
    width: 100%; box-sizing: border-box; resize: vertical;
  }
  .ds-input:focus {
    border-color: rgb(var(--color-primary-500));
    box-shadow: 0 0 0 3px rgb(var(--color-primary-200) / .55);
  }
  .ds-input::placeholder { color: rgb(var(--fg-3)); }
</style>
