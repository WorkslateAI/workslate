import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchDialog } from '../../../src/components/atoms/SearchDialog';

// Mock the useSiteSearch hook
vi.mock('../../../src/search/useSiteSearch', () => ({
  useSiteSearch: vi.fn(),
}));

import { useSiteSearch } from '../../../src/search/useSiteSearch';

describe('SearchDialog', () => {
  const mockClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    const { container } = render(<SearchDialog isOpen={false} onClose={mockClose} />);
    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it('renders dialog when isOpen is true', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    expect(screen.getByRole('dialog', { name: /search docs/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search docs...')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    const { container } = render(<SearchDialog isOpen={true} onClose={mockClose} />);

    // The backdrop is the outer fixed div
    const backdrop = container.querySelector('.fixed.inset-0');
    expect(backdrop).toBeInTheDocument();
    
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: '',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: 'test',
      setQuery: vi.fn(),
      results: [],
      isLoading: true,
      isReady: false,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    expect(screen.getByText('Loading search...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: 'test',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: 'Failed to load search',
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    expect(screen.getByText('Failed to load search')).toBeInTheDocument();
  });

  it('shows no results message', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: 'xyz',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    expect(screen.getByText(/No results for "xyz"/)).toBeInTheDocument();
  });

  it('shows type hint for short queries', () => {
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: 'a',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    expect(screen.getByText('Type at least 2 characters to search')).toBeInTheDocument();
  });

  it('renders search results', () => {
    const mockResults = [
      {
        item: {
          id: 'test-1',
          title: 'Test Result',
          breadcrumb: ['Section'],
          anchor: 'test',
          content: 'Test content here',
          path: '/docs.html',
        },
        score: 0.1,
        matches: [],
      },
    ];

    (useSiteSearch as vi.Mock).mockReturnValue({
      query: 'test',
      setQuery: vi.fn(),
      results: mockResults,
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    expect(screen.getByText('Test Result')).toBeInTheDocument();
    expect(screen.getByText('Section')).toBeInTheDocument();
    expect(screen.getByText('1 results')).toBeInTheDocument();
  });

  it('updates query when input changes', () => {
    const setQuery = vi.fn();
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: '',
      setQuery,
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    const input = screen.getByPlaceholderText('Search docs...');
    fireEvent.change(input, { target: { value: 'web3j' } });

    expect(setQuery).toHaveBeenCalledWith('web3j');
  });

  it('clears query when clear button is clicked', () => {
    const setQuery = vi.fn();
    (useSiteSearch as vi.Mock).mockReturnValue({
      query: 'test',
      setQuery,
      results: [],
      isLoading: false,
      isReady: true,
      error: null,
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);

    expect(setQuery).toHaveBeenCalledWith('');
  });
});
