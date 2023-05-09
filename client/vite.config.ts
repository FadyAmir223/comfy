import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    createHtmlPlugin({ minify: true }),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
  ],
  build: {
    outDir: '../server/public',
    emptyOutDir: true,
  },
});
