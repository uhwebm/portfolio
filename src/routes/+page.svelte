<svelte:head>
  <title>uhwebm</title>
  <meta name="description" content="Systems Engineer" />
</svelte:head>

<script lang="ts">
  import '@fontsource/jetbrains-mono';
  import EntryGate from '$lib/components/home/EntryGate.svelte';
  import PortfolioView from '$lib/components/home/PortfolioView.svelte';
  import ViewSwitcher from '$lib/components/home/ViewSwitcher.svelte';
  import BlogView from '$lib/components/home/BlogView.svelte';
  import { highlightsByMode, modes, statsByMode, summaries } from '$lib/home/content';
  import CanyonScene from '$lib/three/CanyonScene.svelte';
  import type { PageData } from './$types';
  import type { Mode, View } from '$lib/home/content';

  let { data }: { data: PageData } = $props();

  let selectedMode = $state<Mode | null>(null);
  let view = $state<View>('roblox');
  let selectedPostSlug = $state<string | null>(null);

  const activateMode = (nextMode: Mode) => {
    selectedMode = nextMode;
    view = nextMode;
    selectedPostSlug = null;
  };

  const selectBlog = () => {
    view = 'blog';
    selectedPostSlug = null;
  };

  const uiMode = $derived(view === 'roblox' ? 'roblox' : 'general');
  const selectedPost = $derived(data.posts.find((post) => post.slug === selectedPostSlug) ?? null);
</script>

<CanyonScene mode={view === 'blog' ? 'blog' : (selectedMode ?? 'roblox')} />

<div class:dark-page={view !== 'roblox'} class="page-shell">
  {#if selectedMode === null}
    <EntryGate {modes} onSelect={activateMode} />
  {/if}

  <main class:inactive={selectedMode === null} class="layout">
    <ViewSwitcher {modes} {view} dark={view !== 'roblox'} onModeSelect={activateMode} onBlogSelect={selectBlog} />

    {#if view === 'blog'}
      <BlogView
        posts={data.posts}
        {selectedPost}
        onSelectPost={(slug) => (selectedPostSlug = slug)}
        onBack={() => (selectedPostSlug = null)}
      />
    {:else}
      <PortfolioView
        mode={uiMode}
        summary={summaries[view]}
        stats={statsByMode[view]}
        highlights={highlightsByMode[view]}
        technologies={data.technologies}
        languages={data.languages}
        config={data.config}
      />
    {/if}
  </main>
</div>

<style>
  :global(html, body) {
    margin: 0;
    min-height: 100%;
  }

  :global(body) {
    font-family: 'JetBrains Mono', monospace;
    color: #132833;
    background: #f5fbff;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .page-shell {
    position: relative;
    min-height: 100vh;
    padding: 5rem 1.25rem 3rem;
    color: #132833;
  }

  .dark-page {
    color: #e5f1ff;
  }

  .layout {
    width: min(100%, 72rem);
    margin: 0 auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    transition: opacity 240ms ease;
  }

  .layout.inactive {
    opacity: 0.16;
    pointer-events: none;
  }

  @media (max-width: 860px) {
    .page-shell {
      padding-top: 4rem;
    }
  }
</style>
