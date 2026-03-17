import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type SiteConfig = {
  status: {
    state: string;
    available: { label: string; color: string };
    busy: { label: string; color: string };
    commissions_only: { label: string; color: string };
  };
};

const extractSectionValue = (source: string, section: string, key: string) => {
  const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(
    new RegExp(`\\[${escapedSection}\\][\\s\\S]*?^${key}\\s*=\\s*"([^"]+)"`, 'm')
  );
  return match?.[1] ?? '';
};

export const getSiteConfig = async () => {
  const configPath = path.join(process.cwd(), 'config.toml');
  const source = await readFile(configPath, 'utf8');

  return {
    status: {
      state: extractSectionValue(source, 'status', 'state'),
      available: {
        label: extractSectionValue(source, 'status.available', 'label'),
        color: extractSectionValue(source, 'status.available', 'color')
      },
      busy: {
        label: extractSectionValue(source, 'status.busy', 'label'),
        color: extractSectionValue(source, 'status.busy', 'color')
      },
      commissions_only: {
        label: extractSectionValue(source, 'status.commissions_only', 'label'),
        color: extractSectionValue(source, 'status.commissions_only', 'color')
      }
    }
  } satisfies SiteConfig;
};
