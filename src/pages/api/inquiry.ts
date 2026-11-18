import type { APIRoute } from 'astro';
import { deliverInquiry } from '../../lib/deliver';
import { TOPICS, field, isBot, isEmail, redirect } from '../../lib/forms';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const back = (state: string) => redirect(`/contact/?inquiry=${state}#inquiry`);
  const form = await request.formData().catch(() => null);

  // Pretend success to bots so they don't retry.
  if (isBot(form)) return back('sent');

  const name = field(form, 'name', 120);
  const email = field(form, 'email', 200);
  const topic = TOPICS.includes(field(form, 'topic')) ? field(form, 'topic') : TOPICS[0];
  const message = field(form, 'message', 5000);

  if (!name || !isEmail(email) || !message) return back('invalid');

  const ok = await deliverInquiry({ name, email, topic, message });
  return back(ok ? 'sent' : 'error');
};
