<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    rows?: number;
  }

  let {
    value = $bindable(''),
    placeholder = '',
    type = 'text',
    disabled = false,
    rows
  }: Props = $props();
</script>

{#if rows}
  <textarea class="textarea" {rows} {placeholder} {disabled} bind:value></textarea>
{:else}
  <input class="input" {type} {placeholder} {disabled} bind:value />
{/if}
