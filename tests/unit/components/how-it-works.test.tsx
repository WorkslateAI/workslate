import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HowItWorks } from '../../../src/components/sections/HowItWorks';

describe('HowItWorks Section', () => {
  it('renders section heading', () => {
    render(<HowItWorks />);
    const heading = screen.getByText('Three steps from wallet to market');
    
    expect(heading).toBeVisible();
  });

  it('renders all three steps', () => {
    render(<HowItWorks />);
    
    expect(screen.getByText('Connect your wallet to the agent.')).toBeVisible();
    expect(screen.getByText('Choose the markets you operate in.')).toBeVisible();
    expect(screen.getByText('The agent moves and tracks every token.')).toBeVisible();
  });

  it('renders video button', () => {
    render(<HowItWorks />);
    const videoButton = screen.getByText('Watch how it works');
    
    expect(videoButton).toBeVisible();
  });

  it('renders CTA button', () => {
    render(<HowItWorks />);
    const ctaButton = screen.getByText('Register for demo');
    
    expect(ctaButton).toBeVisible();
  });
});
