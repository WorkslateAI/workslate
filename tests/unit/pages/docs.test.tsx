import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Docs } from '../../../src/pages/Docs';

describe('Docs Page', () => {
  it('renders page heading', () => {
    render(<Docs />);
    const heading = screen.getByText('Documentation');
    
    expect(heading).toBeVisible();
  });

  it('renders page description', () => {
    render(<Docs />);
    const description = screen.getByText(/Explore comprehensive documentation/i);
    
    expect(description).toBeVisible();
  });

  it('renders all category headings', () => {
    render(<Docs />);
    
    expect(screen.getByText('Getting Started')).toBeVisible();
    expect(screen.getByText('Core Concepts')).toBeVisible();
    expect(screen.getByText('Advanced Topics')).toBeVisible();
  });

  it('renders resource cards', () => {
    render(<Docs />);
    
    expect(screen.getByText('Introduction to Web3j')).toBeVisible();
    expect(screen.getByText('Smart Contracts')).toBeVisible();
    expect(screen.getByText('Event Filters')).toBeVisible();
  });

  it('renders external links', () => {
    render(<Docs />);
    const links = screen.getAllByText('Read documentation');
    
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders help section', () => {
    render(<Docs />);
    const helpHeading = screen.getByText('Need more help?');
    const ctaButton = screen.getByText('Visit Official Docs');
    
    expect(helpHeading).toBeVisible();
    expect(ctaButton).toBeVisible();
  });
});
