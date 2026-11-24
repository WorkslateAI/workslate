import type { DashboardData } from './types';

export const dashboardData: DashboardData = {
  dataStatus: 'simulated',
  volume: '$2.4M',
  transactionCount: '1,247',
  transactions: [
    {
      id: 'tx-001',
      sender: 'Acme Wholesale Ltd',
      receiver: 'Northwind Traders',
      chain: 'Ethereum',
      asset: 'USDC',
      amount: '$12,450',
      status: 'Settled',
    },
    {
      id: 'tx-002',
      sender: 'Northwind Traders',
      receiver: 'Continental Supply Co',
      chain: 'Ethereum',
      asset: 'USDC',
      amount: '$8,320',
      status: 'Pending Authorization',
    },
    {
      id: 'tx-003',
      sender: 'Acme Wholesale Ltd',
      receiver: 'Continental Supply Co',
      chain: 'Ethereum',
      asset: 'USDC',
      amount: '$24,100',
      status: 'Settled',
    },
  ],
};
