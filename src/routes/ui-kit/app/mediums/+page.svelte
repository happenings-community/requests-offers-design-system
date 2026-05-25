<svelte:head><title>Mediums of Exchange — Requests & Offers</title></svelte:head>

<script lang="ts">
  import { MEDIUMS } from '$lib/data/mock';

  const descriptions: Record<string, string> = {
    TIME: 'Exchange measured in time units. One hour of your time for one hour of another\'s.',
    SKILL: 'Direct skill-for-skill exchange. No monetary value assigned.',
    EUR: 'Euro currency for direct monetary exchange.',
    LOCAL: 'Community-issued local currency or tokens.',
    USD: 'US Dollar currency for international monetary exchange.'
  };
</script>

<section class="container mx-auto space-y-6 p-4">
  <div class="flex items-center justify-between">
    <h1 class="h1">Mediums of Exchange</h1>
  </div>

  <div class="border-surface-300 overflow-x-auto rounded-container-token border">
    <table class="w-full">
      <thead>
        <tr class="bg-surface-100">
          <th class="px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide">Name</th>
          <th class="hidden px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide sm:table-cell">Description</th>
          <th class="px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide">Code</th>
          <th class="px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide">Type</th>
          <th class="px-4 py-3 text-left font-medium text-surface-600 text-sm uppercase tracking-wide">Status</th>
        </tr>
      </thead>
      <tbody>
        {#each MEDIUMS as m}
          <tr class="border-t border-surface-200 hover:bg-surface-50 transition-colors">
            <td class="px-4 py-3 font-medium">{m.name}</td>
            <td class="hidden px-4 py-3 text-sm text-surface-600 sm:table-cell max-w-xs">
              <p class="truncate" title={descriptions[m.code] ?? ''}>
                {descriptions[m.code] ?? ''}
              </p>
            </td>
            <td class="px-4 py-3">
              <span class="badge variant-soft-surface font-mono text-xs">{m.code}</span>
            </td>
            <td class="px-4 py-3">
              <span class="badge {m.type === 'base' ? 'variant-soft-secondary' : 'variant-soft-tertiary'}">
                {m.type === 'base' ? '📂 Base' : '💰 Currency'}
              </span>
            </td>
            <td class="px-4 py-3">
              <span class="badge {m.status === 'approved' ? 'variant-soft-success' : 'variant-soft-warning'}">
                {m.status}
              </span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="text-sm text-surface-500">
    Showing {MEDIUMS.length} mediums of exchange
  </div>
</section>
