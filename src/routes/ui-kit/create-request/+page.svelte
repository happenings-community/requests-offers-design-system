<svelte:head><title>Create Request — UI Kit</title></svelte:head>

<ds-shell app-name="Requests & Offers" logo-src="/assets/hAppeningsCIClogo.png" route="request-create">
  <div class="page">
    <div class="card">
      <header class="card-head">
        <h1 class="ds-h3">New Request</h1>
        <p class="ds-small">Describe what you need and the community will connect with you.</p>
      </header>

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
            <option>Translation</option>
            <option>Permaculture</option>
            <option>Music</option>
            <option>Other</option>
          </select>
        </ds-field>

        <ds-field
          label="Description"
          error="Description must be at least 20 characters."
          hint="">
          <textarea class="ds-input" rows="5" placeholder="Describe your request in detail. What do you need? What can you offer in exchange?"></textarea>
        </ds-field>

        <ds-field label="Tags" hint="Comma-separated keywords to help people find your request.">
          <input class="ds-input" placeholder="Holochain, Mentoring, Rust" />
        </ds-field>

        <div class="form-actions">
          <ds-button variant="ghost">Cancel</ds-button>
          <ds-button variant="primary">
            <span slot="icon">📝</span>
            Publish Request
          </ds-button>
        </div>
      </form>
    </div>
  </div>
</ds-shell>

<style>
  .page { display: flex; justify-content: center; padding: 40px 16px 64px; }
  .card {
    background: #fff; border: 1px solid rgb(var(--border-1));
    border-radius: 16px; padding: 32px; box-shadow: var(--shadow-md);
    width: 100%; max-width: 560px;
  }
  .card-head { margin-bottom: 24px; }
  .card-head .ds-h3 { margin: 0 0 4px; }
  .form { display: flex; flex-direction: column; gap: 0; }
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
