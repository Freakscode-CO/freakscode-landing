// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        AURA_SURVEYS_KV: KVNamespace;
        // Add other Cloudflare bindings here if needed
      };
      // Add other Cloudflare context properties like `cf`, `ctx.waitUntil` if needed
    };
    // Add other custom properties to `locals` if you have them
  }
}
