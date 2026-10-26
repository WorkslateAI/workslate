import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from '../../../src/components/atoms/Logo';

describe('Logo', () => {
  it('renders the supplied lockup with responsive density assets and dimensions', () => {
    render(<Logo variant="header" size={36} />);
    const logo = screen.getByRole('img', { name: 'Workslate AI' });

    expect(logo).toHaveAttribute('src', '/assets/images/logo@1x.jpeg');
    expect(logo).toHaveAttribute('srcset', '/assets/images/logo@1x.jpeg 1x, /assets/images/logo.jpeg 2x');
    expect(logo).toHaveAttribute('width', '720');
    expect(logo).toHaveAttribute('height', '158');
    expect(logo).toHaveAttribute('loading', 'eager');
  });
});
