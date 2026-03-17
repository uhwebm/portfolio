import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

export type BlogIndexItem = {
  slug: string;
  title: string;
  date: string;
  description: string;
  archived: boolean;
  unlisted: boolean;
};

export type BlogPost = BlogIndexItem & {
  body: string;
  html: string;
};

const splitFrontmatter = (source: string) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: '',
      body: source
    };
  }

  return {
    frontmatter: match[1],
    body: match[2]
  };
};

const extractFrontmatterValue = (source: string, key: string) => {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return '';

  return match[1].trim().replace(/^"(.*)"$/, '$1');
};

export const getBlogPosts = async () => {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = await readdir(blogDir);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const raw = await readFile(path.join(blogDir, file), 'utf8');
        const { frontmatter, body } = splitFrontmatter(raw);
        const slug = file.replace(/\.mdx$/, '');

        return {
          slug,
          title: extractFrontmatterValue(frontmatter, 'title'),
          date: extractFrontmatterValue(frontmatter, 'date'),
          description: extractFrontmatterValue(frontmatter, 'description'),
          archived: extractFrontmatterValue(frontmatter, 'archived') === 'true',
          unlisted: extractFrontmatterValue(frontmatter, 'unlisted') === 'true',
          body,
          html: await marked.parse(body)
        } satisfies BlogPost;
      })
  );

  return posts
    .filter((post) => !post.unlisted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
