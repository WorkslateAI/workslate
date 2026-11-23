import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../atoms/Button';
import { Logo } from '../atoms/Logo';

export const Header: React.FC = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const features = [
    { id: '01', title: 'Ledger Reconciliation', href: '#feature-01' },
    { id: '02', title: 'Wallet Orchestration', href: '#feature-02' },
    { id: '03', title: 'Settlement Rules', href: '#feature-03' },
    { id: '04', title: 'End-to-End Traceability', href: '#feature-04' },
  ];

  const handleMobileFeatureClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsFeaturesOpen(false);
    setIsMobileMenuOpen(false);

    // Use requestAnimationFrame to scroll after menu closes and layout settles
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          // Set hash for browser history and scroll
          window.location.hash = id;
          // Also manually scroll to ensure it works
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFeaturesOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFeaturesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-10" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <Logo variant="header" size={36} />
          </a>
          
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-primary-600 font-semibold text-sm border-b-2 border-primary-600 pb-0.5">
              Home
            </a>
            <a href="#how-it-works" className="text-text-900 font-medium text-sm hover:text-primary-600 transition-colors">
              How it works
            </a>
            <a href="#global" className="text-text-900 font-medium text-sm hover:text-primary-600 transition-colors">
              Global
            </a>
            <a href="#/docs" className="text-text-900 font-medium text-sm hover:text-primary-600 transition-colors">
              Docs
            </a>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                className="text-text-900 font-medium text-sm hover:text-primary-600 transition-colors flex items-center space-x-1"
                aria-expanded={isFeaturesOpen}
                aria-haspopup="true"
              >
                <span>Features</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isFeaturesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-border shadow-lg py-2">
                  {features.map((feature) => (
                    <a
                      key={feature.id}
                      href={feature.href}
                      className="block px-4 py-2 hover:bg-lavender-50 transition-colors"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      <span className="text-primary-600 font-semibold mr-2">{feature.id}</span>
                      <span className="text-text-900 text-sm">{feature.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden lg:block">
            <Button variant="primary" size="md">
              Register for demo
            </Button>
          </div>
          
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-900 hover:text-primary-600" 
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-6 py-4 space-y-4">
              <a href="#" className="block text-primary-600 font-semibold text-sm">
                Home
              </a>
              <a href="#how-it-works" className="block text-text-900 font-medium text-sm hover:text-primary-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                How it works
              </a>
              <a href="#global" className="block text-text-900 font-medium text-sm hover:text-primary-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Global
              </a>
              <a href="#/docs" className="block text-text-900 font-medium text-sm hover:text-primary-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                Docs
              </a>
              <div className="space-y-2">
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="text-text-900 font-medium text-sm hover:text-primary-600 transition-colors flex items-center space-x-1"
                  aria-expanded={isFeaturesOpen}
                >
                  <span>Features</span>
                  <svg className={`w-4 h-4 transition-transform ${isFeaturesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isFeaturesOpen && (
                  <div className="pl-4 space-y-2">
                    {features.map((feature) => (
                      <a
                        key={feature.id}
                        href={feature.href}
                        className="block text-text-900 text-sm hover:text-primary-600 transition-colors"
                        onClick={(e) => handleMobileFeatureClick(e, feature.href.substring(1))}
                      >
                        <span className="text-primary-600 font-semibold mr-2">{feature.id}</span>
                        <span>{feature.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <Button variant="primary" size="md" className="w-full">
                Register for demo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
