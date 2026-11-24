import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Docs } from '../../../src/pages/Docs';

describe('Docs Page', () => {
  it('renders page heading', () => {
    render(<Docs />);
    const heading = screen.getByText(/Orchestrating value across/i);
    
    expect(heading).toBeVisible();
  });

  it('renders page description', () => {
    render(<Docs />);
    const description = screen.getByText(/A practical reference for connecting Java applications through Web3j/i);
    
    expect(description).toBeVisible();
  });

  it('renders architectural building blocks section', () => {
    render(<Docs />);
    
    const web3jElements = screen.getAllByText('Web3j');
    expect(web3jElements.length).toBeGreaterThan(0);
    expect(screen.getByText('BPMN orchestration')).toBeVisible();
    expect(screen.getByText('EVM + consensus')).toBeVisible();
    expect(screen.getByText('State + storage')).toBeVisible();
  });

  it('renders reference architecture section', () => {
    render(<Docs />);
    
    expect(screen.getByText('Reference architecture')).toBeVisible();
    expect(screen.getByText('BPMN workflow engine')).toBeVisible();
    expect(screen.getByText('Java service + Web3j')).toBeVisible();
    expect(screen.getByText('EVM-compatible network')).toBeVisible();
  });

  it('renders terminology section with filter buttons', () => {
    render(<Docs />);
    
    expect(screen.getByText('Core terminology')).toBeVisible();
    expect(screen.getByRole('button', { name: 'All terms' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Workflow' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Blockchain' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Network' })).toBeVisible();
  });

  it('renders code example section', () => {
    render(<Docs />);
    
    expect(screen.getByText('Illustrative Java + Web3j flow')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Copy example' })).toBeVisible();
  });

  it('renders design decisions section', () => {
    render(<Docs />);
    
    expect(screen.getByText('Reliability rules of thumb')).toBeVisible();
    expect(screen.getByText('Separate responsibilities')).toBeVisible();
    expect(screen.getByText('Assume asynchronous outcomes')).toBeVisible();
  });

  it('renders clarifications section', () => {
    render(<Docs />);
    
    expect(screen.getByText('Common misconceptions')).toBeVisible();
    expect(screen.getByText('Does BPMN execute smart contracts?')).toBeVisible();
  });

  it('filters terminology cards by category', () => {
    render(<Docs />);

    // 'Web3j' is a workflow term; 'EVM' is a chain term
    expect(screen.getByText('Web3j', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.getByText('EVM', { selector: 'strong' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Workflow' }));
    expect(screen.getByText('Web3j', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.queryByText('EVM', { selector: 'strong' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All terms' }));
    expect(screen.getByText('EVM', { selector: 'strong' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Blockchain' }));
    expect(screen.getByText('EVM', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.queryByText('Web3j', { selector: 'strong' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Network' }));
    expect(screen.getByText('P2P network', { selector: 'strong' })).toBeInTheDocument();
    expect(screen.queryByText('EVM', { selector: 'strong' })).not.toBeInTheDocument();
  });

  it('copies the code example to the clipboard and restores the label', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    render(<Docs />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy example' }));

    expect(writeText).toHaveBeenCalledTimes(1);
    // Flush the resolved writeText promise's .then handler (fake timers make
    // waitFor's internal interval unreliable).
    await act(async () => {});
    expect(screen.getByRole('button', { name: 'Copied!' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByRole('button', { name: 'Copy example' })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('alerts when the clipboard write fails', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });

    render(<Docs />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy example' }));

    await waitFor(() => expect(alertSpy).toHaveBeenCalledTimes(1));
    alertSpy.mockRestore();
  });

  it('opens the search dialog via the search trigger', () => {
    render(<Docs />);

    fireEvent.click(screen.getByRole('button', { name: 'Search docs' }));

    expect(screen.getByRole('dialog', { name: /search docs/i })).toBeInTheDocument();
  });

  it('closes the search dialog with Escape', () => {
    render(<Docs />);

    fireEvent.click(screen.getByRole('button', { name: 'Search docs' }));
    expect(screen.getByRole('dialog', { name: /search docs/i })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the search dialog with Ctrl+K', () => {
    render(<Docs />);

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

    expect(screen.getByRole('dialog', { name: /search docs/i })).toBeInTheDocument();
  });

  it('opens the search dialog with the / key', () => {
    render(<Docs />);

    fireEvent.keyDown(document, { key: '/' });

    expect(screen.getByRole('dialog', { name: /search docs/i })).toBeInTheDocument();
  });

  it('does not open search with / while an input is focused', () => {
    render(<Docs />);

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    fireEvent.keyDown(document, { key: '/' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    input.remove();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
