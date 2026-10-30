import React from 'react';
import { Logo } from '../atoms/Logo';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-dark-panel-deep text-white py-8 lg:py-12">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="border-t border-primary-600/30 pt-6 lg:pt-8 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center">
              <Logo variant="footer" size={32} />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 lg:space-x-6">
              <a href="#/docs" className="text-text-400 hover:text-white text-sm transition-colors">
                Docs
              </a>
              <a href="/terms.html" className="text-text-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="/privacy.html" className="text-text-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies.html" className="text-text-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-text-700/30 pt-6 lg:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <p className="text-text-500 text-xs lg:text-sm">
              © 2026 Workslate AI. All rights reserved.
            </p>
            <p className="text-text-500 text-xs lg:text-sm">
              Founded in 2026 · From market to market, your token everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
