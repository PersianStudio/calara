import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  root: resolve(__dirname, 'showcase'),
  // Project Pages: https://persianstudio.github.io/calara/showcase/
  // Keep `/` for local `pnpm dev`.
  base: command === 'build' ? '/calara/showcase/' : '/',
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
