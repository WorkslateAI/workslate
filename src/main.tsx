import { HelmetProvider } from 'react-helmet-async';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';

export const createRoot = ViteReactSSG(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
