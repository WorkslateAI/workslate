import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HeroNetwork, MarketFlow, EvmHub, WorldMap } from '../../src/components/svg';

describe('SVGR Output Verification', () => {
  it('HeroNetwork renders as SVG with viewBox', () => {
    const { container } = render(<HeroNetwork />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
    expect(svg?.tagName).toBe('svg');
    expect(svg?.getAttribute('viewBox')).toBeTruthy();
    expect(svg?.querySelector('img')).toBeFalsy();
  });

  it('MarketFlow renders as SVG with viewBox', () => {
    const { container } = render(<MarketFlow />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
    expect(svg?.tagName).toBe('svg');
    expect(svg?.getAttribute('viewBox')).toBeTruthy();
    expect(svg?.querySelector('img')).toBeFalsy();
  });

  it('EvmHub renders as SVG with viewBox', () => {
    const { container } = render(<EvmHub />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
    expect(svg?.tagName).toBe('svg');
    expect(svg?.getAttribute('viewBox')).toBeTruthy();
    expect(svg?.querySelector('img')).toBeFalsy();
  });

  it('WorldMap renders as SVG with viewBox', () => {
    const { container } = render(<WorldMap />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
    expect(svg?.tagName).toBe('svg');
    expect(svg?.getAttribute('viewBox')).toBeTruthy();
    expect(svg?.querySelector('img')).toBeFalsy();
  });
});
