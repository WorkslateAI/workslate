import { HelmetProvider } from 'react-helmet-async';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';

// For /#/docs, start fetching the lazy Docs chunk immediately — in parallel
// with hydration — so the route swap doesn't wait on the network.
if (typeof window !== 'undefined' && window.location.hash.replace('#', '').startsWith('/docs')) {
  import('./pages/Docs');
}

export const createRoot = ViteReactSSG(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
