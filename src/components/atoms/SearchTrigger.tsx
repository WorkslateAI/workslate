interface SearchTriggerProps {
  onClick: () => void;
  variant?: 'default' | 'icon-only';
}

export function SearchTrigger({ onClick, variant = 'default' }: SearchTriggerProps) {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const shortcut = isMac ? '⌘ K' : 'Ctrl K';

  if (variant === 'icon-only') {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-lavender-50 transition-colors text-text-600"
        aria-label="Search docs"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border hover:bg-lavender-50 transition-colors text-text-600 bg-white w-full sm:w-auto"
      aria-label="Search docs"
    >
      <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="text-sm">Search docs</span>
      <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-medium text-text-500 bg-lavender-100 border border-border rounded">
        {shortcut}
      </kbd>
    </button>
  );
}
