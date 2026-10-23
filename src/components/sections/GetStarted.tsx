import React from 'react';
import { Button } from '../atoms/Button';

export const GetStarted: React.FC = () => {
  return (
    <section id="get-started" className="py-20 bg-gradient-to-b from-navy-900 to-navy-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Get Started Today</h2>
        <p className="text-navy-300 mb-8 max-w-2xl mx-auto">
          Start tracking and moving tokens across markets and blockchains with AI-driven automation.
          Join thousands of users already using Workslate.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            Create Free Account
          </Button>
          <Button variant="secondary" size="lg">
            Contact Sales
          </Button>
        </div>
        
        <p className="text-sm text-navy-300 mt-6">
          No credit card required. Start your free trial today.
        </p>
      </div>
    </section>
  );
};
