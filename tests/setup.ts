import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock scrollTo (not implemented in jsdom)
window.scrollTo = vi.fn();

// Mock matchMedia (not implemented in jsdom)
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}
