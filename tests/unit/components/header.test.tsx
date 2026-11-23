import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../../../src/components/sections/Header';

describe('Header', () => {
  it('renders logo image', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: /Workslate/i });
    
    expect(logo).toBeVisible();
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('How it works')).toBeVisible();
    expect(screen.getByText('Global')).toBeVisible();
    expect(screen.getByText('Features')).toBeVisible();
    expect(screen.getByText('Docs')).toBeVisible();
  });

  it('renders CTA button', () => {
    render(<Header />);
    const button = screen.getByText('Register for demo');
    
    expect(button).toBeVisible();
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Open menu');
    
    expect(menuButton).toBeVisible();
  });

  it('toggles Features dropdown on click', () => {
    render(<Header />);
    const featuresButton = screen.getByText('Features');
    
    // Initially closed
    expect(screen.queryByText('Ledger Reconciliation')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(featuresButton);
    expect(screen.getByText('Ledger Reconciliation')).toBeVisible();
    
    // Click to close
    fireEvent.click(featuresButton);
    expect(screen.queryByText('Ledger Reconciliation')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(<Header />);
    const featuresButton = screen.getByText('Features');
    
    // Open dropdown
    fireEvent.click(featuresButton);
    expect(screen.getByText('Ledger Reconciliation')).toBeVisible();
    
    // Click outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Ledger Reconciliation')).not.toBeInTheDocument();
  });

  it('closes dropdown on Escape key', () => {
    render(<Header />);
    const featuresButton = screen.getByText('Features');
    
    // Open dropdown
    fireEvent.click(featuresButton);
    expect(screen.getByText('Ledger Reconciliation')).toBeVisible();
    
    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Ledger Reconciliation')).not.toBeInTheDocument();
  });

  it('renders all feature dropdown items', () => {
    render(<Header />);
    const featuresButton = screen.getByText('Features');
    
    fireEvent.click(featuresButton);
    
    expect(screen.getByText('Ledger Reconciliation')).toBeVisible();
    expect(screen.getByText('Wallet Orchestration')).toBeVisible();
    expect(screen.getByText('Settlement Rules')).toBeVisible();
    expect(screen.getByText('End-to-End Traceability')).toBeVisible();
  });
});
