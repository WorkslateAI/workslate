import React, { useState, useEffect, useRef } from 'react';

export const Features: React.FC = () => {
  const [activeId, setActiveId] = useState('feature-01');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // `widths` lists every generated variant width; the last entry is the
  // intrinsic width served by the extensionless base filename.
  const features = [
    {
      id: 'feature-01',
      number: '01',
      title: 'Multi-Party Ledger Reconciliation',
      subtitle: 'Match business obligations, invoices, credits and settlements across counterparties.',
      image: '/assets/images/market-a-b-c-currency-tokens.png',
      widths: [480, 768, 1200, 2560],
      width: 2560,
      height: 1440,
      alt: 'Multi-party ledger reconciliation across market counterparties',
    },
    {
      id: 'feature-02',
      number: '02',
      title: 'Corporate Wallet Orchestration',
      subtitle: 'Connect verified business wallets and coordinate token movements.',
      image: '/assets/images/wallet-orchestration.png',
      widths: [480, 768, 1200, 2560],
      width: 2560,
      height: 1440,
      alt: 'Orchestration hub coordinating verified corporate business wallets',
    },
    {
      id: 'feature-03',
      number: '03',
      title: 'Programmable Settlement Rules',
      subtitle: 'Enforce compliance, transfer limits and conditional payment authorization.',
      image: '/assets/images/evm-nodes-workslate.png',
      widths: [480, 768, 1200, 2560],
      width: 2560,
      height: 1440,
      alt: 'EVM nodes enforcing programmable settlement rules',
    },
    {
      id: 'feature-04',
      number: '04',
      title: 'End-to-End Transaction Traceability',
      subtitle: 'Link business records, workflows, smart contracts and blockchain transactions.',
      image: '/assets/images/token-movement-traceability.png',
      widths: [480, 768, 1200, 2560],
      width: 2560,
      height: 1440,
      alt: 'End-to-end transaction traceability across records, workflows, and blockchain transactions',
    },
  ];

  // Builds "file-Nw.ext Nw, ..., file.ext BASEw" — the final (base) width has
  // no size-suffixed file, it is the full-resolution asset itself.
  const buildSrcSet = (image: string, widths: number[], ext: string) =>
    widths
      .map((w, i) =>
        i === widths.length - 1
          ? `${image.replace('.png', `.${ext}`)} ${w}w`
          : `${image.replace('.png', `-${w}w.${ext}`)} ${w}w`
      )
      .join(', ');

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
        <div className="flex flex-wrap items-baseline gap-x-3 mb-8 lg:mb-12">
          <h2 className="text-[30.6px] lg:text-[40.8px] font-heading font-bold text-text-900 whitespace-nowrap">
            Features-
          </h2>
          <p className="text-primary-600 font-semibold text-[12px] lg:text-xs uppercase tracking-widest">
            Intelligence meets execution
          </p>
        </div>

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
                    <h3 className="text-[21.6px] lg:text-[26.4px] font-heading font-semibold text-text-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-500 text-sm lg:text-base">{feature.subtitle}</p>
                  </div>
                </div>
                <div className="flex justify-center mt-4 lg:mt-6">
                  <picture>
                    {/* Full width-described srcset per format: the browser
                        picks the smallest variant that satisfies the rendered
                        size at the device's DPR, on every viewport. */}
                    <source
                      srcSet={buildSrcSet(feature.image, feature.widths, 'avif')}
                      sizes="(max-width: 1024px) calc(100vw - 98px), 720px"
                      type="image/avif"
                    />
                    <source
                      srcSet={buildSrcSet(feature.image, feature.widths, 'webp')}
                      sizes="(max-width: 1024px) calc(100vw - 98px), 720px"
                      type="image/webp"
                    />
                    <img
                      src={feature.image.replace('.png', '-768w.jpeg')}
                      srcSet={buildSrcSet(feature.image, feature.widths, 'jpeg')}
                      sizes="(max-width: 1024px) calc(100vw - 98px), 720px"
                      alt={feature.alt}
                      width={feature.width}
                      height={feature.height}
                      loading="lazy"
                      decoding="async"
                      className="max-w-[720px] w-full h-auto"
                    />
                  </picture>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
