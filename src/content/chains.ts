import type { Market } from './types';

export const markets: Market[] = [
  { id: 'market-a', name: 'Market A', category: 'market', order: 1 },
  { id: 'market-b', name: 'Market B', category: 'market', order: 2 },
  { id: 'market-c', name: 'Market C', category: 'market', order: 3 },
];

// Currently supported chain: Ethereum (stablecoin settlement)
export const chains: Market[] = [
  { id: 'ethereum', name: 'Ethereum', category: 'chain', order: 1 },
];

// EVM-compatible networks on the roadmap (see FAQ: continuously adding support)
export const roadmapChains: Market[] = [
  { id: 'polygon', name: 'Polygon', category: 'chain', order: 1 },
  { id: 'bsc', name: 'BSC', category: 'chain', order: 2 },
  { id: 'arbitrum', name: 'Arbitrum', category: 'chain', order: 3 },
  { id: 'optimism', name: 'Optimism', category: 'chain', order: 4 },
];

// SVG icon assets served from public/assets/svg
export const icons = {
  LUNAR_512: '/assets/svg/lunar-coin-logo-512.svg',
  LUNAR_256: '/assets/svg/lunar-coin-logo-256.svg',
  LUNAR_128: '/assets/svg/lunar-coin-logo-128.svg',
} as const;

export const currencies = [
  { symbol: '$', name: 'USD' },
  { symbol: '€', name: 'EUR' },
  { symbol: '₿', name: 'BTC' },
  { symbol: 'Ł', name: 'LUNAR', icon: icons.LUNAR_256 },
];
