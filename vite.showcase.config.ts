import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  root: resolve(__dirname, 'showcase'),
  base: command === 'build' ? '/calara/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@persianstudio/calara': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    port: 5181,
  },
  build: {
    outDir: resolve(__dirname, 'showcase-dist'),
    emptyOutDir: true,
  },
}));
