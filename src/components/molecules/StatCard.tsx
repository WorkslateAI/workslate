import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="bg-navy-800 border border-navy-700 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-navy-300">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};
