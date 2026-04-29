<script lang="ts">
  import { state } from '$lib/state.svelte';
</script>

<svelte:head><title>Profile Required — R&O</title></svelte:head>
<div class="page">
  <div class="profile-guard-screen">
    <div class="profile-guard-icon">👤</div>
    <h2 class="ds-h2">Profile Required</h2>
    <p class="ds-p" style="color:rgb(var(--fg-2));max-width:480px;text-align:center">
      You need a community profile to access this feature. Creating a profile lets you post requests, make offers, and connect with other members.
    </p>
    <div class="profile-guard-actions">
      <a href="/app/user/create" class="btn-ds btn-ds--primary">👤 Create Profile</a>
      <a href="/app" class="btn-ghost">← Back to Home</a>
    </div>
    <div class="profile-guard-preview">
      <h3 class="ds-h4">What you can do with a profile</h3>
      <ul class="feature-list">
        <li class="feature-item">
          <span class="feature-icon">📝</span>
          <div>
            <strong>Post Requests</strong>
            <p class="ds-small">Ask the community for skills, services, and support.</p>
          </div>
        </li>
        <li class="feature-item">
          <span class="feature-icon">💡</span>
          <div>
            <strong>Make Offers</strong>
            <p class="ds-small">Share your skills and contribute to the community.</p>
          </div>
        </li>
        <li class="feature-item">
          <span class="feature-icon">🤝</span>
          <div>
            <strong>Connect with Members</strong>
            <p class="ds-small">Reach out directly to people whose requests or offers match your needs.</p>
          </div>
        </li>
        <li class="feature-item">
          <span class="feature-icon">🏢</span>
          <div>
            <strong>Represent an Organization</strong>
            <p class="ds-small">Post on behalf of a community organization or cooperative.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
