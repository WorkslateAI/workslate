import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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

    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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
    (useSiteSearch as Mock).mockReturnValue({
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

  const mockTwoResults = [
    {
      item: {
        id: 'r1',
        title: 'Web3j',
        breadcrumb: ['Docs', 'Terms'],
        anchor: 'core-terminology',
        content: 'Java integration library for Ethereum JSON-RPC and contracts',
        path: '/docs.html',
      },
      score: 0.1,
      matches: [
        { key: 'title', indices: [[0, 4]] },
        { key: 'content', indices: [[0, 3]] },
      ],
    },
    {
      item: {
        id: 'r2',
        title: 'BPMN',
        breadcrumb: [],
        anchor: '',
        content: 'Business Process Model and Notation for workflows',
        path: '/docs.html',
      },
      score: 0.3,
      matches: [],
    },
  ];

  const mockSearchWithResults = () =>
    (useSiteSearch as Mock).mockReturnValue({
      query: 'web',
      setQuery: vi.fn(),
      results: mockTwoResults,
      isLoading: false,
      isReady: true,
      error: null,
    });

  it('navigates results with ArrowDown, ArrowUp, Home and End', () => {
    mockSearchWithResults();
    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(document, { key: 'ArrowDown' });
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(document, { key: 'ArrowUp' });
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(document, { key: 'End' });
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(document, { key: 'Home' });
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('selects the active result with Enter and closes', () => {
    mockSearchWithResults();
    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    fireEvent.keyDown(document, { key: 'Enter' });

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('selects a result on click and closes', () => {
    mockSearchWithResults();
    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    fireEvent.click(screen.getAllByRole('option')[0]);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('activates a result on mouse hover', () => {
    mockSearchWithResults();
    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    fireEvent.mouseEnter(screen.getAllByRole('option')[1]);

    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('highlights matched terms and renders a match snippet', () => {
    mockSearchWithResults();
    const { container } = render(<SearchDialog isOpen={true} onClose={mockClose} />);

    // Only the content snippet renders real <mark> elements (via innerHTML);
    // the title highlight is inserted as escaped text.
    const marks = container.querySelectorAll('mark');
    expect(marks.length).toBeGreaterThan(0);
    expect(marks[0].textContent).toBe('Java');
  });

  it('renders the retry button in the error state', () => {
    (useSiteSearch as Mock).mockReturnValue({
      query: 'test',
      setQuery: vi.fn(),
      results: [],
      isLoading: false,
      isReady: true,
      error: 'Search index failed',
    });

    render(<SearchDialog isOpen={true} onClose={mockClose} />);

    const retry = screen.getByRole('button', { name: 'Retry' });
    // jsdom logs "not implemented: navigation" for reload; click should not throw.
    expect(() => fireEvent.click(retry)).not.toThrow();
  });
});
