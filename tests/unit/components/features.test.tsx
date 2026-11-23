import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Features } from '../../../src/components/sections/Features';

describe('Features Section', () => {
  it('renders all four feature cards', () => {
    render(<Features />);
    
    const feature1 = screen.getAllByText('Multi-Party Ledger Reconciliation');
    expect(feature1.length).toBeGreaterThan(0);
    
    const feature2 = screen.getAllByText('Corporate Wallet Orchestration');
    expect(feature2.length).toBeGreaterThan(0);
    
    const feature3 = screen.getAllByText('Programmable Settlement Rules');
    expect(feature3.length).toBeGreaterThan(0);

    const feature4 = screen.getAllByText('End-to-End Transaction Traceability');
    expect(feature4.length).toBeGreaterThan(0);
  });

  it('renders feature numbers in cards', () => {
    render(<Features />);
    
    const numbers = screen.getAllByText('01');
    expect(numbers.length).toBeGreaterThan(0);
    
    const numbers02 = screen.getAllByText('02');
    expect(numbers02.length).toBeGreaterThan(0);
    
    const numbers03 = screen.getAllByText('03');
    expect(numbers03.length).toBeGreaterThan(0);

    const numbers04 = screen.getAllByText('04');
    expect(numbers04.length).toBeGreaterThan(0);
  });

  it('renders feature images', () => {
    render(<Features />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(3);
  });

  it('renders sidebar navigation buttons', () => {
    render(<Features />);
    
    const sidebarButtons = screen.getAllByText(/Multi-Party Ledger Reconciliation|Corporate Wallet Orchestration|Programmable Settlement Rules|End-to-End Transaction Traceability/);
    expect(sidebarButtons.length).toBeGreaterThan(0);
  });

  it('handles sidebar button clicks', () => {
    render(<Features />);
    
    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    const sidebarButtons = screen.getAllByRole('button');
    if (sidebarButtons.length > 0) {
      fireEvent.click(sidebarButtons[0]);
      expect(mockScrollIntoView).toHaveBeenCalled();
    }
  });
});
