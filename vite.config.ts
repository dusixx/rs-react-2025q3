/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const chunkId = id.toString().split('node_modules/')[1].split('/')[0].toString();
            return btoa(chunkId).replace(/[^\w]/g, '').split('').reverse().join('');
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/styles/utils/placeholders" as *;
          @use "/src/styles/utils/vars" as *;
        `,
      },
    },
    modules: {
      localsConvention: 'camelCase',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text'],
      include: ['**/*.tsx', '**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/*.d.ts',
        '**/index.ts',
        '**/use*',
        'src/services',
        'src/*.*',
        'src/utils',
        '*.config.*',
        '**/data/*',
      ],
    },
  },
});
