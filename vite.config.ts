import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../src/assets',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: 'terser',
  },
  server: {
    port: 8080,
    open: true,
    middlewareMode: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
