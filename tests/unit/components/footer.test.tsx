import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../../../src/components/sections/Footer';

describe('Footer', () => {
  it('renders logo image', () => {
    render(<Footer />);
    const logo = screen.getByRole('img', { name: /Workslate/i });
    
    expect(logo).toBeVisible();
  });

  it('renders legal links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Terms of Service')).toBeVisible();
    expect(screen.getByText('Privacy Policy')).toBeVisible();
    expect(screen.getByText('Cookie Policy')).toBeVisible();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    const copyright = screen.getByText(/© 2026 Workslate AI/i);
    
    expect(copyright).toBeVisible();
  });

  it('renders tagline', () => {
    render(<Footer />);
    const tagline = screen.getByText(/From market to market/i);
    
    expect(tagline).toBeVisible();
  });
});
