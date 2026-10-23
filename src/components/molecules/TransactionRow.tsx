import React from 'react';
import type { Transaction } from '../../content/types';

interface TransactionRowProps {
  transaction: Transaction;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-navy-700 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {transaction.sourceMarket} → {transaction.destinationMarket}
        </p>
        <p className="text-xs text-navy-300">{transaction.chain}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{transaction.amount}</p>
        <p className="text-xs text-navy-300">{transaction.status}</p>
      </div>
    </div>
  );
};
