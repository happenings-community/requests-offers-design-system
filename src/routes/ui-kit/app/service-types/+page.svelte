<svelte:head><title>Service Types — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { SERVICE_TYPES } from '$lib/data/mock';

  let search = $state('');
  let filtered = $derived(
    search.trim()
      ? SERVICE_TYPES.filter((st) => st.name.toLowerCase().includes(search.trim().toLowerCase()))
      : SERVICE_TYPES
  );
</script>

<section class="container mx-auto space-y-6 p-4">
  <div class="flex items-center justify-between">
    <h1 class="h1">Available Service Types</h1>
    <button
      class="variant-filled-primary btn"
      onclick={() => goto('/ui-kit/app/service-types')}
    >
      Suggest a Service Type
    </button>
  </div>

  <!-- Search -->
  <div class="mb-6">
    <input
      type="text"
      placeholder="Search service types..."
      bind:value={search}
      class="input w-full max-w-md"
    />
  </div>

  {#if filtered.length === 0}
    <div class="card p-8 text-center">
      <h3 class="h3">No Service Types Found</h3>
      <p class="text-surface-600">No service types match your search.</p>
    </div>
  {:else}
    <!-- Table matching R&O's ServiceTypesTable -->
    <div class="border-surface-300 overflow-x-auto rounded-container-token border">
      <table class="w-full">
        <thead>
          <tr class="bg-surface-100">
            <th class="px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide">Name</th>
            <th class="hidden px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide sm:table-cell">Description</th>
            <th class="px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide">Type</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as st}
            <tr class="border-t border-surface-200 hover:bg-surface-50 transition-colors">
              <td class="px-4 py-3 font-medium">{st.name}</td>
              <td class="hidden px-4 py-3 text-sm text-surface-600 sm:table-cell">
                {st.description}
              </td>
              <td class="px-4 py-3">
                <span class="badge {st.technical ? 'variant-soft-primary' : 'variant-soft-secondary'}">
                  {st.technical ? 'Technical' : 'Non-Technical'}
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="text-sm text-surface-500">
      Showing {filtered.length} of {SERVICE_TYPES.length} service types
    </div>
  {/if}
</section>
