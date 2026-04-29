<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { state } from '$lib/state.svelte';
  import { copyToClipboard } from '$lib/utils';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  const ROUTE_MAP: Record<string, string> = {
    'home':                '/app',
    'requests':            '/app/requests',
    'request-detail':      '/app/requests/{id}',
    'request-create':      '/app/requests/create',
    'request-edit':        '/app/requests/{id}/edit',
    'offers':              '/app/offers',
    'offer-detail':        '/app/offers/{id}',
    'offer-create':        '/app/offers/create',
    'offer-edit':          '/app/offers/{id}/edit',
    'my-listings':         '/app/my-listings',
    'users':               '/app/users',
    'user-profile':        '/app/users/{id}',
    'user-create':         '/app/user/create',
    'user-edit':           '/app/user/edit',
    'orgs':                '/app/organizations',
    'org-detail':          '/app/organizations/{id}',
    'org-create':          '/app/organizations/create',
    'org-edit':            '/app/organizations/{id}/edit',
    'service-types':       '/app/service-types',
    'service-type-detail': '/app/service-types/{id}',
    'suggest-service-type':'/app/service-types/suggest',
    'connecting':          '/app/connecting',
    'profile-guard':       '/app/profile-guard',
    'admin':               '/app/admin',
    'admin-users':         '/app/admin/users',
    'admin-orgs':          '/app/admin/organizations',
    'admin-organizations': '/app/admin/organizations',
    'admin-requests':      '/app/admin/requests',
    'admin-offers':        '/app/admin/offers',
    'admin-service-types': '/app/admin/service-types',
    'admin-mediums':       '/app/admin/mediums',
    'admin-administrators':'/app/admin/administrators',
  };

  let wrapper: HTMLElement;

  $effect(() => {
    if (!browser || !wrapper) return;
    const handle = (e: Event) => {
      const { route, payload } = (e as CustomEvent).detail ?? {};
      if (!route) return;
      let url = ROUTE_MAP[route] ?? '/app';
      if (payload) url = url.replace('{id}', payload);
      goto(url);
    };
    wrapper.addEventListener('ds-navigate', handle);
    (window as any).__dsNavigate = (route: string, payload?: string) => {
      let url = ROUTE_MAP[route] ?? '/app';
      if (payload) url = url.replace('{id}', payload);
      goto(url);
    };
    return () => {
      wrapper.removeEventListener('ds-navigate', handle);
      delete (window as any).__dsNavigate;
    };
  });

  function closeContactModal() { state.contactModal = null; }
  function closeConfirm() { state.confirmModal = null; }
  function executeConfirm() { state.confirmModal?.onConfirm(); state.confirmModal = null; }
</script>

<div bind:this={wrapper} style="display:contents">
  <ds-shell app-name="Requests & Offers" logo-src="/assets/hAppeningsCIClogo.png" route={page.url.pathname.replace('/app/', '').replace('/app', 'home')}>
    {@render children()}
  </ds-shell>
</div>

<!-- ── CONTACT MODAL ── -->
{#if state.contactModal}
  {@const target = state.contactModal}
  <div class="modal-backdrop" onclick={closeContactModal} role="button" tabindex="-1"
       onkeydown={(e) => e.key === 'Escape' && closeContactModal()}>
    <div class="modal-panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
      <button class="modal-close" onclick={closeContactModal} aria-label="Close">✕</button>
      <header class="modal-header">
        <h3 class="ds-h3">🤝 Interested in this {target.listingType}?</h3>
        {#if target.listingTitle}<p class="modal-listing-title">"{target.listingTitle}"</p>{/if}
        <p class="ds-small" style="color:rgb(var(--fg-3))">Get in touch directly with the contact information below</p>
      </header>
      <div class="modal-body">
        {#if target.org}
          <div class="contact-who">
            <div class="av av--md">{target.org.name[0]}</div>
            <div><div class="contact-name">{target.org.name}</div><div class="contact-role ds-small">Organization</div></div>
          </div>
          <div class="contact-row">
            <span class="contact-icon">📧</span>
            <div class="contact-detail">
              <span class="contact-label ds-small">Email</span>
              <span class="contact-value">{target.org.email}</span>
            </div>
            <button class="btn-ghost btn-ghost--sm" onclick={() => copyToClipboard(target.org!.email)}>📋 Copy</button>
          </div>
        {:else}
          <div class="contact-who">
            <div class="av av--md">{target.user.name[0]}</div>
            <div><div class="contact-name">{target.user.name}</div><div class="contact-role ds-small">@{target.user.nickname}</div></div>
          </div>
          {#if target.user.email}
            <div class="contact-row">
              <span class="contact-icon">📧</span>
              <div class="contact-detail">
                <span class="contact-label ds-small">Email</span>
                <span class="contact-value">{target.user.email}</span>
              </div>
              <button class="btn-ghost btn-ghost--sm" onclick={() => copyToClipboard(target.user.email!)}>📋 Copy</button>
            </div>
          {/if}
          {#if target.user.timeZone}
            <div class="contact-row">
              <span class="contact-icon">🌍</span>
              <div class="contact-detail">
                <span class="contact-label ds-small">Time Zone</span>
                <span class="contact-value">{target.user.timeZone}</span>
              </div>
            </div>
          {/if}
        {/if}
        <div class="contact-note">
          <span>💬</span>
          <p class="ds-small">Please reach out respectfully. This is a community mutual aid network — direct, honest communication is encouraged.</p>
        </div>
      </div>
      <footer class="modal-footer">
        <button class="btn-ds btn-ds--ghost" onclick={closeContactModal}>Close</button>
      </footer>
    </div>
  </div>
{/if}

<!-- ── CONFIRM MODAL ── -->
{#if state.confirmModal}
  {@const target = state.confirmModal}
  <div class="modal-backdrop" onclick={closeConfirm} role="button" tabindex="-1"
       onkeydown={(e) => e.key === 'Escape' && closeConfirm()}>
    <div class="modal-panel modal-panel--compact" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
      <button class="modal-close" onclick={closeConfirm} aria-label="Close">✕</button>
      <header class="modal-header"><h3 class="ds-h3">⚠️ Confirm Action</h3></header>
      <p class="ds-p" style="text-align:center;margin:0 0 24px">{target.message}</p>
      <footer class="modal-footer" style="display:flex;gap:12px;justify-content:center">
        <button class="btn-ghost" onclick={closeConfirm}>Cancel</button>
        <button class="btn-ds" style="background:rgb(var(--color-error-600));color:#fff" onclick={executeConfirm}>Confirm</button>
      </footer>
    </div>
  </div>
{/if}
