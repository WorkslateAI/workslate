import type { Market } from './types';

export const markets: Market[] = [
  { id: 'market-a', name: 'Market A', category: 'market', order: 1 },
  { id: 'market-b', name: 'Market B', category: 'market', order: 2 },
  { id: 'market-c', name: 'Market C', category: 'market', order: 3 },
];

export const chains: Market[] = [
  { id: 'ethereum', name: 'Ethereum', category: 'chain', order: 1 },
  { id: 'polygon', name: 'Polygon', category: 'chain', order: 2 },
  { id: 'bsc', name: 'BSC', category: 'chain', order: 3 },
  { id: 'arbitrum', name: 'Arbitrum', category: 'chain', order: 4 },
  { id: 'optimism', name: 'Optimism', category: 'chain', order: 5 },
];

export const currencies = [
  { symbol: '$', name: 'USD' },
  { symbol: '€', name: 'EUR' },
  { symbol: '₿', name: 'BTC' },
];
