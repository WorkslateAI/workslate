import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSiteSearch } from '../../../src/search/useSiteSearch';

describe('useSiteSearch', () => {
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

  it('returns matching results after the debounce delay', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    act(() => {
      result.current.setQuery('web3j');
    });
    // Debounced: results stay empty until the timer fires.
    expect(result.current.results).toEqual([]);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(result.current.results[0].item.title.toLowerCase()).toContain('web3j');
  });

  it('clears results for queries shorter than 2 characters', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    act(() => {
      result.current.setQuery('web3j');
      vi.advanceTimersByTime(200);
    });
    expect(result.current.results.length).toBeGreaterThan(0);

    act(() => {
      result.current.setQuery('w');
      vi.advanceTimersByTime(200);
    });
    expect(result.current.results).toEqual([]);
  });

  it('debounces rapid query changes and searches only the latest value', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    act(() => {
      result.current.setQuery('web3j');
      result.current.setQuery('bpmn');
      vi.advanceTimersByTime(200);
    });

    expect(result.current.results.length).toBeGreaterThan(0);
    expect(result.current.results[0].item.title.toLowerCase()).toContain('bpmn');
  });

  it('prioritizes exact title matches in result ordering', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useSiteSearch());

    act(() => {
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
