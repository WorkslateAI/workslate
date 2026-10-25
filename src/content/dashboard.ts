import type { DashboardData } from './types';

export const dashboardData: DashboardData = {
  dataStatus: 'simulated',
  volume: '$2.4M',
  transactionCount: '1,247',
  transactions: [
    {
      id: 'tx-001',
      sourceMarket: 'Market A',
      destinationMarket: 'Market B',
      chain: 'Ethereum',
      amount: '$12,450',
      status: 'Completed',
    },
    {
      id: 'tx-002',
      sourceMarket: 'Market B',
      destinationMarket: 'Market C',
      chain: 'Polygon',
      amount: '$8,320',
      status: 'Pending',
    },
    {
      id: 'tx-003',
      sourceMarket: 'Market A',
      destinationMarket: 'Market C',
      chain: 'Arbitrum',
      amount: '$24,100',
      status: 'Completed',
    },
  ],
};
