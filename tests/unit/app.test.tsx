import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../src/App';

const renderApp = () =>
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>,
  );

function goToHash(hash: string) {
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new Event('hashchange'));
  });
}

describe('App navigation transitions', () => {
  beforeEach(() => {
    window.location.hash = '';
    document.body.classList.remove('page-leaving');
  });

  afterEach(() => {
    window.location.hash = '';
    document.body.classList.remove('page-leaving');
    vi.restoreAllMocks();
  });

  it('renders the home page with a persistent header', async () => {
    renderApp();
    expect(document.querySelector('header')).toBeInTheDocument();
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /Reconcile First/i }),
      ).toBeInTheDocument(),
    );
  });

  it('navigates to the docs page via the #/docs hash route', async () => {
    renderApp();
    goToHash('#/docs');
    await waitFor(
      () =>
        expect(
          screen.getByRole('heading', { name: /Orchestrating value across/i }),
        ).toBeInTheDocument(),
      { timeout: 2000 },
    );
  });

  it('applies fade-out then fade-in classes during route swap', async () => {
    renderApp();
    goToHash('#/docs');
    // During the fade-out window the main element carries the fade-out class
    const main = document.querySelector('main');
    expect(main?.className).toContain('page-fade-out');
    await waitFor(
      () => expect(document.querySelector('main')?.className).toContain('page-fade-in'),
      { timeout: 2000 },
    );
  });

  it('keeps the header mounted across the transition', async () => {
    renderApp();
    const header = document.querySelector('header');
    goToHash('#/docs');
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: /Orchestrating value across/i }),
      ).toBeInTheDocument(),
    );
    expect(document.querySelector('header')).toBe(header);
  });

  it('moves focus to the page heading after navigation', async () => {
    renderApp();
    goToHash('#/docs');
    await waitFor(
      () => expect(document.activeElement?.id).toBe('page-heading'),
      { timeout: 2000 },
    );
  });

  it('fades out before navigating to a static .html page', () => {
    renderApp();
    const link = document.createElement('a');
    link.href = '/privacy.html';
    link.textContent = 'Privacy';
    document.body.appendChild(link);

    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(false); // default navigation was prevented
    expect(document.body.classList.contains('page-leaving')).toBe(true);

    link.remove();
  });

  it('does not intercept hash links', () => {
    renderApp();
    const link = document.createElement('a');
    link.href = '#/docs';
    link.textContent = 'Docs';
    document.body.appendChild(link);

    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(true);
    expect(document.body.classList.contains('page-leaving')).toBe(false);

    link.remove();
  });

  it('swaps instantly without fade classes when prefers-reduced-motion is set', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList);

    renderApp();
    goToHash('#/docs');
    // No fade-out phase: route commits immediately
    expect(document.querySelector('main')?.className).not.toContain('page-fade-out');
    await waitFor(
      () =>
        expect(
          screen.getByRole('heading', { name: /Orchestrating value across/i }),
        ).toBeInTheDocument(),
      { timeout: 2000 },
    );
  });
});
