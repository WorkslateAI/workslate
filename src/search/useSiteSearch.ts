import { useState, useCallback, useEffect, useRef } from 'react';
import type Fuse from 'fuse.js';
import type { FuseResult } from 'fuse.js';
import { docsIndex, type SearchRecord } from './docsIndex';

interface UseSiteSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: FuseResult<SearchRecord>[];
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

// Fuse is imported dynamically on first search — the ~26 KB library splits
// into its own chunk, keeping the Docs page chunk small for route LCP, and
// index construction is deferred off the critical path (TBT).
let fuse: Fuse<SearchRecord> | null = null;
let fusePromise: Promise<Fuse<SearchRecord>> | null = null;

async function getFuse(): Promise<Fuse<SearchRecord>> {
  if (fuse) return fuse;
  if (!fusePromise) {
    fusePromise = import('fuse.js').then(({ default: FuseModule }) => {
      fuse = new FuseModule<SearchRecord>(docsIndex, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'breadcrumb', weight: 0.2 },
          { name: 'content', weight: 0.25 },
          { name: 'code', weight: 0.05 },
        ],
        threshold: 0.3,
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeMatches: true,
        includeScore: true,
        useExtendedSearch: false,
      });
      return fuse;
    });
  }
  return fusePromise;
}

export function useSiteSearch(): UseSiteSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchRecord>[]>([]);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search — Fuse resolves async on first use; discard stale
  // results if the query moved on while the module was loading.
  const latestQueryRef = useRef('');
  const performSearch = useCallback((searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    latestQueryRef.current = trimmedQuery;

    if (trimmedQuery.length < 2) {
      setResults([]);
      return;
    }

    void getFuse().then((instance) => {
      if (latestQueryRef.current !== trimmedQuery) return;

      const searchResults = instance.search(trimmedQuery, { limit: 10 });

      // Sort exact title matches first
      searchResults.sort((a: FuseResult<SearchRecord>, b: FuseResult<SearchRecord>) => {
        const aExact = a.item.title.toLowerCase() === trimmedQuery.toLowerCase();
        const bExact = b.item.title.toLowerCase() === trimmedQuery.toLowerCase();

        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        // Then by score
        return (a.score || 0) - (b.score || 0);
      });

      setResults(searchResults);
    });
  }, []);

  // Debounced query handler
  const debouncedSetQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(newQuery);
    }, 150);
  }, [performSearch]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    query,
    setQuery: debouncedSetQuery,
    results,
    isLoading: false,
    isReady: true,
    error: null,
  };
}
