import React from 'react';
import { Badge } from '../atoms/Badge';
import { StatCard } from '../molecules/StatCard';
import { TransactionRow } from '../molecules/TransactionRow';
import { dashboardData } from '../../content/dashboard';

export const DashboardDemo: React.FC = () => {
  return (
    <section id="dashboard-demo" className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Badge variant="info">Simulated Data</Badge>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-8">Single Source of Truth</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <StatCard label="Total Volume" value={dashboardData.volume} />
          <StatCard label="Transactions" value={dashboardData.transactionCount} />
        </div>
        
        <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {dashboardData.transactions.map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
