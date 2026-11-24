import type { FAQItem } from './types';

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Workslate AI?',
    answer: 'Workslate AI connects business obligations, financial ledgers and corporate wallets to enable validated, compliant and auditable business-to-business token transfers with intelligent ledger reconciliation.',
  },
  {
    id: 'faq-2',
    question: 'Which blockchains does Workslate support?',
    answer: 'Workslate supports Ethereum and Stablecoin. We are continuously adding support for additional EVM-compatible networks.',
  },
  {
    id: 'faq-3',
    question: 'Is Web3j integration available?',
    answer: 'Web3j / Java integration is currently planned and in our roadmap. It is not currently available but will be released in a future update.',
  },
  {
    id: 'faq-4',
    question: 'How does the transfer workflow work?',
    answer: 'Connect your business records and corporate wallets, let AI agents reconcile obligations, approve the settlement authorization, then execute on-chain token transfers with verified settlement.'
  },
  {
    id: 'faq-5',
    question: 'Is my data secure?',
    answer: 'Yes, we prioritize security and use industry-standard encryption and security practices. Your wallet connections and transaction data are protected.',
  },
];
