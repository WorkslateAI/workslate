import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useSiteSearch } from '../../search/useSiteSearch';
import type { FuseResult } from 'fuse.js';
import type { SearchRecord } from '../../search/docsIndex';

// Layout effects don't run during SSR/prerender — fall back to useEffect there
// to avoid React warnings while keeping synchronous listener attachment in the browser.
const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const { query, setQuery, results, isLoading, isReady, error } = useSiteSearch();
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen, setQuery]);

  // Keyboard shortcuts — bound in a layout effect so the listener is attached
  // synchronously when the dialog opens (no gap where keypresses are missed).
  useIsomorphicLayoutEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveIndex(Math.max(results.length - 1, 0));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        const result = results[activeIndex];
        if (result) {
          handleSelectResult(result);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, activeIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  // Handle result selection
  const handleSelectResult = useCallback((result: FuseResult<SearchRecord>) => {
    const { item } = result;
    const url = item.anchor ? `${item.path}#${item.anchor}` : item.path;
    
    // Navigate to the result
    window.location.href = url;
    
    // Close dialog
    onClose();
  }, [onClose]);

  // Escape HTML for safe rendering
  const escapeHtml = (text: string) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Highlight matched terms
  const highlightMatches = useCallback((text: string, matches: readonly { indices: readonly [number, number][] }[] | undefined) => {
    if (!matches || matches.length === 0) {
      return escapeHtml(text);
    }

    const allIndices = matches.flatMap(m => m.indices);
    const sortedIndices = allIndices.sort((a, b) => a[0] - b[0]);

    let result = '';
    let lastIndex = 0;

    sortedIndices.forEach(([start, end]) => {
      result += escapeHtml(text.slice(lastIndex, start));
      result += `<mark>${escapeHtml(text.slice(start, end + 1))}</mark>`;
      lastIndex = end + 1;
    });

    result += escapeHtml(text.slice(lastIndex));
    return result;
  }, []);

  // Generate snippet around first match
  const generateSnippet = useCallback((text: string, matches: readonly { indices: readonly [number, number][] }[] | undefined) => {
    if (!matches || matches.length === 0) {
      return escapeHtml(text.slice(0, 120));
    }

    const firstMatch = matches[0]?.indices[0];
    if (!firstMatch) {
      return escapeHtml(text.slice(0, 120));
    }

    const [start, end] = firstMatch;
    const snippetLength = 120;
    const halfLength = Math.floor(snippetLength / 2);

    let snippetStart = Math.max(0, start - halfLength);
    let snippetEnd = Math.min(text.length, end + halfLength);

    // Adjust to include full words
    if (snippetStart > 0) {
      snippetStart = text.lastIndexOf(' ', snippetStart) + 1;
    }
    if (snippetEnd < text.length) {
      snippetEnd = text.indexOf(' ', snippetEnd);
      if (snippetEnd === -1) snippetEnd = text.length;
    }

    const prefix = snippetStart > 0 ? '...' : '';
    const suffix = snippetEnd < text.length ? '...' : '';
    const snippet = text.slice(snippetStart, snippetEnd);

    return prefix + highlightMatches(snippet, matches) + suffix;
  }, [highlightMatches]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search docs"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-border overflow-hidden">
        {/* Input */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <svg
            className="w-5 h-5 text-text-400 mr-3 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="flex-1 bg-transparent border-none outline-none text-text-900 placeholder:text-text-400 text-base"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results.length > 0 ? `result-${activeIndex}` : undefined}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-text-400 hover:text-text-600 p-1 rounded"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {error && (
            <div className="p-4 text-red-600 text-sm">
              {error}
              <button
                onClick={() => window.location.reload()}
                className="ml-2 underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading && !isReady && (
            <div className="p-8 text-center text-text-400 text-sm">Loading search...</div>
          )}

          {!isLoading && isReady && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-text-400 text-sm">
              No results for "{escapeHtml(query)}"
              <div className="mt-2 text-xs">Try different keywords or check your spelling</div>
            </div>
          )}

          {!isLoading && isReady && query.length < 2 && (
            <div className="p-8 text-center text-text-400 text-sm">
              Type at least 2 characters to search
            </div>
          )}

          {results.length > 0 && (
            <ul
              ref={listRef}
              id="search-results"
              role="listbox"
              className="py-2"
              aria-live="polite"
              aria-label={`${results.length} search results`}
            >
              {results.map((result, index) => {
                const { item, matches } = result;
                const isActive = index === activeIndex;
                
                // Find content matches for snippet
                const contentMatches = matches?.filter(m => m.key === 'content');
                const snippet = generateSnippet(item.content, contentMatches);

                return (
                  <li
                    key={item.id}
                    ref={(el) => (itemRefs.current[index] = el)}
                    id={`result-${index}`}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelectResult(result)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      isActive ? 'bg-lavender-100' : 'hover:bg-lavender-50'
                    }`}
                  >
                    <div className="font-medium text-text-900 text-sm mb-1">
                      {highlightMatches(item.title, matches?.filter(m => m.key === 'title'))}
                    </div>
                    {item.breadcrumb.length > 0 && (
                      <div className="text-xs text-text-500 mb-1">
                        {item.breadcrumb.join(' → ')}
                      </div>
                    )}
                    <div
                      className="text-xs text-text-600 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: snippet }}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with keyboard hints */}
        <div className="border-t border-border px-4 py-2 bg-lavender-50 flex items-center justify-between text-xs text-text-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-xs">↑↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-xs">Enter</kbd>
              <span>to select</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-xs">Esc</kbd>
              <span>to close</span>
            </span>
          </div>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
