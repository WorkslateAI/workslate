import React from 'react';

export const SideSection: React.FC = () => {
  const cards = [
    {
      title: 'Seamless',
      description: 'One flow across every market.',
    },
    {
      title: 'Secure',
      description: 'Your keys, your control.',
    },
    {
      title: 'Global',
      description: 'Local to international reach.',
    },
  ];

  return (
    <section id="global" className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          <div className="space-y-4 lg:space-y-6">
            <p className="text-primary-600 font-semibold text-[10px] lg:text-xs uppercase tracking-widest">
              Global reach
            </p>
            
            <h2 className="text-[28px] lg:text-[34px] font-heading font-bold text-text-900">
              Seamless. Secure. Global.
            </h2>
            
            <p className="text-text-500 text-sm lg:text-base leading-relaxed">
              Move value across regions without friction, with security built into every transfer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {cards.map((card, index) => (
              <div 
                key={index}
                className="bg-white border border-border rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-[0_4px_24px_rgba(30,50,150,0.06)]"
              >
                <h3 className="text-text-900 font-bold text-base lg:text-lg mb-2">{card.title}</h3>
                <p className="text-text-500 text-xs lg:text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-xl lg:rounded-2xl border border-border p-4 lg:p-8">
          <img 
            src="/assets/images/local-wallet-international-tokens.png" 
            alt="Banner showing local wallet to international token movement"
            width="1200"
            height="600"
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-12 lg:mt-20">
        <div className="border-b border-border"></div>
      </div>
    </section>
  );
};
