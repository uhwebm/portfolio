import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/server/blogs';
import { getSiteConfig } from '$lib/server/config';

type LangItem = {
  name: string;
  icon: string;
};

type TechItem = {
  name: string;
  icon: string;
};

const extractValue = (source: string, key: string) => {
  const match = source.match(new RegExp(`^${key}\\s*=\\s*"([^"]+)"`, 'm'));
  return match?.[1] ?? '';
};

export const load: PageServerLoad = async () => {
  const root = process.cwd();
  const langsDir = path.join(root, 'content', 'langs');
  const techDir = path.join(root, 'content', 'tech');

  const [langFiles, techFiles, posts, config] = await Promise.all([
    readdir(langsDir),
    readdir(techDir),
    getBlogPosts(),
    getSiteConfig()
  ]);

  const languages = (
    await Promise.all(
      langFiles
        .filter((file) => file.endsWith('.toml'))
        .map(async (file) => {
          const source = await readFile(path.join(langsDir, file), 'utf8');
          const name = extractValue(source, 'name');

          return {
            name,
            icon: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`
          } satisfies LangItem;
        })
    )
  ).sort((a, b) => a.name.localeCompare(b.name));

  const technologies = (
    await Promise.all(
      techFiles
        .filter((file) => file.endsWith('.toml'))
        .map(async (file) => {
          const source = await readFile(path.join(techDir, file), 'utf8');

          return {
            name: extractValue(source, 'name'),
            icon: extractValue(source, 'icon')
          } satisfies TechItem;
        })
    )
  ).sort((a, b) => a.name.localeCompare(b.name));

  return {
    config,
    languages,
    technologies,
    posts
  };
};
