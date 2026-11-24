import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { PromptSection } from '../../../src/components/sections/PromptSection';

// Capture the observer callback so tests can simulate the section entering the viewport.
let observerCallback: IntersectionObserverCallback | null = null;

class MockIntersectionObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

function triggerIntersect() {
  act(() => {
    observerCallback?.(
      [{ isIntersecting: true, target: document.createElement('div') } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe('PromptSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    observerCallback = null;
    globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    // Deterministic typing delay in AITextRenderer.
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders the prompt chip', () => {
    render(<PromptSection />);
    expect(screen.getByText(/\+ Prompt/i)).toBeVisible();
    expect(
      screen.getByText(/How do I reconcile my business ledger and move tokens with confidence/i),
    ).toBeVisible();
  });

  it('reveals the AI response after the section enters the viewport', () => {
    const { container } = render(<PromptSection />);

    // The live response renderer starts empty until the section is in view
    // and the 1.5s response delay elapses.
    const renderers = container.querySelectorAll('.ai-text-renderer');
    expect(renderers[renderers.length - 1]?.textContent).toBe('');

    triggerIntersect();
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    // Allow the word-by-word reveal to finish.
    for (let i = 0; i < 60; i++) {
      act(() => {
        vi.advanceTimersByTime(150);
      });
    }

    const finalRenderers = container.querySelectorAll('.ai-text-renderer');
    expect(finalRenderers[0]?.textContent).toBe(
      'One Connected Platform. Reconcile intelligently, Authorize confidently & Move tokens securely.',
    );
    expect(finalRenderers[1]?.textContent).toBe('ASK WORKSLATE AI');
  });

  it('shows the generating indicator once in view and hides it when the response lands', () => {
    const { container } = render(<PromptSection />);
    const status = container.querySelector('.transition-opacity')!;

    expect(status.className).toContain('opacity-0');

    triggerIntersect();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(status.className).toContain('opacity-100');

    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(status.className).toContain('opacity-0');
  });

  it('animates the loading dots while generating', () => {
    const { container } = render(<PromptSection />);
    triggerIntersect();

    const dots = () => container.querySelector('[class*="3ch"]')?.textContent;

    act(() => {
      vi.advanceTimersByTime(500);
    });
    const afterOneTick = dots();
    expect(afterOneTick).toBe('.');

    act(() => {
      vi.advanceTimersByTime(500 * 3);
    });
    // Cycles: '.', '..', '...', ''
    expect(dots()).toBe('');
  });
});
