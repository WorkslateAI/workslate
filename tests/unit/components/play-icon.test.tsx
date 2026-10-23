import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlayIcon } from '../../../src/components/atoms/PlayIcon';

describe('PlayIcon', () => {
  it('renders as an SVG element', () => {
    const { container } = render(<PlayIcon />);
    const svg = container.querySelector('svg');
    
    expect(svg).toBeTruthy();
    expect(svg?.tagName).toBe('svg');
  });

  it('applies custom className', () => {
    const { container } = render(<PlayIcon className="custom-class" />);
    const svg = container.querySelector('svg');
    
    expect(svg?.classList.contains('custom-class')).toBe(true);
  });

  it('has correct viewBox for scaling', () => {
    const { container } = render(<PlayIcon />);
    const svg = container.querySelector('svg');
    
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
  });
});
