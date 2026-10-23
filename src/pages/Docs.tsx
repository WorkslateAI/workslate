import React from 'react';
import { Header } from '../components/sections/Header';
import { Footer } from '../components/sections/Footer';
import { Button } from '../components/atoms/Button';

const docsResources = [
  {
    category: 'Getting Started',
    resources: [
      {
        title: 'Introduction to Web3j',
        description: 'Learn the basics of Web3j and how to get started with Ethereum development in Java.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/',
      },
      {
        title: 'Quick Start Guide',
        description: 'A quick guide to set up your first Web3j project and interact with Ethereum.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/getting-started.html',
      },
    ],
  },
  {
    category: 'Core Concepts',
    resources: [
      {
        title: 'Smart Contracts',
        description: 'Deploy and interact with smart contracts using Web3j.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/smart_contracts.html',
      },
      {
        title: 'Wallet Management',
        description: 'Manage Ethereum wallets and accounts securely.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/wallets.html',
      },
      {
        title: 'Transactions',
        description: 'Send and receive transactions on the Ethereum network.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/transactions.html',
      },
    ],
  },
  {
    category: 'Advanced Topics',
    resources: [
      {
        title: 'Event Filters',
        description: 'Filter and listen to blockchain events in real-time.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/event_filters.html',
      },
      {
        title: 'Gas Management',
        description: 'Optimize gas usage and manage gas prices for transactions.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/gas.html',
      },
      {
        title: 'EVM Integration',
        description: 'Deep dive into EVM-compatible blockchain integration.',
        url: 'https://docs.web3j.io/4.9.8/web3j_evm/',
      },
    ],
  },
];

export const Docs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 lg:py-20">
          <div className="mb-12">
            <h1 className="text-[34px] lg:text-5xl font-heading font-bold text-text-900 mb-4">
              Documentation
            </h1>
            <p className="text-text-500 text-base lg:text-lg max-w-2xl">
              Explore comprehensive documentation for Web3j EVM integration. Learn how to interact with Ethereum and EVM-compatible blockchains using Java.
            </p>
          </div>

          <div className="space-y-12">
            {docsResources.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-[22px] lg:text-2xl font-heading font-semibold text-text-900 mb-6">
                  {section.category}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.resources.map((resource, resourceIndex) => (
                    <a
                      key={resourceIndex}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white border border-border rounded-xl p-6 shadow-[0_4px_24px_rgba(30,50,150,0.06)] hover:shadow-[0_8px_32px_rgba(30,50,150,0.12)] transition-all duration-200"
                    >
                      <h3 className="text-text-900 font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-text-500 text-sm leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <span className="text-primary-600 text-sm font-medium inline-flex items-center">
                        Read documentation
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-lavender-100 rounded-2xl">
            <h3 className="text-text-900 font-semibold text-xl mb-3">
              Need more help?
            </h3>
            <p className="text-text-500 text-base mb-6">
              Can't find what you're looking for? Check out the official Web3j documentation or reach out to our support team.
            </p>
            <Button variant="primary" size="md">
              Visit Official Docs
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
