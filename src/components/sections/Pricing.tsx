import React from 'react';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Pricing</h2>
          <p className="text-navy-300 max-w-2xl mx-auto">
            Flexible pricing plans designed for businesses of all sizes. Contact us for enterprise solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="border border-navy-700 bg-navy-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
            <p className="text-navy-300 mb-4">For individuals and small teams</p>
            <p className="text-3xl font-bold text-white mb-6">Free</p>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>• Basic token tracking</li>
              <li>• Up to 100 transactions/month</li>
              <li>• Community support</li>
            </ul>
          </div>
          
          <div className="border-2 border-blue-600 bg-navy-900 rounded-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
            <p className="text-navy-300 mb-4">For growing businesses</p>
            <p className="text-3xl font-bold text-white mb-6">$99<span className="text-sm font-normal text-navy-300">/mo</span></p>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>• Advanced analytics</li>
              <li>• Unlimited transactions</li>
              <li>• Priority support</li>
            </ul>
          </div>
          
          <div className="border border-navy-700 bg-navy-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-navy-300 mb-4">For large organizations</p>
            <p className="text-3xl font-bold text-white mb-6">Custom</p>
            <ul className="space-y-2 text-sm text-navy-300">
              <li>• Custom integrations</li>
              <li>• Dedicated support</li>
              <li>• SLA guarantees</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
