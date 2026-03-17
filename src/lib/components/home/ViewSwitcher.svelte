<script lang="ts">
  import type { Mode, View } from '$lib/home/content';

  let {
    modes,
    view,
    dark = false,
    onModeSelect,
    onBlogSelect
  }: {
    modes: { key: Mode; label: string; icon: string }[];
    view: View;
    dark?: boolean;
    onModeSelect: (mode: Mode) => void;
    onBlogSelect: () => void;
  } = $props();
</script>

<div class="mode-switcher">
  {#each modes as option}
    <button
      type="button"
      class:active={view === option.key}
      class:dark
      class="switch-button"
      onclick={() => onModeSelect(option.key)}
    >
      <span>{option.icon}</span>
      {option.label}
    </button>
  {/each}

  <button type="button" class:active={view === 'blog'} class:dark class="switch-button" onclick={onBlogSelect}>
    <span>+</span>
    Blog
  </button>
</div>

<style>
  .mode-switcher {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .switch-button {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.75rem 0.95rem;
    border: 1px solid rgba(66, 88, 105, 0.42);
    background: rgba(255, 255, 255, 0.16);
    color: inherit;
    font: inherit;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: background 180ms ease, border-color 180ms ease;
  }

  .switch-button.dark {
    border-color: rgba(126, 162, 196, 0.42);
    background: rgba(11, 20, 33, 0.45);
    color: #d8ebff;
  }

  .switch-button.active {
    border-color: rgba(20, 40, 57, 0.8);
    background: rgba(255, 255, 255, 0.3);
  }

  .switch-button.dark.active {
    border-color: rgba(139, 190, 236, 0.74);
    background: rgba(18, 35, 56, 0.84);
  }

  @media (max-width: 860px) {
    .mode-switcher {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      justify-content: stretch;
    }
  }
</style>
