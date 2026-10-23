import React from 'react';
import { FeatureHeading } from '../molecules/FeatureHeading';
import { MarketFlow, EvmHub } from '../svg';
import { features } from '../../content/features';

export const FeatureColumns: React.FC = () => {
  return (
    <section id="features" className="py-16 lg:py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.number} className="space-y-4 lg:space-y-6">
              <FeatureHeading number={feature.number} title={feature.title} />
              <p className="text-sm lg:text-base text-black-700">{feature.description}</p>
              {feature.number === '01' && <MarketFlow />}
              {feature.number === '02' && <EvmHub />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
