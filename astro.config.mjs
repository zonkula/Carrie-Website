// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Set to the real domain before launch (used for link preview cards and sitemap).
  // site: 'https://example.com',

  // Pages are prebuilt as static HTML. Only /api/checkout runs on the server.
  // Swap this adapter for the host's (Vercel, Netlify, ...) when deploying.
  adapter: node({ mode: 'standalone' }),

  // REQUIRED before launch: Astro only trusts the Host header for these domains.
  // Without it, server requests see "localhost", and Stripe would send buyers back there.
  // security: { allowedDomains: [{ hostname: 'example.com', protocol: 'https' }] },

  env: {
    schema: {
      // Read at runtime from the environment or .env. Never bundled into the browser.
      STRIPE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
