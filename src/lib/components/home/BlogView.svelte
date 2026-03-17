<script lang="ts">
  import Panel from '$lib/components/Panel.svelte';
  import { formatDate } from '$lib/home/content';
  import type { BlogPost } from '$lib/server/blogs';

  let {
    posts,
    selectedPost,
    onSelectPost,
    onBack
  }: {
    posts: BlogPost[];
    selectedPost: BlogPost | null;
    onSelectPost: (slug: string) => void;
    onBack: () => void;
  } = $props();
</script>

{#if selectedPost}
  <Panel eyebrow="Blog" title="Writing" mode="general">
    <div class="blog-detail-header">
      <button type="button" class="back-inline" onclick={onBack}>Return / All Posts</button>
      <div class="card-top">
        <div>
          <p class="date">{formatDate(selectedPost.date)}</p>
          <h2>{selectedPost.title}</h2>
        </div>
        {#if selectedPost.archived}
          <span class="warning-badge">Warning: Archived</span>
        {/if}
      </div>
      <p class="description">{selectedPost.description}</p>
    </div>
  </Panel>

  <Panel eyebrow="Content" title={selectedPost.slug} mode="general">
    <div class="prose">
      {@html selectedPost.html}
    </div>
  </Panel>
{:else}
  <Panel eyebrow="Blog" title="Writing" mode="general">
    <div class="blog-hero">
      <p class="descriptor">my super awesome blog</p>
      <p class="summary">
        A blog where i say stuff that I think is either cool or important in my career.
      </p>
    </div>
  </Panel>

  <div class="blog-list">
    {#each posts as post}
      <button type="button" class="post-link" onclick={() => onSelectPost(post.slug)}>
        <article class:archived={post.archived} class="post-card">
          <div class="card-top">
            <div>
              <p class="date">{formatDate(post.date)}</p>
              <h2>{post.title}</h2>
            </div>
            {#if post.archived}
              <span class="warning-badge">Warning: Archived</span>
            {/if}
          </div>

          <p class="description">{post.description}</p>
          <p class="slug">/{post.slug}</p>
        </article>
      </button>
    {/each}
  </div>
{/if}

<style>
  .blog-hero {
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
    color: #eef7ff;
  }

  .summary,
  .description {
    margin: 0;
    font-size: 0.96rem;
    line-height: 1.8;
    color: rgba(213, 233, 255, 0.82);
  }

  .blog-list {
    display: grid;
    gap: 1rem;
  }

  .post-link {
    appearance: none;
    padding: 0;
    border: 0;
    background: transparent;
    text-align: left;
    color: inherit;
    cursor: pointer;
  }

  .post-card {
    display: grid;
    gap: 0.7rem;
    min-height: 8rem;
    padding: 0.95rem;
    border: 1px solid rgba(128, 161, 193, 0.34);
    background: rgba(14, 25, 39, 0.42);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: start;
  }

  .date,
  .slug {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(160, 193, 223, 0.76);
  }

  h2 {
    margin: 0.45rem 0 0;
    font-size: 1.2rem;
    line-height: 1.3;
    text-transform: uppercase;
    color: #eef7ff;
  }

  .back-inline {
    justify-self: start;
    padding: 0.75rem 0.95rem;
    border: 1px solid rgba(126, 162, 196, 0.42);
    background: rgba(11, 20, 33, 0.45);
    color: #d8ebff;
    font: inherit;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
  }

  .blog-detail-header {
    display: grid;
    gap: 1rem;
  }

  .warning-badge {
    display: inline-flex;
    align-items: center;
    min-height: 2.2rem;
    padding: 0.45rem 0.7rem;
    border: 1px solid rgba(197, 152, 19, 0.78);
    background: rgba(255, 227, 129, 0.14);
    color: #cfa028;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    white-space: nowrap;
  }

  .archived {
    border-color: rgba(211, 170, 37, 0.74) !important;
    box-shadow: 0 0 0 1px rgba(255, 230, 155, 0.12) inset;
  }

  .prose :global(h2),
  .prose :global(h3),
  .prose :global(h4) {
    margin: 2rem 0 0.8rem;
    text-transform: uppercase;
    color: #eef7ff;
  }

  .prose :global(p),
  .prose :global(li) {
    line-height: 1.9;
    color: rgba(213, 233, 255, 0.84);
  }

  .prose :global(ul),
  .prose :global(ol) {
    padding-left: 1.3rem;
  }

  .prose :global(a) {
    color: #7ee4d3;
  }

  .prose :global(code) {
    padding: 0.1rem 0.28rem;
    background: rgba(255, 255, 255, 0.08);
  }

  .prose :global(strong) {
    color: #ffffff;
  }

  @media (max-width: 860px) {
    .blog-hero {
      min-height: 14rem;
    }

    .card-top {
      flex-direction: column;
    }
  }
</style>
