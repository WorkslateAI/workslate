import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSiteSearch } from '../../../src/search/useSiteSearch';

describe('useSiteSearch', () => {
  // Fuse.js loads via dynamic import on first search. Warm the module-level
  // singleton once with real timers so the fake-timer tests below resolve
  // getFuse() within a single microtask flush.
  beforeAll(async () => {
    const { result } = renderHook(() => useSiteSearch());
    await act(async () => {
      result.current.setQuery('web3j');
      await new Promise((resolve) => setTimeout(resolve, 250));
    });
  });

  it('initializes ready with empty state', () => {
    const { result } = renderHook(() => useSiteSearch());

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    // Fuse.js is bundled with the module, so the hook is ready immediately
    expect(result.current.isReady).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('sets query correctly', () => {
    const { result } = renderHook(() => useSiteSearch());

    act(() => {
      result.current.setQuery('web3j');
    });

    expect(result.current.query).toBe('web3j');
  });

  it('setQuery function is callable', () => {
    const { result } = renderHook(() => useSiteSearch());

    expect(typeof result.current.setQuery).toBe('function');
  });

  it('returns correct structure', () => {
    const { result } = renderHook(() => useSiteSearch());

    expect(Object.keys(result.current)).toEqual([
      'query',
      'setQuery',
      'results',
      'isLoading',
      'isReady',
      'error',
    ]);
  });

  it('returns matching results after the debounce delay', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    act(() => {
      result.current.setQuery('web3j');
    });
    // Debounced: results stay empty until the timer fires.
    expect(result.current.results).toEqual([]);

    // Fuse.js loads via dynamic import — the async act flushes its promise
    // alongside the debounce timer.
    await act(async () => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(result.current.results[0].item.title.toLowerCase()).toContain('web3j');
  });

  it('clears results for queries shorter than 2 characters', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    await act(async () => {
      result.current.setQuery('web3j');
      vi.advanceTimersByTime(200);
    });
    expect(result.current.results.length).toBeGreaterThan(0);

    await act(async () => {
      result.current.setQuery('w');
      vi.advanceTimersByTime(200);
    });
    expect(result.current.results).toEqual([]);
  });

  it('debounces rapid query changes and searches only the latest value', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    await act(async () => {
      result.current.setQuery('web3j');
      result.current.setQuery('bpmn');
      vi.advanceTimersByTime(200);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(result.current.results[0].item.title.toLowerCase()).toContain('bpmn');
  });

  it('prioritizes exact title matches in result ordering', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    await act(async () => {
      result.current.setQuery('EVM');
      vi.advanceTimersByTime(200);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(result.current.results[0].item.title).toBe('EVM');
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
