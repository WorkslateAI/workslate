import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SideSection } from '../../../src/components/sections/SideSection';

describe('SideSection', () => {
  it('renders section heading', () => {
    render(<SideSection />);
    const heading = screen.getByText('Seamless. Secure. Global.');
    
    expect(heading).toBeVisible();
  });

  it('renders description text', () => {
    render(<SideSection />);
    const description = screen.getByText(/Move value across regions without friction/i);
    
    expect(description).toBeVisible();
  });

  it('renders all three feature cards', () => {
    render(<SideSection />);
    
    expect(screen.getByText('Seamless')).toBeVisible();
    expect(screen.getByText('Secure')).toBeVisible();
    expect(screen.getByText('Global')).toBeVisible();
  });

  it('renders banner image', () => {
    render(<SideSection />);
    const image = screen.getByAltText(/Banner showing local wallet/i);
    
    expect(image).toBeVisible();
  });
});
