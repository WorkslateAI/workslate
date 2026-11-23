import React, { useState, useEffect, useRef } from 'react';
import { AITextRenderer } from '../atoms/AITextRenderer';

const RESPONSE_DELAY_MS = 1500;

export const PromptSection: React.FC = () => {
  const [dots, setDots] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => setShowResponse(true), RESPONSE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <section id="prompt" ref={sectionRef} className="py-12 lg:py-20 bg-lavender-100">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="space-y-6 w-full">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-white border border-border rounded-2xl lg:rounded-full px-3 lg:px-4 py-2 max-w-full">
              <span className="text-primary-600 font-bold text-xs lg:text-sm flex-shrink-0">+ Prompt</span>
              <span className="text-text-900 text-xs lg:text-sm min-w-0">
                How do I reconcile my business ledger and move tokens with confidence?
              </span>
              <p className={`text-primary-600 text-[12px] lg:text-xs font-medium flex flex-wrap items-center gap-x-2 transition-opacity duration-500 ${inView && !showResponse ? 'opacity-100' : 'opacity-0'}`}>
                <span className="flex space-x-1 flex-shrink-0">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </span>
                <span>Workslate AI is generating a response<span className="inline-block w-[3ch] text-left">{dots}</span></span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-14 text-center">
          <div className="relative">
            <p aria-hidden="true" className="invisible text-xs lg:text-[20px] font-heading font-bold leading-[1.1] tracking-tight">
              One Connected Platform. Reconcile intelligently, Authorize confidently & Move tokens securely.
            </p>
            <AITextRenderer
              as="span"
              text={showResponse ? 'One Connected Platform. Reconcile intelligently, Authorize confidently & Move tokens securely.' : ''}
              mode="word"
              speed={120}
              className="absolute inset-0 block text-xs lg:text-[20px] font-heading font-bold text-text-900 leading-[1.1] tracking-tight"
            />
          </div>
          <div className="relative mt-4">
            <p aria-hidden="true" className="invisible font-semibold text-sm lg:text-base">
              ASK WORKSLATE AI
            </p>
            <AITextRenderer
              as="span"
              text={showResponse ? 'ASK WORKSLATE AI' : ''}
              mode="word"
              speed={120}
              className="absolute inset-0 block text-primary-600 font-semibold text-sm lg:text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-12 lg:mt-20">
        <div className="border-b border-border"></div>
      </div>
    </section>
  );
};
