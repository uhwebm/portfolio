<script lang="ts">
  import type { Mode } from '$lib/home/content';

  let {
    modes,
    onSelect
  }: {
    modes: { key: Mode; label: string; icon: string; description: string }[];
    onSelect: (mode: Mode) => void;
  } = $props();
</script>

<div class="mode-gate">
  <div class="mode-card">
    <p class="gate-label">Select Mode</p>
    <h1>Choose an entry context.</h1>
    <div class="mode-grid">
      {#each modes as option}
        <button type="button" class="mode-option" onclick={() => onSelect(option.key)}>
          <span class="mode-icon">{option.icon}</span>
          <strong>{option.label}</strong>
          <span>{option.description}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .mode-gate {
    position: fixed;
    inset: 0;
    z-index: 4;
    display: grid;
    place-items: center;
    padding: 1.25rem;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: rgba(248, 252, 255, 0.18);
  }

  .mode-card {
    width: min(100%, 52rem);
    border: 1px solid rgba(79, 103, 120, 0.45);
    background: rgba(242, 248, 252, 0.24);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1.4rem;
    box-shadow: 0 24px 80px rgba(44, 61, 73, 0.18);
  }

  .gate-label {
    margin: 0 0 0.5rem;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(49, 69, 83, 0.72);
  }

  h1 {
    margin: 0 0 1.2rem;
    font-size: clamp(1.5rem, 4vw, 2.7rem);
    line-height: 1.1;
    text-transform: uppercase;
    color: #0f2430;
  }

  .mode-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .mode-option {
    appearance: none;
    display: grid;
    gap: 0.7rem;
    min-height: 12rem;
    padding: 1rem;
    border: 1px solid rgba(66, 88, 105, 0.42);
    background: rgba(255, 255, 255, 0.16);
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
  }

  .mode-option:hover {
    transform: translateY(-2px);
    border-color: rgba(45, 67, 84, 0.6);
    background: rgba(255, 255, 255, 0.24);
  }

  .mode-icon {
    display: inline-grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border: 1px solid rgba(66, 88, 105, 0.42);
    font-size: 1.35rem;
  }

  strong {
    font-size: 1.1rem;
    text-transform: uppercase;
    color: #0f2430;
  }

  .mode-option span:last-child {
    line-height: 1.7;
    color: rgba(16, 36, 48, 0.78);
  }

  @media (max-width: 860px) {
    .mode-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
