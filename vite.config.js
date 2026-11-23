import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
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
        visualizer({
            filename: 'dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
});
