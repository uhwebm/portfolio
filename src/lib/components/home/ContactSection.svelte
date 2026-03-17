<script lang="ts">
  import Panel from '$lib/components/Panel.svelte';
  import type { Mode } from '$lib/home/content';
  import type { SiteConfig } from '$lib/server/config';

  type ContactLink = {
    label: string;
    href: string;
    value: string;
    icon: 'discord' | 'roblox' | 'devforum' | 'email' | 'github';
  };

  let {
    mode,
    config
  }: {
    mode: Mode;
    config: SiteConfig;
  } = $props();

  const status = $derived(
    config.status[config.status.state as keyof SiteConfig['status']] as {
      label: string;
      color: string;
    }
  );

  const statusTone = $derived(
    {
      emerald: 'tone-emerald',
      red: 'tone-red',
      yellow: 'tone-yellow'
    }[status.color] ?? 'tone-yellow'
  );


  const linksByMode: Record<Mode, ContactLink[]> = {
    roblox: [
      {
        label: 'Discord',
        href: 'https://discord.com/users/1221457893522669662',
        value: 'Primary',
        icon: 'discord'
      },
      {
        label: 'Roblox',
        href: 'https://www.roblox.com/users/5048508312/profile',
        value: 'Profile',
        icon: 'roblox'
      },
      {
        label: 'DevForum',
        href: 'https://devforum.roblox.com/u/uhwebm/summary',
        value: 'Posts',
        icon: 'devforum'
      },
      {
        label: 'Email',
        href: 'mailto:uhwebm.business@protonmail.com',
        value: 'Direct',
        icon: 'email'
      }
    ],
    general: [
      {
        label: 'Discord',
        href: 'https://discord.com/users/1221457893522669662',
        value: 'Primary',
        icon: 'discord'
      },
      {
        label: 'GitHub',
        href: 'https://github.com/uhwebm',
        value: 'Code',
        icon: 'github'
      },
      {
        label: 'Email',
        href: 'mailto:uhwebm.business@protonmail.com',
        value: 'Direct',
        icon: 'email'
      }
    ]
  };
</script>

<Panel eyebrow="Contact" title="Talk with me" {mode}>
  <div class="contact-shell">
    <div class="contact-copy">
      <p class={`status ${statusTone}`}>{status.label}</p>
      <p class="headline">
        {mode === 'roblox' ? 'Roblox systems and platform work.' : 'General engineering and open-source work.'}
      </p>
      <p class="body">
        {mode === 'roblox'
          ? 'Discord is fastest. Roblox and DevForum provide platform context.'
          : 'Discord and email are fastest. GitHub provides public code context.'}
      </p>
    </div>

    <div class="contact-links">
      {#each linksByMode[mode] as link}
        <a class="contact-link" href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
          <span class="logo">
            {#if link.icon === 'discord'}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.3 4.37a16.7 16.7 0 0 0-4.1-1.3l-.2.4c-.1.3-.3.7-.4 1a15.5 15.5 0 0 0-7 0 10 10 0 0 0-.4-1l-.2-.4a16.6 16.6 0 0 0-4.1 1.3C1.4 8 1 11.5 1.1 15a16.9 16.9 0 0 0 5 2.5l.4-.7c.2-.3.3-.5.4-.8-.8-.3-1.5-.7-2.2-1.1l.5-.4c2.1 1 4.4 1.5 6.8 1.5s4.7-.5 6.8-1.5l.5.4c-.7.4-1.4.8-2.2 1.1.1.3.2.5.4.8l.4.7a16.9 16.9 0 0 0 5-2.5c.2-4-.4-7.5-2.7-10.63M8.95 13.12c-.67 0-1.22-.62-1.22-1.37s.54-1.37 1.22-1.37 1.23.62 1.22 1.37c0 .75-.54 1.37-1.22 1.37m6.1 0c-.67 0-1.22-.62-1.22-1.37s.54-1.37 1.22-1.37 1.23.62 1.22 1.37c0 .75-.54 1.37-1.22 1.37"
                />
              </svg>
            {:else if link.icon === 'roblox'}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 2 2 19l17 3 3-17L5 2Zm6 5.6 2.4.4-.4 2.4-2.4-.4.4-2.4Z" />
              </svg>
            {:else if link.icon === 'devforum'}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2 3.3 7v10L12 22l8.7-5V7L12 2Zm0 3.2 5.8 3.3v6.9L12 18.8l-5.8-3.4V8.5L12 5.2Zm-3 3.3h6v1.7H9Zm0 3.1h4.5v1.7H9Z"
                />
              </svg>
            {:else if link.icon === 'github'}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.4 1.3a11.3 11.3 0 0 1 6.2 0c2.3-1.6 3.4-1.3 3.4-1.3.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.9-5.6 6.2.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5"
                />
              </svg>
            {:else if link.icon === 'email'}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M3 5.5h18A1.5 1.5 0 0 1 22.5 7v10a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 17V7A1.5 1.5 0 0 1 3 5.5Zm0 1.8v.2l9 6.1 9-6.1v-.2H3Zm18 9.4V9.6l-8.5 5.7a.9.9 0 0 1-1 0L3 9.6v7.1h18Z"
                />
              </svg>
            {/if}
          </span>

          <div class="meta">
            <span>{link.label}</span>
            <strong>{link.value}</strong>
          </div>
        </a>
      {/each}
    </div>
  </div>
</Panel>

<style>
  .contact-shell {
    display: grid;
    gap: 0.85rem;
  }

  .contact-copy {
    display: grid;
    gap: 0.4rem;
    padding-bottom: 0.25rem;
  }

  .status {
    margin: 0;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  .tone-emerald {
    color: #1f8c5d;
  }

  .tone-red {
    color: #bf4c4c;
  }

  .tone-yellow {
    color: #d2a43a;
  }

  .headline,
  .body {
    margin: 0;
    line-height: 1.6;
  }

  .headline {
    font-size: 0.95rem;
    text-transform: uppercase;
    color: #10242e;
  }

  .body {
    font-size: 0.84rem;
    color: rgba(18, 40, 52, 0.78);
  }

  :global(.dark-page) .headline {
    color: #eef7ff;
  }

  :global(.dark-page) .body {
    color: rgba(213, 233, 255, 0.8);
  }

  .contact-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
    gap: 0.7rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    min-height: 4.25rem;
    padding: 0.8rem 0.9rem;
    border: 1px solid rgba(66, 88, 105, 0.38);
    background: rgba(255, 255, 255, 0.16);
    color: inherit;
    text-decoration: none;
  }

  :global(.dark-page) .contact-link {
    border-color: rgba(128, 161, 193, 0.34);
    background: rgba(14, 25, 39, 0.42);
  }

  .logo {
    display: inline-grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid rgba(66, 88, 105, 0.36);
    flex: 0 0 auto;
  }

  :global(.dark-page) .logo {
    border-color: rgba(128, 161, 193, 0.3);
  }

  svg {
    width: 1.15rem;
    height: 1.15rem;
    fill: #10242e;
  }

  :global(.dark-page) svg {
    fill: #eef7ff;
  }

  .meta {
    display: grid;
    gap: 0.18rem;
  }

  .meta span {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(52, 73, 86, 0.72);
  }

  .meta strong {
    font-size: 0.84rem;
    color: #10242e;
  }

  :global(.dark-page) .meta span {
    color: rgba(160, 193, 223, 0.76);
  }

  :global(.dark-page) .meta strong {
    color: #eef7ff;
  }
</style>
