import { useState, useCallback, useEffect, useRef } from 'react';
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

export function useSiteSearch(): UseSiteSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchRecord>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fuseRef = useRef<any>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lazy load Fuse.js and create instance
  const initializeFuse = useCallback(async () => {
    if (fuseRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const Fuse = (await import('fuse.js')).default;
      
      fuseRef.current = new Fuse(docsIndex, {
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

      setIsReady(true);
    } catch (err) {
      setError('Failed to load search. Please try again.');
      console.error('Failed to load Fuse.js:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!fuseRef.current) {
      await initializeFuse();
    }

    if (!fuseRef.current) return;

    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = fuseRef.current.search(trimmedQuery, { limit: 10 });
    
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
  }, [initializeFuse]);

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
    isLoading,
    isReady,
    error,
  };
}
