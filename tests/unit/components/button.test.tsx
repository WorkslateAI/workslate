import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../../../src/components/atoms/Button';

describe('Button', () => {
  it('renders primary variant with correct classes', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('bg-gradient-to-r');
  });

  it('renders secondary variant with correct classes', () => {
    render(<Button variant="secondary">Click me</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('bg-white');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="md">Click</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('px-4');
    
    rerender(<Button size="lg">Click</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('px-6');
  });

  it('applies custom function className', () => {
    render(<Button className="custom-class">Click</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('custom-class');
  });
});
