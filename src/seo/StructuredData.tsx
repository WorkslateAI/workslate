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
    description: 'AI-powered token tracking and movement across markets and EVM-compatible blockchains.',
  };

  const webSiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Workslate AI',
    url: 'https://workslate.ai',
    description: 'Track and move tokens across markets and EVM-compatible blockchains with AI-driven automation.',
  };

  const softwareApplicationData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Workslate AI',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'AI-powered platform for token tracking and movement across markets and blockchains.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <Helmet>
      <title>Workslate AI - From Market to Market. Your Token. Everywhere.</title>
      <meta name="description" content="Track and move tokens across markets and EVM-compatible blockchains with AI-driven automation, peer-to-peer transfer workflows, and a unified real-time dashboard." />
      <link rel="canonical" href="https://workslate.ai/" />

      {/* Preload LCP image */}
      <link
        rel="preload"
        as="image"
        imageSrcSet="/assets/images/hero-markets-abc-workslate-centre-480w.avif 480w,
                     /assets/images/hero-markets-abc-workslate-centre-768w.avif 768w,
                     /assets/images/hero-markets-abc-workslate-centre-1200w.avif 1200w,
                     /assets/images/hero-markets-abc-workslate-centre.avif 1923w"
        imageSizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1200px) 1200px, 1923px"
        fetchPriority="high"
      />

      {/* Open Graph */}
      <meta property="og:title" content="Workslate AI - From Market to Market. Your Token. Everywhere." />
      <meta property="og:description" content="Track and move tokens across markets and EVM-compatible blockchains with AI-driven automation." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://workslate.ai/" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Workslate AI - From Market to Market. Your Token. Everywhere." />
      <meta name="twitter:description" content="Track and move tokens across markets and EVM-compatible blockchains with AI-driven automation." />
      
      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(faqPageData)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
      <script type="application/ld+json">{JSON.stringify(webSiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareApplicationData)}</script>
    </Helmet>
  );
};
