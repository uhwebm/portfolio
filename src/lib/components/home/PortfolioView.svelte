<script lang="ts">
  import LogoMarquee from '$lib/components/LogoMarquee.svelte';
  import ContactSection from '$lib/components/home/ContactSection.svelte';
  import Panel from '$lib/components/Panel.svelte';
  import type { Mode } from '$lib/home/content';
  import type { SiteConfig } from '$lib/server/config';

  let {
    mode,
    summary,
    stats,
    highlights,
    technologies,
    languages,
    config
  }: {
    mode: Mode;
    summary: { descriptor: string; summary: string };
    stats: { label: string; value: string }[];
    highlights: string[];
    technologies: { name: string; icon: string }[];
    languages: { name: string; icon: string }[];
    config: SiteConfig;
  } = $props();
</script>

<Panel eyebrow="Identity" title="uhwebm" mode={mode}>
  <div class="hero-stack">
    <p class="descriptor">{summary.descriptor}</p>
    <p class="summary">{summary.summary}</p>
  </div>
</Panel>

<div class="grid-row">
  <Panel eyebrow="Metrics" title="Snapshot" mode={mode}>
    <div class="stats-grid">
      {#each stats as stat}
        <div class="stat">
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </div>
      {/each}
    </div>
  </Panel>

  <Panel eyebrow="Focus" title="Current Direction" mode={mode}>
    <ul class="highlights">
      {#each highlights as highlight}
        <li>{highlight}</li>
      {/each}
    </ul>
  </Panel>
</div>

<Panel eyebrow={mode === 'general' ? 'Languages' : 'Technologies'} title={mode === 'general' ? 'Languages' : 'Technologies'} mode={mode}>
  <LogoMarquee items={mode === 'general' ? languages : technologies} mode={mode} speed={mode === 'general' ? 24 : 28} />
</Panel>

<ContactSection {mode} {config} />

<style>
  .grid-row {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 1rem;
  }

  .hero-stack {
    display: grid;
    gap: 1rem;
    min-height: 17rem;
    align-content: center;
  }

  .descriptor {
    margin: 0;
    font-size: clamp(1.6rem, 4vw, 4rem);
    line-height: 1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #10242e;
  }

  :global(.dark-page) .descriptor {
    color: #eef7ff;
  }

  .summary {
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.8;
    color: rgba(18, 40, 52, 0.82);
  }

  :global(.dark-page) .summary {
    color: rgba(213, 233, 255, 0.82);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .stat,
  .highlights li {
    display: grid;
    gap: 0.7rem;
    min-height: 8rem;
    padding: 0.95rem;
    border: 1px solid rgba(66, 88, 105, 0.38);
    background: rgba(255, 255, 255, 0.16);
  }

  :global(.dark-page) .stat,
  :global(.dark-page) .highlights li {
    border-color: rgba(128, 161, 193, 0.34);
    background: rgba(14, 25, 39, 0.42);
  }

  .stat span {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(52, 73, 86, 0.72);
  }

  :global(.dark-page) .stat span {
    color: rgba(160, 193, 223, 0.76);
  }

  .stat strong {
    align-self: end;
    font-size: clamp(1.25rem, 2vw, 2rem);
    color: #10242e;
  }

  :global(.dark-page) .stat strong {
    color: #eef7ff;
  }

  .highlights {
    display: grid;
    gap: 0.8rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .highlights li {
    line-height: 1.7;
    color: rgba(18, 40, 52, 0.84);
  }

  :global(.dark-page) .highlights li {
    color: rgba(218, 236, 255, 0.84);
  }

  @media (max-width: 860px) {
    .grid-row,
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .hero-stack {
      min-height: 14rem;
    }
  }
</style>
