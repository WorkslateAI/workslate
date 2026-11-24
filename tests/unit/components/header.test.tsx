import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

  it('closes the desktop dropdown when a feature link is clicked', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Features'));

    fireEvent.click(screen.getByText('Ledger Reconciliation'));

    expect(screen.queryByText('Ledger Reconciliation')).not.toBeInTheDocument();
  });

  describe('mobile menu', () => {
    beforeEach(() => {
      // Run rAF callbacks immediately so deferred scrolls execute in tests.
      vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('opens the mobile menu and closes it via a nav link', () => {
      render(<Header />);
      fireEvent.click(screen.getByLabelText('Open menu'));

      // Mobile menu duplicates nav links
      expect(screen.getAllByText('How it works').length).toBe(2);

      const mobileLinks = screen.getAllByText('How it works');
      fireEvent.click(mobileLinks[1]);

      expect(screen.getAllByText('How it works').length).toBe(1);
    });

    it('closes the mobile menu via the Global and Docs links', () => {
      render(<Header />);

      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(screen.getAllByText('Global').length).toBe(2);
      fireEvent.click(screen.getAllByText('Global')[1]);
      expect(screen.getAllByText('Global').length).toBe(1);

      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(screen.getAllByText('Docs').length).toBe(2);
      fireEvent.click(screen.getAllByText('Docs')[1]);
      expect(screen.getAllByText('Docs').length).toBe(1);
    });

    it('closes the mobile menu on Escape', () => {
      render(<Header />);
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(screen.getAllByText('Global').length).toBe(2);

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.getAllByText('Global').length).toBe(1);
    });

    it('expands mobile Features and scrolls to the feature on click', () => {
      const target = document.createElement('div');
      target.id = 'feature-01';
      document.body.appendChild(target);

      render(<Header />);
      fireEvent.click(screen.getByLabelText('Open menu'));

      // Mobile menu renders a second Features toggle. isFeaturesOpen is shared,
      // so this also opens the desktop dropdown — click the mobile (last) link.
      const featureToggles = screen.getAllByText('Features');
      fireEvent.click(featureToggles[featureToggles.length - 1]);

      const mobileFeatureLinks = screen.getAllByText('Ledger Reconciliation');
      fireEvent.click(mobileFeatureLinks[mobileFeatureLinks.length - 1]);

      expect(window.location.hash).toBe('#feature-01');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
      // Menu and dropdown both closed
      expect(screen.queryByText('Ledger Reconciliation')).not.toBeInTheDocument();
      expect(screen.getAllByText('How it works').length).toBe(1);

      target.remove();
      window.location.hash = '';
    });
  });
});
