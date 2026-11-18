import type { APIRoute } from 'astro';
import { deliverSignup } from '../../lib/deliver';
import { field, isBot, isEmail, redirect } from '../../lib/forms';

export const prerender = false;

/** Only same-site paths like "/gallery/", never "//other.site" or a full URL. */
const safePath = (value: string) => (/^\/(?!\/)[\w\-/.]*$/.test(value) ? value : '/contact/');

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData().catch(() => null);
  // Send the visitor back to the page they signed up from (footer) or the Contact page.
  const from = safePath(field(form, 'from', 200) || '/contact/');
  const back = (state: string) => redirect(`${from}?signup=${state}#signup`);

  if (isBot(form)) return back('sent');

  const email = field(form, 'email', 200);
  if (!isEmail(email)) return back('invalid');

  const ok = await deliverSignup({ email });
  return back(ok ? 'sent' : 'error');
};
