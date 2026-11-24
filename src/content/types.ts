// Navigation Item
export interface NavigationItem {
  label: string;
  href: string;
  location: 'header' | 'footer';
}

// Feature and Illustration
export interface Feature {
  number: '01' | '02' | '03' | '04';
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
  sender: string;
  receiver: string;
  chain: string;
  asset: string;
  amount: string;
  status: 'Settled' | 'Pending Authorization';
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
