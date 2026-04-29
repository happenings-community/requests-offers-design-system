<script lang="ts">
  import { goto } from '$app/navigation';

  let progress = $state(0);
  let status   = $state<'connecting'|'success'|'error'>('connecting');

  // Simulate connection progress
  $effect(() => {
    const id = setInterval(() => {
      progress += 10 + Math.floor(Math.random() * 15);
      if (progress >= 100) {
        progress = 100;
        clearInterval(id);
        setTimeout(() => { status = 'success'; }, 400);
      }
    }, 400);
    return () => clearInterval(id);
  });
</script>

<svelte:head><title>Connecting — R&O</title></svelte:head>
<div class="page">
  <div class="connecting-screen">
    {#if status === 'connecting'}
      <div class="connecting-icon">🔗</div>
      <h2 class="ds-h3">Connecting to the network…</h2>
      <p class="ds-small" style="color:rgb(var(--fg-2))">Establishing peer-to-peer connection via Holochain</p>
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width:{progress}%"></div>
      </div>
      <p class="ds-small">{progress}%</p>
    {:else if status === 'success'}
      <div class="connecting-icon">✅</div>
      <h2 class="ds-h3">Connected!</h2>
      <p class="ds-small" style="color:rgb(var(--fg-2))">You're now connected to the hAppenings network.</p>
      <a href="/app" class="btn-ds btn-ds--primary" style="margin-top:24px">Go to Home</a>
    {:else}
      <div class="connecting-icon">❌</div>
      <h2 class="ds-h3">Connection Failed</h2>
      <p class="ds-small" style="color:rgb(var(--fg-2))">Could not connect to the network. Please check your connection and try again.</p>
      <div class="connecting-actions">
        <button class="btn-ds btn-ds--primary" onclick={() => { progress = 0; status = 'connecting'; }}>Retry</button>
        <a href="/app" class="btn-ghost">Back to Home</a>
      </div>
    {/if}
  </div>
</div>
