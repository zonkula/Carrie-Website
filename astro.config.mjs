// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';

// Read .env (if present) so SITE_URL can be set there as well as in the host's settings.
try {
  process.loadEnvFile();
} catch {
  // no .env file: fine
}

// The site's public address, e.g. https://example.com. REQUIRED before launch:
//   - link previews (texts, social posts) need full image and page URLs
//   - the server only trusts this domain, so Stripe sends buyers back to the right place
const SITE_URL = process.env.SITE_URL || undefined;
const siteHost = SITE_URL ? new URL(SITE_URL) : undefined;

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE_URL,

  // Pages are prebuilt as static HTML. Only the /api/ endpoints run on the server.
  // Swap this adapter for the host's (Vercel, Netlify, ...) when deploying.
  adapter: node({ mode: 'standalone' }),

  // Astro only trusts the Host header for these domains. Without one, server requests see
  // "localhost", and Stripe would send buyers back there.
  security: siteHost
    ? { allowedDomains: [{ hostname: siteHost.hostname, protocol: siteHost.protocol.replace(':', '') }] }
    : {},

  env: {
    schema: {
      // Read at runtime from the environment or .env. Never bundled into the browser.
      STRIPE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Contact form email (Resend) and mailing list (Buttondown). See src/lib/deliver.ts.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      BUTTONDOWN_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
