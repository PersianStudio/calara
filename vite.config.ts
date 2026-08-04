import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { iceAliases } from './vite.aliases';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: false,
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],
  resolve: { alias: iceAliases },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Calara',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@mui\//,
        /^@emotion\//,
        /^@fontsource\//,
        'i18next',
        'react-i18next',
        'moment',
        'date-fns',
        'classnames',
        'react-hook-form',
        'react-datepicker',
        'react-icons',
        'react-country-flag',
        'react-use',
        'stylis',
        'stylis-plugin-rtl',
      ],
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
});
