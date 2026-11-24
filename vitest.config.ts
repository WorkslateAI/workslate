import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    // jsdom reports "Not implemented: navigation/scrollTo" as unhandled errors
    // when app code calls window.location.href = / scrollTo. These are expected
    // in tests and must not fail the run.
    onUnhandledError(error) {
      if (/not implemented/i.test(error.message)) return false;
    },
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/',
      'tests/e2e/',
      'dist/',
      '**/*.config.{ts,js}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'dist/',
        '**/*.test.{ts,tsx}',
        '**/*.config.{ts,js}',
        '**/*.css',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
    },
  },
});
