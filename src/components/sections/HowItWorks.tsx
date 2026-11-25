import React, { useState, useEffect } from 'react';
import { PlayIcon } from '../atoms/PlayIcon';
import { howItWorksCopy } from '../../content/copy';

export const HowItWorks: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const win = window as unknown as { __workslatePlayHowItWorks?: boolean };
    const handlePlayRequest = () => {
      win.__workslatePlayHowItWorks = false;
      setIsPlaying(true);
    };
    window.addEventListener('workslate:play-how-it-works-video', handlePlayRequest);
    // The play request can fire before this idle-deferred section hydrates;
    // honor the persisted flag so it isn't lost.
    if (win.__workslatePlayHowItWorks) {
      win.__workslatePlayHowItWorks = false;
      setIsPlaying(true);
    }
    return () => window.removeEventListener('workslate:play-how-it-works-video', handlePlayRequest);
  }, []);

  const steps = howItWorksCopy.steps;

  return (
    <section id="how-it-works" className="py-12 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2 flex flex-wrap items-baseline gap-x-3">
            <h2 className="text-[30.6px] lg:text-[40.8px] font-heading font-bold text-text-900 whitespace-nowrap">
              How it works-
            </h2>
            <p className="text-primary-600 font-semibold text-[12px] lg:text-xs uppercase tracking-widest">
              {howItWorksCopy.eyebrow}
            </p>
          </div>

          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <ol className="space-y-4 lg:space-y-6">
              {steps.map((step) => (
                <li key={step.id} className="flex items-start space-x-3 lg:space-x-4">
                  <span className="text-primary-600 font-bold text-base lg:text-lg flex-shrink-0">{step.id}</span>
                  <div className="space-y-1">
                    <p className="text-primary-600 font-semibold text-[12px] lg:text-xs uppercase tracking-widest">
                      {step.label}
                    </p>
                    <p className="text-text-900 font-semibold text-sm lg:text-base leading-relaxed">
                      {step.title}
                    </p>
                    <p className="text-text-500 text-sm lg:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="relative order-1 lg:order-2">
            {isPlaying ? (
              <video
                src="/assets/videos/tokens_at_the_speed_of_rules.mp4"
                className="w-full rounded-2xl lg:rounded-3xl aspect-video bg-dark-panel"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                className="w-full rounded-2xl lg:rounded-3xl bg-dark-panel p-6 lg:p-8 flex flex-col items-center justify-center aspect-video hover:bg-dark-panel-deep transition-colors"
                aria-label="Watch how it works video"
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center mb-3 lg:mb-4">
                  <PlayIcon className="w-6 h-6 lg:w-8 lg:h-8 text-primary-600" />
                </div>
                <span className="text-white font-bold text-sm lg:text-base text-center">Watch how it works</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-12 lg:mt-20">
        <div className="border-b border-border"></div>
      </div>
    </section>
  );
};
