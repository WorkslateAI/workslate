import { describe, it, expect } from 'vitest';
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
});
