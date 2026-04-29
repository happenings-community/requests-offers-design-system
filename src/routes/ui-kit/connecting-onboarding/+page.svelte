<svelte:head><title>Connecting — UI Kit</title></svelte:head>

<div class="two-col">

  <!-- Panel A: Connection Screen -->
  <div class="panel">
    <div class="panel-content">
      <div class="panel-icon">🔗</div>
      <h1 class="ds-h3" style="text-align: center; margin: 0 0 8px;">Connecting to Holochain</h1>
      <p class="ds-small" style="text-align: center; margin-bottom: 32px;">Establishing a secure peer-to-peer connection…</p>

      <div class="progress-bar">
        <div class="progress-fill" style="width: 66%;"></div>
      </div>
      <p class="ds-small" style="text-align: center; margin: 8px 0 24px; color: rgb(var(--fg-3));">Step 2 of 3</p>

      <div class="steps">
        <div class="step step--done">
          <span class="step-icon">✅</span>
          <div>
            <div class="step-label">Holochain Connected</div>
            <div class="step-meta">Conductor running on port 8888</div>
          </div>
        </div>
        <div class="step step--done">
          <span class="step-icon">✅</span>
          <div>
            <div class="step-label">hREA Ready</div>
            <div class="step-meta">ValueFlows DNA loaded</div>
          </div>
        </div>
        <div class="step step--active">
          <div class="step-spinner"></div>
          <div>
            <div class="step-label">Verifying Identity</div>
            <div class="step-meta">Checking agent key…</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 28px; display: flex; justify-content: center;">
        <ds-status-dot status="checking"></ds-status-dot>
      </div>
    </div>
  </div>

  <!-- Panel B: Profile Guard -->
  <div class="panel">
    <div class="panel-content">
      <div class="panel-icon">🔒</div>
      <h1 class="ds-h3" style="text-align: center; margin: 0 0 8px;">Profile Required</h1>
      <p class="ds-small" style="text-align: center; margin-bottom: 24px;">You need a profile to create requests and offers.</p>

      <div class="info-card">
        <p class="ds-small" style="margin: 0;">
          You can still <strong>browse</strong> existing requests and offers without a profile.
          Create one when you're ready to participate.
        </p>
      </div>

      <div class="cta-stack">
        <ds-button variant="primary">
          <span slot="icon">👤</span>
          Create My Profile
        </ds-button>
        <ds-button variant="ghost">
          <span slot="icon">📝</span>
          Browse Requests
        </ds-button>
        <ds-button variant="ghost">
          <span slot="icon">💡</span>
          Browse Offers
        </ds-button>
      </div>

      <p class="ds-small" style="margin-top: 24px; text-align: center; color: rgb(var(--fg-3));">
        Your profile is stored on the Holochain network.<br />No central server holds your data.
      </p>
    </div>
  </div>

</div>

<style>
  .two-col {
    display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh;
    background: rgb(var(--bg-muted));
  }
  @media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } }

  .panel {
    display: flex; align-items: center; justify-content: center;
    padding: 48px 24px;
  }
  .panel:first-child { background: #fff; border-right: 1px solid rgb(var(--border-1)); }
  .panel-content { width: 100%; max-width: 380px; }
  .panel-icon { font-size: 48px; text-align: center; margin-bottom: 16px; }

  .progress-bar { height: 8px; background: rgb(var(--border-1)); border-radius: 9999px; overflow: hidden; }
  .progress-fill { height: 100%; background: rgb(var(--color-primary-500)); border-radius: 9999px; transition: width 500ms; }

  .steps { display: flex; flex-direction: column; gap: 12px; }
  .step { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border-radius: 8px; background: rgb(var(--bg-muted)); }
  .step--done { opacity: .8; }
  .step--active { background: rgb(var(--color-primary-50)); border: 1px solid rgb(var(--color-primary-200)); }
  .step-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .step-label { font: 600 14px/20px var(--font-base); color: rgb(var(--fg-1)); }
  .step-meta { font: 400 12px/16px var(--font-base); color: rgb(var(--fg-3)); }
  .step-spinner {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgb(var(--color-primary-200));
    border-top-color: rgb(var(--color-primary-600));
    animation: spin 800ms linear infinite; flex-shrink: 0; margin-top: 2px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .info-card {
    background: rgb(var(--color-tertiary-50)); border: 1px solid rgb(var(--color-tertiary-200));
    border-radius: 10px; padding: 14px 16px; margin-bottom: 24px;
  }
  .cta-stack { display: flex; flex-direction: column; gap: 10px; align-items: stretch; }
  .cta-stack ds-button { width: 100%; }
</style>
