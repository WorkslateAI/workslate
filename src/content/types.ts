// Navigation Item
export interface NavigationItem {
  label: string;
  href: string;
  location: 'header' | 'footer';
}

// Content Section
export interface ContentSection {
  id: string;
  heading: string;
  eyebrow?: string;
  copy: string;
  order: number;
}

// Feature and Illustration
export interface Feature {
  number: '01' | '02' | '03';
  title: string;
  description: string;
  illustration?: string;
}

// Market and Chain
export interface Market {
  id: string;
  name: string;
  category: 'market' | 'chain';
  order: number;
  icon?: string;
}

// Dashboard Demo and Transaction
export interface Transaction {
  id: string;
  sourceMarket: string;
  destinationMarket: string;
  chain: string;
  amount: string;
  status: string;
}

export interface DashboardData {
  dataStatus: 'simulated';
  volume: string;
  transactionCount: string;
  transactions: Transaction[];
  selectedFilter?: string;
}

// FAQ Item
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Page Metadata
export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    url: string;
    image?: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image?: string;
  };
}
