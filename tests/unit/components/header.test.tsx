import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
