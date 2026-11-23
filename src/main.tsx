import { HelmetProvider } from 'react-helmet-async';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';

export const createRoot = ViteReactSSG(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
  // Runs on the client before hydrate/render (and during SSG, where it
  // no-ops). Delaying past rAF+task lets the prerendered HTML composite its
  // first frame — including the LCP element — before hydration saturates the
  // main thread.
  async () => {
    if (typeof window === 'undefined') return;
    const isDocs = window.location.hash.replace('#', '').startsWith('/docs');
    if (isDocs) {
      // Warm the lazy Docs chunk in parallel so it resolves near-instantly.
      import('./pages/Docs');
    }
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => setTimeout(resolve, 0));
    });
    if (isDocs) {
      // The SSG DOM is Home; Docs renders differently. Removing the marker
      // makes vite-react-ssg use render() instead of hydrate() — a single
      // clean client render, no React #418/#423 hydration work or errors.
      document
        .querySelector('[data-server-rendered]')
        ?.removeAttribute('data-server-rendered');
    }
  },
);
