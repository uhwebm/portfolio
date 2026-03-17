<script lang="ts">
  let {
    title = '',
    eyebrow = '',
    mode = 'roblox',
    children
  }: {
    title?: string;
    eyebrow?: string;
    mode?: 'roblox' | 'general';
    children?: import('svelte').Snippet;
  } = $props();
</script>

<section class:general={mode === 'general'} class="panel">
  {#if eyebrow}
    <p class="eyebrow">{eyebrow}</p>
  {/if}
  {#if title}
    <h2>{title}</h2>
  {/if}
  <div class="content">
    {@render children?.()}
  </div>
</section>

<style>
  .panel {
    position: relative;
    border: 1px solid rgba(66, 88, 105, 0.46);
    background:
      linear-gradient(180deg, rgba(248, 252, 255, 0.18), rgba(228, 239, 247, 0.08)),
      rgba(240, 247, 252, 0.12);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.22) inset,
      0 24px 80px rgba(52, 75, 91, 0.16);
    overflow: hidden;
  }

  .panel.general {
    border-color: rgba(128, 161, 193, 0.42);
    background:
      linear-gradient(180deg, rgba(18, 27, 43, 0.8), rgba(12, 20, 33, 0.72)),
      rgba(9, 16, 28, 0.54);
    box-shadow:
      0 0 0 1px rgba(142, 179, 212, 0.14) inset,
      0 24px 80px rgba(2, 8, 20, 0.42);
  }

  .panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(92, 116, 132, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(92, 116, 132, 0.12) 1px, transparent 1px);
    background-size: 26px 26px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8), transparent 85%);
    pointer-events: none;
  }

  .panel.general::before {
    background-image:
      linear-gradient(rgba(122, 157, 191, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(122, 157, 191, 0.12) 1px, transparent 1px);
  }

  .eyebrow {
    position: relative;
    margin: 0;
    padding: 1rem 1.2rem 0 1.2rem;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(58, 78, 92, 0.82);
  }

  .panel.general .eyebrow {
    color: rgba(164, 193, 218, 0.82);
  }

  h2 {
    position: relative;
    margin: 0;
    padding: 0.4rem 1.2rem 0 1.2rem;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1d313d;
  }

  .panel.general h2 {
    color: #eef7ff;
  }

  .content {
    position: relative;
    padding: 1.2rem;
  }
</style>
