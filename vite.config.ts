import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: 'removeViewBox',
            },
          ],
        },
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
