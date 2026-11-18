import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { STRIPE_SECRET_KEY } from 'astro:env/server';
import Stripe from 'stripe';

// Runs on the server for every request (the rest of the site is static).
export const prerender = false;

/**
 * Buy button for an original. The form posts the painting id; the price, title and
 * availability always come from paintings.yaml, never from the browser.
 * Redirects (303) to Stripe Checkout, or back to the painting page with ?checkout=<state>.
 */
export const POST: APIRoute = async ({ request, url }) => {
  const go = (location: string) => new Response(null, { status: 303, headers: { Location: location } });

  const form = await request.formData().catch(() => null);
  const id = String(form?.get('painting') ?? '');
  const painting = id ? await getEntry('paintings', id) : undefined;
  if (!painting) return new Response('Painting not found', { status: 404 });

  const pagePath = `/paintings/${painting.id}/`;
  const back = (state: string) => go(`${pagePath}?checkout=${state}`);

  if (painting.data.status !== 'available') return back('unavailable');

  if (!STRIPE_SECRET_KEY) {
    console.error('[checkout] STRIPE_SECRET_KEY is not set. See .env.example.');
    return back('error');
  }
  // Test mode only for now. Remove this check deliberately when going live.
  if (!/^(sk|rk)_test_/.test(STRIPE_SECRET_KEY)) {
    console.error('[checkout] Refusing a non-test Stripe key. Use a sk_test_ key.');
    return back('error');
  }

  const { title, year, medium, dimensions, price, images } = painting.data;
  const size = [dimensions.height, dimensions.width, dimensions.depth].filter(Boolean).join(' × ');
  const isLocal = ['localhost', '127.0.0.1'].includes(url.hostname);

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: price * 100,
            product_data: {
              name: `${title} (original painting)`,
              description: `${year}. ${medium}, ${size} in. Includes a certificate of authenticity.`,
              // Stripe must be able to fetch the image, so skip it on localhost.
              ...(isLocal ? {} : { images: [new URL(images.main.src, url.origin).href] }),
            },
          },
        },
      ],
      // Originals ship from her studio. Shipping rates are not set up yet (see SPEC.md).
      shipping_address_collection: { allowed_countries: ['US'] },
      client_reference_id: painting.id,
      metadata: { painting: painting.id, kind: 'original' },
      // Short hold so an abandoned checkout doesn't tie up a one-of-one piece.
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      success_url: `${url.origin}${pagePath}?checkout=success`,
      cancel_url: `${url.origin}${pagePath}?checkout=cancelled`,
    });

    if (!session.url) throw new Error('Stripe returned no checkout URL');
    return go(session.url);
  } catch (err) {
    console.error('[checkout] Could not create Stripe Checkout session:', err instanceof Error ? err.message : err);
    return back('error');
  }
};
