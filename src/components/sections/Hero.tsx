import React, { useState, useEffect } from 'react';
import { Button } from '../atoms/Button';
import { PlayIcon } from '../atoms/PlayIcon';
import { AITextRenderer } from '../atoms/AITextRenderer';

export const Hero: React.FC = () => {
  const [dots, setDots] = useState('');
  const [promptDone, setPromptDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative bg-lavender-100 py-12 lg:py-12 lg:py-12 overflow-x-clip">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="space-y-6 w-full">
            <p className="text-primary-600 font-semibold text-[16px] uppercase text-center">
              AI-POWERED • FINANCIAL ORCHESTRATION • BLOCKCHAIN-READY
            </p>

            <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-white border border-border rounded-2xl lg:rounded-full px-3 lg:px-4 py-2 max-w-full">
              <span className="text-primary-600 font-bold text-xs lg:text-sm flex-shrink-0">+ Prompt</span>
              <span className="grid min-w-0">
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 text-text-900 text-xs lg:text-sm min-w-0 break-words">
                  How do I reconcile my business ledger and move tokens with confidence?
                </span>
                <AITextRenderer
                  as="span"
                  text="How do I reconcile my business ledger and move tokens with confidence?"
                  mode="character"
                  speed={35}
                  className="col-start-1 row-start-1 text-text-900 text-xs lg:text-sm min-w-0"
                  onComplete={() => setPromptDone(true)}
                />
              </span>
              <p className={`text-primary-600 text-[12px] lg:text-xs font-medium flex flex-wrap items-center gap-x-2 transition-opacity duration-500 ${promptDone ? 'opacity-100' : 'opacity-0'}`}>
              <span className="flex space-x-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse"></span>
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </span>
                <span>Workslate AI is generating a response<span className="inline-block w-[3ch] text-left">{dots}</span></span>
              </p>
            </div>
            

        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8 lg:mt-12">
          <div className="space-y-6 order-2 lg:order-1">
            <h1 id="page-heading" className="text-[40.8px] font-heading font-bold text-text-900 leading-[1.1] tracking-tight">
              {/* The confidence span animates from first paint — gating it on
                  promptDone (~2.4s of typing) delayed the h1's settled paint
                  and inflated LCP. */}
              Reconcile First. Move Value <span className="hero-confidence hero-confidence-animate text-primary-600">with Confidence.</span>
            </h1>

            <p className="text-text-900 font-semibold text-sm lg:text-base leading-relaxed max-w-xl">
              Intelligent Ledger Reconciliation. Programmable B2B Token Movement.
            </p>

            <p className="text-text-500 text-sm lg:text-base leading-relaxed max-w-xl">
              Workslate connects business obligations, financial ledgers and corporate wallets to enable validated, compliant and auditable business-to-business token transfers.
            </p>

            <ul className="text-primary-600 font-medium text-sm lg:text-base max-w-xl list-disc list-inside space-y-1">
              <li>Reconcile the obligation.</li>
              <li>Authorize the movement.</li>
              <li>Trust the settlement.</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg" className="flex items-center justify-center space-x-2">
                <PlayIcon className="w-4 h-4" />
                <span>Register for demo</span>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center justify-center space-x-2"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('workslate:play-how-it-works-video'));
                }}
              >
                <PlayIcon className="w-4 h-4" />
                <span>Watch video</span>
              </Button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="rounded-2xl bg-lavender-50 p-4 lg:p-3 lg:scale-105 xl:scale-[1.20]">
              <picture>
                {/* Mobile (<=640px): fixed 480w variants per format */}
                <source
                  media="(max-width: 640px)"
                  srcSet="/assets/images/hero-markets-abc-workslate-centre-480w.avif"
                  type="image/avif"
                />
                <source
                  media="(max-width: 640px)"
                  srcSet="/assets/images/hero-markets-abc-workslate-centre-480w.webp"
                  type="image/webp"
                />
                <source
                  media="(max-width: 640px)"
                  srcSet="/assets/images/hero-markets-abc-workslate-centre-480w.jpeg"
                />
                {/* Tablet/desktop: responsive variants */}
                <source
                  srcSet="/assets/images/hero-markets-abc-workslate-centre-768w.avif 768w,
                          /assets/images/hero-markets-abc-workslate-centre-1200w.avif 1200w,
                          /assets/images/hero-markets-abc-workslate-centre.avif 2400w"
                  sizes="(max-width: 1023px) calc(100vw - 48px), 680px"
                  type="image/avif"
                />
                <source
                  srcSet="/assets/images/hero-markets-abc-workslate-centre-768w.webp 768w,
                          /assets/images/hero-markets-abc-workslate-centre-1200w.webp 1200w,
                          /assets/images/hero-markets-abc-workslate-centre.webp 2400w"
                  sizes="(max-width: 1023px) calc(100vw - 48px), 680px"
                  type="image/webp"
                />
                {/* fetchpriority spread: React 18 drops camelCase
                    fetchPriority with a warning; the lowercase DOM spelling
                    is correct but missing from its JSX typings. */}
                <img
                  src="/assets/images/hero-markets-abc-workslate-centre-1200w.jpeg"
                  srcSet="/assets/images/hero-markets-abc-workslate-centre-480w.jpeg 480w,
                          /assets/images/hero-markets-abc-workslate-centre-768w.jpeg 768w,
                          /assets/images/hero-markets-abc-workslate-centre-1200w.jpeg 1200w,
                          /assets/images/hero-markets-abc-workslate-centre.jpeg 2400w"
                  sizes="(max-width: 640px) 480px, (max-width: 1023px) calc(100vw - 48px), 680px"
                  alt="Workslate AI performing intelligent reconciliation of business records — invoices, adjustments and settlements — then moving programmable tokens securely and with trust between your business and your counterparty."
                  width="2400"
                  height="1350"
                  loading="eager"
                  decoding="async"
                  {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  className="w-full h-auto"
                />
              </picture>
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
