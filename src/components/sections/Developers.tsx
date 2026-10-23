import React from 'react';
import { Badge } from '../atoms/Badge';
import { developersCopy } from '../../content/copy';

export const Developers: React.FC = () => {
  return (
    <section id="docs" className="py-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{developersCopy.heading}</h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            {developersCopy.description}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-navy-800 border border-navy-700 rounded-lg p-8 shadow-sm">
            <div className="mb-4">
              <Badge variant="warning">Roadmap</Badge>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {developersCopy.web3jTitle}
            </h3>
            <p className="text-navy-300">
              {developersCopy.web3jDescription}
            </p>
            
            <div className="mt-6 p-4 bg-navy-700 border border-navy-600 rounded-lg">
              <p className="text-sm text-navy-200">
                <strong>Note:</strong> Web3j / Java integration is planned but not currently available. 
                Check back for updates on our roadmap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
