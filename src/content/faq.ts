import type { FAQItem } from './types';

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Workslate AI?',
    answer: 'Workslate AI is a platform that tracks and moves tokens across markets and EVM-compatible blockchains with AI-driven automation, peer-to-peer transfer workflows, and a unified real-time dashboard.',
  },
  {
    id: 'faq-2',
    question: 'Which blockchains does Workslate support?',
    answer: 'Workslate supports Ethereum, Polygon, BSC, Arbitrum, and Optimism. We are continuously adding support for additional EVM-compatible networks.',
  },
  {
    id: 'faq-3',
    question: 'Is Web3j integration available?',
    answer: 'Web3j / Java integration is currently planned and in our roadmap. It is not currently available but will be released in a future update.',
  },
  {
    id: 'faq-4',
    question: 'How does the P2P transfer work?',
    answer: 'Our P2P transfer workflow allows you to connect your wallet, select source and destination markets, and execute token transfers with AI-optimized routing for best execution across supported blockchains.',
  },
  {
    id: 'faq-5',
    question: 'Is my data secure?',
    answer: 'Yes, we prioritize security and use industry-standard encryption and security practices. Your wallet connections and transaction data are protected.',
  },
];
