import React from 'react';
import { Button } from '../atoms/Button';
import { PlayIcon } from '../atoms/PlayIcon';

export const HowItWorks: React.FC = () => {
  const steps = [
    { id: '1', text: 'Connect your wallet to the agent.' },
    { id: '2', text: 'Choose the markets you operate in.' },
    { id: '3', text: 'The agent moves and tracks every token.' },
  ];

  return (
    <section id="how-it-works" className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <p className="text-primary-600 font-semibold text-[10px] lg:text-xs uppercase tracking-widest">
              Section 2 · How it works
            </p>
            
            <h2 className="text-[28px] lg:text-[34px] font-heading font-bold text-text-900">
              Three steps from wallet to market
            </h2>
            
            <ol className="space-y-4 lg:space-y-6">
              {steps.map((step) => (
                <li key={step.id} className="flex items-start space-x-3 lg:space-x-4">
                  <span className="text-primary-600 font-bold text-base lg:text-lg flex-shrink-0">{step.id}</span>
                  <p className="text-text-900 text-sm lg:text-base">{step.text}</p>
                </li>
              ))}
            </ol>
            
            <Button variant="primary" size="md">
              Register for demo
            </Button>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <button 
              className="w-full rounded-2xl lg:rounded-3xl bg-dark-panel p-6 lg:p-8 flex flex-col items-center justify-center aspect-video hover:bg-dark-panel-deep transition-colors"
              aria-label="Watch how it works video"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center mb-3 lg:mb-4">
                <PlayIcon className="w-6 h-6 lg:w-8 lg:h-8 text-primary-600" />
              </div>
              <span className="text-white font-bold text-sm lg:text-base text-center">Watch how it works</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-12 lg:mt-20">
        <div className="border-b border-border"></div>
      </div>
    </section>
  );
};
