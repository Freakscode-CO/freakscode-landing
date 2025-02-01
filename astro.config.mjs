// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://freakscode-co.github.io',
  base: '/freakscode-landing',
  build: {
    assets: '_assets'
  },
  vite: {
    build: {
      assetsDir: '_assets',
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name][extname]'
        }
      }
    }
  }
});