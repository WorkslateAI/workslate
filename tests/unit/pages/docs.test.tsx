import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
