import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

  it('plays video when placeholder button is clicked', () => {
    const { container } = render(<HowItWorks />);

    expect(container.querySelector('video')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /watch how it works video/i }));

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('src', '/assets/videos/tokens_at_the_speed_of_rules.mp4');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('playsinline');

    // Placeholder button is replaced by the video
    expect(screen.queryByRole('button', { name: /watch how it works video/i })).toBeNull();
  });

  it('plays video when the custom play event is dispatched', () => {
    const { container } = render(<HowItWorks />);

    expect(container.querySelector('video')).toBeNull();

    act(() => {
      window.dispatchEvent(new CustomEvent('workslate:play-how-it-works-video'));
    });

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('src', '/assets/videos/tokens_at_the_speed_of_rules.mp4');
  });
});
