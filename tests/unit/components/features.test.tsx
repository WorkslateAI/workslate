import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Features } from '../../../src/components/sections/Features';

describe('Features Section', () => {
  it('renders all three feature cards', () => {
    render(<Features />);
    
    const feature1 = screen.getAllByText('Chain of wallet token movement');
    expect(feature1.length).toBeGreaterThan(0);
    
    const feature2 = screen.getAllByText('EVM nodes – your token home');
    expect(feature2.length).toBeGreaterThan(0);
    
    const feature3 = screen.getAllByText('Single source of truth');
    expect(feature3.length).toBeGreaterThan(0);
  });

  it('renders feature numbers in cards', () => {
    render(<Features />);
    
    const numbers = screen.getAllByText('01');
    expect(numbers.length).toBeGreaterThan(0);
    
    const numbers02 = screen.getAllByText('02');
    expect(numbers02.length).toBeGreaterThan(0);
    
    const numbers03 = screen.getAllByText('03');
    expect(numbers03.length).toBeGreaterThan(0);
  });

  it('renders feature images', () => {
    render(<Features />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(3);
  });

  it('renders sidebar navigation buttons', () => {
    render(<Features />);
    
    const sidebarButtons = screen.getAllByText(/Chain of wallet token movement|EVM nodes – your token home|Single source of truth/);
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
