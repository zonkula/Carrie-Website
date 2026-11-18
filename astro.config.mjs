// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

// Read .env (if present) so SITE_URL can be set there as well as in the host's settings.
try {
  process.loadEnvFile();
} catch {
  // no .env file: fine
}

// Building on Vercel? Vercel sets these automatically (System Environment Variables).
const onVercel = Boolean(process.env.VERCEL);
const https = (host) => (host ? `https://${host}` : undefined);
const vercelUrls = [
  https(process.env.VERCEL_PROJECT_PRODUCTION_URL), // e.g. carrie-website.vercel.app or the custom domain
  https(process.env.VERCEL_BRANCH_URL), // e.g. carrie-website-git-main-<team>.vercel.app
  https(process.env.VERCEL_URL), // this exact deployment
].filter(Boolean);

// The site's public address, e.g. https://example.com.
//   - link previews (texts, social posts) need full image and page URLs
//   - the server only trusts known domains, so Stripe sends buyers back to the right place
// SITE_URL wins if set (use it for a custom domain). On Vercel, production uses the production
// address and preview deployments use their own address.
const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV === 'production' ? vercelUrls[0] : https(process.env.VERCEL_URL)) ||
  undefined;

// Every address the site can be reached at. Astro only trusts the Host header for these; without
// one, server requests see "localhost", and Stripe would send buyers back there.
const trusted = [...new Set([SITE_URL, ...vercelUrls].filter(Boolean))].map((u) => new URL(u));

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE_URL,

  // Pages are prebuilt as static HTML. Only the /api/ endpoints run on the server.
  // On Vercel they become serverless functions; locally they run on a small Node server.
  adapter: onVercel ? vercel() : node({ mode: 'standalone' }),

  security: trusted.length
    ? { allowedDomains: trusted.map((u) => ({ hostname: u.hostname, protocol: u.protocol.replace(':', '') })) }
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
