// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap'; // Import sitemap integration

// https://astro.build/config
export default defineConfig({
  output: 'static', // Crucial for GitHub Pages

  integrations: [
    react(), 
    tailwind(),
    sitemap() // Add sitemap integration
  ],
  
  site: 'https://freakscode.com', // Your custom domain or GitHub Pages URL
  base: '/',   // Set to your repository name
  
  build: {
    assets: 'assets' // Default assets directory
  },
  
  image: {
    // domains: ['freakscode-co.github.io'], // Not strictly needed if using relative paths or full URLs
    remotePatterns: [{ protocol: 'https' }]
  },
  
  // Vite configuration can often be simplified for static sites
  // unless you have specific advanced needs.
  vite: {
    build: {
      // assetsDir: '_assets', // Default is 'assets' which is fine
      rollupOptions: {
        output: {
          // Astro handles asset hashing and naming well by default
          // assetFileNames: '_assets/[name][extname]' // Usually not needed to override
        }
      }
    }
  }
});