import { useState, useCallback, useEffect, useRef } from 'react';
import Fuse, { type FuseResult } from 'fuse.js';
import { docsIndex, type SearchRecord } from './docsIndex';

interface UseSiteSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: FuseResult<SearchRecord>[];
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

// Fuse instance is built lazily on first search — it ships inside the
// lazy-loaded Docs chunk, so it never affects the initial page bundle, and
// deferring index construction keeps it out of chunk evaluation (TBT).
let fuse: Fuse<SearchRecord> | null = null;

function getFuse(): Fuse<SearchRecord> {
  if (!fuse) {
    fuse = new Fuse<SearchRecord>(docsIndex, {
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
  }
  return fuse;
}

export function useSiteSearch(): UseSiteSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchRecord>[]>([]);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  const performSearch = useCallback((searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = getFuse().search(trimmedQuery, { limit: 10 });
    
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
