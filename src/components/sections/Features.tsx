import React, { useState, useEffect, useRef } from 'react';

export const Features: React.FC = () => {
  const [activeId, setActiveId] = useState('feature-01');
  const sidebarRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: 'feature-01',
      number: '01',
      title: 'Chain of wallet token movement',
      subtitle: 'Follow every token from wallet to wallet, step by step.',
      image: '/assets/images/market-a-b-c-currency-tokens.png',
      alt: 'Market A B C currency tokens diagram',
    },
    {
      id: 'feature-02',
      number: '02',
      title: 'EVM nodes – your token home',
      subtitle: 'Know where your token lives and which chains it runs on.',
      image: '/assets/images/evm-nodes-workslate.png',
      alt: 'EVM nodes Workslate diagram',
    },
    {
      id: 'feature-03',
      number: '03',
      title: 'Single source of truth',
      subtitle: 'One real-time view of all movements across chains and markets.',
      image: '/assets/images/token-movement-dashboard.png',
      alt: 'Token movement dashboard',
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    features.forEach((feature) => {
      const element = document.getElementById(feature.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="features" className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-8">
          <div className="hidden lg:block sticky top-24 h-fit" ref={sidebarRef}>
            <div className="bg-white border border-border rounded-xl p-4 shadow-[0_4px_24px_rgba(30,50,150,0.06)]">
              <p className="text-primary-600 font-semibold text-xs uppercase tracking-widest mb-4">
                Features
              </p>
              <div className="space-y-2">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => handleScroll(feature.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeId === feature.id
                        ? 'bg-lavender-200 text-primary-600'
                        : 'text-text-900 hover:bg-lavender-50'
                    }`}
                  >
                    <span className="font-semibold mr-2">{feature.number}</span>
                    {feature.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                id={feature.id}
                className="bg-white border border-border rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-[0_4px_24px_rgba(30,50,150,0.06)] scroll-mt-32"
              >
                <div className="flex items-start space-x-3 lg:space-x-4 mb-4">
                  <span className="text-primary-600 font-bold text-xl lg:text-2xl flex-shrink-0">
                    {feature.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-[18px] lg:text-[22px] font-heading font-semibold text-text-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-500 text-sm lg:text-base">{feature.subtitle}</p>
                  </div>
                </div>
                <div className="flex justify-center mt-4 lg:mt-6">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    width="720"
                    height="480"
                    loading="lazy"
                    className="max-w-[720px] w-full h-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
