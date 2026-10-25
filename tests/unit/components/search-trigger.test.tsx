import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchTrigger } from '../../../src/components/atoms/SearchTrigger';

describe('SearchTrigger', () => {
  it('renders default variant with correct elements', () => {
    const handleClick = vi.fn();
    render(<SearchTrigger onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /search docs/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Search docs')).toBeInTheDocument();
  });

  it('renders icon-only variant', () => {
    const handleClick = vi.fn();
    render(<SearchTrigger onClick={handleClick} variant="icon-only" />);

    const button = screen.getByRole('button', { name: /search docs/i });
    expect(button).toBeInTheDocument();
    expect(screen.queryByText('Search docs')).not.toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<SearchTrigger onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /search docs/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('displays keyboard shortcut hint on non-mobile', () => {
    // Mock navigator.platform to simulate Mac
    Object.defineProperty(navigator, 'platform', {
      writable: true,
      configurable: true,
      value: 'MacIntel',
    });

    const handleClick = vi.fn();
    render(<SearchTrigger onClick={handleClick} />);

    expect(screen.getByText('⌘ K')).toBeInTheDocument();
  });

  it('displays Ctrl K shortcut on Windows', () => {
    Object.defineProperty(navigator, 'platform', {
      writable: true,
      configurable: true,
      value: 'Win32',
    });

    const handleClick = vi.fn();
    render(<SearchTrigger onClick={handleClick} />);

    expect(screen.getByText('Ctrl K')).toBeInTheDocument();
  });
});
