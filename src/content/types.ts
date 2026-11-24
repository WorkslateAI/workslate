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

// FAQ Item
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
