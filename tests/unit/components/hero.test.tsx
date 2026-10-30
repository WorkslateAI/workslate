import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Hero } from '../../../src/components/sections/Hero';
import { HowItWorks } from '../../../src/components/sections/HowItWorks';

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

  it('applies desktop-only scale class to image container', () => {
    render(<Hero />);
    const image = screen.getByAltText(/Hero illustration/i);
    const container = image.closest('.rounded-2xl');

    expect(container).toHaveClass('lg:scale-105');
    expect(container).toHaveClass('xl:scale-[1.20]');
    expect(container).toHaveClass('lg:p-3');
    expect(container).not.toHaveClass('scale-[1.20]');
  });

  it('Watch video button scrolls to How It Works and dispatches play event', async () => {
    const playListener = vi.fn();
    window.addEventListener('workslate:play-how-it-works-video', playListener);

    render(
      <>
        <Hero />
        <HowItWorks />
      </>
    );

    fireEvent.click(screen.getByText('Watch video'));

    expect(playListener).toHaveBeenCalledTimes(1);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();

    // The How It Works video should now be playing
    await act(async () => Promise.resolve());
    const video = document.querySelector('#how-it-works video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('src', '/assets/videos/tokens_at_the_speed_of_rules.mp4');

    window.removeEventListener('workslate:play-how-it-works-video', playListener);
  });
});
