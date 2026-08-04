import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { iceAliases } from './vite.aliases';

export default defineConfig(({ command }) => ({
  root: resolve(__dirname, 'showcase'),
  // Project Pages URL: https://persianstudio.github.io/calara/
  // Keep `/` for local `pnpm dev`.
  base: command === 'build' ? '/calara/' : '/',
  plugins: [react()],
  resolve: {
    alias: iceAliases,
  },
  server: {
    port: 5181,
  },
  build: {
    outDir: resolve(__dirname, 'showcase-dist'),
    emptyOutDir: true,
  },
}));
