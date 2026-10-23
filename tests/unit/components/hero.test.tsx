import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../../../src/components/sections/Hero';

describe('Hero Section', () => {
  it('renders main heading', () => {
    render(<Hero />);
    const heading = screen.getByText(/Your personal agent for managing your wallet/i);
    
    expect(heading).toBeVisible();
  });

  it('renders prompt chip', () => {
    render(<Hero />);
    const promptChip = screen.getByText(/\+ Prompt/i);
    
    expect(promptChip).toBeVisible();
  });

  it('renders status line with animated dots', () => {
    render(<Hero />);
    const statusLine = screen.getByText(/Workslate AI is generating/i);
    
    expect(statusLine).toBeVisible();
  });

  it('renders both CTA buttons', () => {
    render(<Hero />);
    const registerButton = screen.getByText('Register for demo');
    const watchButton = screen.getByText('Watch video');
    
    expect(registerButton).toBeVisible();
    expect(watchButton).toBeVisible();
  });

  it('renders hero image', () => {
    render(<Hero />);
    const image = screen.getByAltText(/Hero illustration/i);
    
    expect(image).toBeVisible();
  });

  it('renders eyebrow text', () => {
    render(<Hero />);
    const eyebrow = screen.getByText(/AI-POWERED/i);
    
    expect(eyebrow).toBeVisible();
  });
});
