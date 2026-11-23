import React from 'react';

export const BusinessProblem: React.FC = () => {
  const painPoints = [
    'Inconsistent buyer and supplier ledger records.',
    'Unmatched invoices, credits and payment references.',
    'Manual reconciliation and exception handling.',
    'Delayed settlement authorization.',
    'Limited visibility into actual asset movement.',
  ];

  return (
    <section id="business-problem" className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-[30.6px] lg:text-[30.6px] font-heading font-bold text-text-900">
                The Business Problem-
              </h2>
              <p className="text-primary-600 font-semibold text-[16px] lg:text-xs uppercase tracking-widest">
                Reconciliation Gap
              </p>
            </div>

            <p className="text-text-900 font-semibold text-sm lg:text-base leading-relaxed max-w-xl">
              Disconnected ledgers. Delayed settlements. Limited transparency.
            </p>

            <p className="text-text-500 text-sm lg:text-base leading-relaxed max-w-xl">
              Businesses struggle to reconcile financial obligations across multiple counterparties, ERP systems and payment networks.
            </p>

            <p className="text-primary-600 font-semibold text-sm lg:text-base leading-relaxed max-w-xl">
              Workslate AI transform fragmented financial reconciliation to trusted digital settlement.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-lavender-50 border border-border p-6 lg:p-8 shadow-[0_4px_24px_rgba(30,50,150,0.06)]">
              <ul className="space-y-3 lg:space-y-4">
                {painPoints.map((point) => (
                  <li key={point} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                    <p className="text-text-900 text-sm lg:text-base">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-12 lg:mt-20">
        <div className="border-b border-border"></div>
      </div>
    </section>
  );
};
