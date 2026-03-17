<script lang="ts">
  type Item = {
    name: string;
    icon: string;
  };

  let {
    items,
    mode = 'roblox',
    speed = 28
  }: {
    items: Item[];
    mode?: 'roblox' | 'general';
    speed?: number;
  } = $props();

  const marqueeItems = $derived([...items, ...items]);
</script>

<div class:general={mode === 'general'} class="marquee-shell">
  <div class="fade left"></div>
  <div class="fade right"></div>

  <div class="track" style={`--duration:${speed}s;`}>
    {#each marqueeItems as item, index}
      <div class="chip" aria-hidden={index >= items.length}>
        <img src={item.icon} alt="" loading="lazy" />
        <span>{item.name}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee-shell {
    position: relative;
    overflow: hidden;
    padding: 0.1rem 0;
  }

  .track {
    display: flex;
    width: max-content;
    gap: 0.9rem;
    animation: scroll var(--duration, 28s) linear infinite;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 11rem;
    padding: 0.95rem 1rem;
    border: 1px solid rgba(66, 88, 105, 0.38);
    background: rgba(255, 255, 255, 0.16);
    white-space: nowrap;
  }

  .general .chip {
    border-color: rgba(128, 161, 193, 0.34);
    background: rgba(14, 25, 39, 0.38);
  }

  img {
    width: 1.6rem;
    height: 1.6rem;
    object-fit: contain;
    flex: 0 0 auto;
  }

  span {
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(18, 40, 52, 0.86);
  }

  .general span {
    color: rgba(218, 236, 255, 0.84);
  }

  .fade {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 5rem;
    z-index: 1;
    pointer-events: none;
  }

  .fade.left {
    left: 0;
    background: linear-gradient(90deg, rgba(241, 248, 252, 0.96), rgba(241, 248, 252, 0));
  }

  .fade.right {
    right: 0;
    background: linear-gradient(270deg, rgba(241, 248, 252, 0.96), rgba(241, 248, 252, 0));
  }

  .general .fade.left {
    background: linear-gradient(90deg, rgba(8, 15, 26, 0.98), rgba(8, 15, 26, 0));
  }

  .general .fade.right {
    background: linear-gradient(270deg, rgba(8, 15, 26, 0.98), rgba(8, 15, 26, 0));
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(calc(-50% - 0.45rem));
    }
  }
</style>
