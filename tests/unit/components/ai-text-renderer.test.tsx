import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { AITextRenderer } from '../../../src/components/atoms/AITextRenderer';

function mockReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// Each timer tick's state update is flushed at the act() boundary, so one
// large advanceTimersByTime only processes ~1 unit. Advance in steps instead.
function advanceSteps(ms: number, step = 100) {
  for (let elapsed = 0; elapsed < ms; elapsed += step) {
    act(() => {
      vi.advanceTimersByTime(step);
    });
  }
}

describe('AITextRenderer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockReducedMotion(false);
    // Deterministic pacing: delay = speed * (0.6 + 0.5 * 0.8) = speed.
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('reveals text progressively, character by character', () => {
    const { container } = render(
      <AITextRenderer text="Hello world" speed={50} />,
    );
    const root = container.querySelector('.ai-text-renderer')!;

    expect(root.textContent).toBe('');

    advanceSteps(200, 40);
    const partial = root.textContent!;
    expect(partial.length).toBeGreaterThan(0);
    expect(partial.length).toBeLessThan('Hello world'.length);

    advanceSteps(2_000);
    expect(root.textContent).toBe('Hello world');
  });

  it('reveals whole words in word mode', () => {
    const { container } = render(
      <AITextRenderer text="one two three" mode="word" speed={50} />,
    );
    const root = container.querySelector('.ai-text-renderer')!;

    advanceSteps(60, 30);
    expect(root.textContent).toBe('one ');

    advanceSteps(2_000);
    expect(root.textContent).toBe('one two three');
  });

  it('shows a cursor while rendering and removes it when complete', () => {
    const { container } = render(
      <AITextRenderer text="Hi" speed={50} />,
    );
    expect(container.querySelector('.ai-text-cursor')).not.toBeNull();

    advanceSteps(2_000);
    expect(container.querySelector('.ai-text-cursor')).toBeNull();
    expect(container.textContent).toBe('Hi');
  });

  it('keeps the cursor when streaming even after current text completes', () => {
    const { container } = render(
      <AITextRenderer text="Hi" speed={50} streaming />,
    );
    advanceSteps(2_000);
    expect(container.querySelector('.ai-text-cursor')).not.toBeNull();
  });

  it('continues appended streamed text without restarting', () => {
    const { container, rerender } = render(
      <AITextRenderer text="Hello" speed={50} streaming />,
    );
    const root = container.querySelector('.ai-text-renderer')!;

    advanceSteps(2_000);
    expect(root.textContent).toBe('Hello');

    rerender(<AITextRenderer text="Hello world" speed={50} streaming />);
    // Already-rendered prefix stays visible; animation continues from there.
    expect(root.textContent).toBe('Hello');

    advanceSteps(2_000);
    expect(root.textContent).toBe('Hello world');
  });

  it('restarts when the text is replaced rather than appended', () => {
    const { container, rerender } = render(
      <AITextRenderer text="Hello" speed={50} />,
    );
    const root = container.querySelector('.ai-text-renderer')!;

    advanceSteps(2_000);
    expect(root.textContent).toBe('Hello');

    rerender(<AITextRenderer text="Goodbye" speed={50} />);
    expect(root.textContent).toBe('');

    advanceSteps(2_000);
    expect(root.textContent).toBe('Goodbye');
  });

  it('renders instantly when the user prefers reduced motion', () => {
    mockReducedMotion(true);
    const { container } = render(
      <AITextRenderer text="All at once" speed={50} />,
    );
    expect(container.textContent).toBe('All at once');
    expect(container.querySelector('.ai-text-cursor')).toBeNull();
  });

  it('renders Markdown formatting in block mode', () => {
    const { container } = render(
      <AITextRenderer
        as="div"
        speed={1}
        text={'## Title\n\nA **bold** move and `code` plus [a link](https://example.com).\n\n- first\n- second'}
      />,
    );
    advanceSteps(10_000);

    expect(container.querySelector('h2')?.textContent).toBe('Title');
    expect(container.querySelector('strong')?.textContent).toBe('bold');
    expect(container.querySelector('code')?.textContent).toBe('code');
    const link = container.querySelector('a');
    expect(link?.getAttribute('href')).toBe('https://example.com');
    expect(link?.textContent).toBe('a link');
    expect(container.querySelectorAll('ul li')).toHaveLength(2);
  });

  it('renders fenced code blocks', () => {
    const { container } = render(
      <AITextRenderer as="div" speed={1} text={'```ts\nconst a = 1;\n```'} />,
    );
    advanceSteps(10_000);

    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toBe('const a = 1;');
  });

  it('calls onComplete once when rendering finishes', () => {
    const onComplete = vi.fn();
    render(<AITextRenderer text="Done" speed={50} onComplete={onComplete} />);

    advanceSteps(2_000);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('cleans up timers on unmount', () => {
    const clearSpy = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<AITextRenderer text="Long text" speed={50} />);

    advanceSteps(100);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });
});
