export type Mode = 'roblox' | 'general';
export type View = Mode | 'blog';

export const modes: {
  key: Mode;
  label: string;
  icon: string;
  description: string;
}[] = [
  {
    key: 'roblox',
    label: 'Roblox',
    icon: '<>',
    description: 'My Roblox-specific portfolio, detailing what I specialize in.'
  },
  {
    key: 'general',
    label: 'General',
    icon: '~',
    description: 'General development experience with multiple languages.'
  }
];

export const statsByMode: Record<Mode, { label: string; value: string }[]> = {
  roblox: [
    { label: 'Experience', value: '7 years' },
    { label: 'Visits', value: '26M+' },
    { label: 'Focus', value: 'Backend' }
  ],
  general: [
    { label: 'Experience', value: '4 years' },
    { label: 'Scale', value: '6.5M users' },
    { label: 'Focus', value: 'Open Source' }
  ]
};

export const highlightsByMode: Record<Mode, string[]> = {
  roblox: [
    'Agnostic system design, clean architecture.',
    'Polished, unique systems pushing boundaries on the platform.'
  ],
  general: [
    'Reusable software architecture for all platforms.',
    'Interactive, polished systems on the web and beyond.'
  ]
};

export const summaries: Record<Mode, { descriptor: string; summary: string }> = {
  roblox: {
    descriptor: 'Roblox systems developer',
    summary: 'Building internal infrastructure and technical foundations for high-volume experiences.'
  },
  general: {
    descriptor: 'General systems engineer',
    summary: 'Designing technical systems, interaction layers, and polished runtime behavior with a broader engineering lens.'
  }
};

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value));
