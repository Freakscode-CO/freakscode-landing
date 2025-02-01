// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://freakscode-co.github.io',
  base: '/freakscode-landing',
  build: {
    assets: 'assets'
  },
  image: {
    domains: ['freakscode-co.github.io'],
    remotePatterns: [{ protocol: 'https' }]
  },
  vite: {
    build: {
      assetsDir: '_assets',
      rollupOptions: {
        output: {
          assetFileNames: '_assets/[name][extname]'
        }
      }
    },
    resolve: {
      alias: {
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
      }
    }
  }
});