import React from 'react';
import { Helmet } from 'react-helmet-async';
import { faqItems } from '../content/faq';

export const StructuredData: React.FC = () => {
  const faqPageData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Workslate AI',
    url: 'https://workslate.ai',
    description: 'AI-powered financial orchestration: ledger reconciliation and programmable B2B token transfers across EVM-compatible blockchains and Web3 networks.',
  };

  const webSiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Workslate AI',
    url: 'https://workslate.ai',
    description: 'Reconcile first, move value with confidence. Ledger reconciliation and programmable B2B token transfers across EVM-compatible blockchains.',
  };

  const softwareApplicationData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Workslate AI',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'AI-powered platform for intelligent ledger reconciliation, programmable settlement rules and multi-chain token tracking across EVM-compatible blockchain networks.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <Helmet>
      <title>Workslate | Ledger Reconciliation & Programmable B2B Token Transfers</title>
      <meta name="description" content="Reconcile first, move value with confidence. Workslate links obligations, ledgers and corporate wallets for validated, compliant, auditable B2B token transfers." />
      <meta name="keywords" content="blockchain, EVM, EVM-compatible nodes, Web3j, Web3j Java integration, P2P workflows, peer-to-peer token transfer, multi-chain token tracking, Web3, ledger reconciliation, B2B token movement" />
      <link rel="canonical" href="https://workslate.ai/" />

      {/* Preload LCP image — mobile gets the 480w variant, larger screens the responsive set */}
      <link
        rel="preload"
        as="image"
        href="/assets/images/hero-markets-abc-workslate-centre-480w.avif"
        media="(max-width: 640px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        imageSrcSet="/assets/images/hero-markets-abc-workslate-centre-768w.avif 768w,
                     /assets/images/hero-markets-abc-workslate-centre-1200w.avif 1200w,
                     /assets/images/hero-markets-abc-workslate-centre.avif 2400w"
        imageSizes="(max-width: 1023px) calc(100vw - 48px), 680px"
        media="(min-width: 641px)"
        fetchPriority="high"
      />

      {/* Open Graph */}
      <meta property="og:title" content="Workslate | Ledger Reconciliation & Programmable B2B Token Transfers" />
      <meta property="og:description" content="Reconcile first, move value with confidence. Workslate links obligations, ledgers and corporate wallets for validated, compliant, auditable B2B token transfers." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://workslate.ai/" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Workslate | Ledger Reconciliation & Programmable B2B Token Transfers" />
      <meta name="twitter:description" content="Ledger Reconciliation & Programmable B2B Token Transfers. Reconcile first, move value with confidence. Workslate links obligations, ledgers and corporate wallets for validated, compliant, auditable B2B token transfers." />
      
      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(faqPageData)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
      <script type="application/ld+json">{JSON.stringify(webSiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareApplicationData)}</script>
    </Helmet>
  );
};
