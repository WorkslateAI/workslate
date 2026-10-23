import type { NavigationItem } from './types';

export const headerNavigation: NavigationItem[] = [
  { label: 'Home', href: '#home', location: 'header' },
  { label: 'Features', href: '#features', location: 'header' },
  { label: 'How It Works', href: '#how-it-works', location: 'header' },
  { label: 'Docs', href: '#docs', location: 'header' },
  { label: 'Pricing', href: '#pricing', location: 'header' },
  { label: 'Sign In', href: '#sign-in', location: 'header' },
  { label: 'Get Started', href: '#get-started', location: 'header' },
];

export const footerNavigation: NavigationItem[] = [
  { label: 'Home', href: '#home', location: 'footer' },
  { label: 'Features', href: '#features', location: 'footer' },
  { label: 'How It Works', href: '#how-it-works', location: 'footer' },
  { label: 'Developers', href: '#docs', location: 'footer' },
  { label: 'FAQ', href: '#faq', location: 'footer' },
];
