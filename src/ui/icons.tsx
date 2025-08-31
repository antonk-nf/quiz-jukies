import React from 'react';

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconPlay: React.FC = () => (
  <svg {...base}><polygon points="5 3 19 12 5 21 5 3" /></svg>
);

export const IconSkip: React.FC = () => (
  <svg {...base}><polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" /></svg>
);

export const IconNext: React.FC = () => (
  <svg {...base}><polyline points="9 18 15 12 9 6" /><line x1="5" y1="12" x2="15" y2="12" /></svg>
);

export const IconStop: React.FC = () => (
  <svg {...base}><rect x="6" y="6" width="12" height="12" rx="1" /></svg>
);

export const IconCopy: React.FC = () => (
  <svg {...base}><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);

export const IconUser: React.FC = () => (
  <svg {...base}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

