import { BUTTONDOWN_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from 'astro:env/server';

/**
 * Where contact-form messages and email signups go.
 *
 *   inquiry -> emailed to her via Resend (https://resend.com)
 *              needs RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL
 *   signup  -> added to her Buttondown mailing list (https://buttondown.com)
 *              needs BUTTONDOWN_API_KEY
 *
 * Set these in .env (see .env.example) or in the host's environment settings.
 * To use a different provider, replace the body of the matching function.
 *
 * When a provider is NOT configured:
 *   - `npm run dev`: the submission is printed in the terminal and the visitor sees "sent".
 *   - built site:    returns false, so the visitor is told it didn't go through.
 *                    A message is never silently dropped behind a fake "sent".
 */

export type Inquiry = { name: string; email: string; topic: string; message: string };
export type Signup = { email: string };

export async function deliverInquiry(inquiry: Inquiry): Promise<boolean> {
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return notConnected('inquiry', inquiry);

  const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: inquiry.email, // "Reply" in her email app goes straight to the visitor
        subject: oneLine(`Website: ${inquiry.topic} from ${inquiry.name}`),
        text: `${inquiry.message}\n\n---\nFrom: ${inquiry.name} <${inquiry.email}>\nAbout: ${inquiry.topic}\nSent from the website contact form.`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return true;
  } catch (err) {
    console.error('[inquiry] Could not send:', err instanceof Error ? err.message : err);
    return false;
  }
}

export async function deliverSignup(signup: Signup): Promise<boolean> {
  if (!BUTTONDOWN_API_KEY) return notConnected('signup', signup);

  try {
    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: { Authorization: `Token ${BUTTONDOWN_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: signup.email }),
    });
    if (res.ok) return true;
    const body = await res.text();
    // Already on the list counts as success for the visitor.
    if (res.status === 400 && /already/i.test(body)) return true;
    throw new Error(`Buttondown ${res.status}: ${body}`);
  } catch (err) {
    console.error('[signup] Could not subscribe:', err instanceof Error ? err.message : err);
    return false;
  }
}

function notConnected(kind: string, data: object): boolean {
  if (import.meta.env.DEV) {
    console.info(`[${kind}] Not sent (provider not configured). Received:`, data);
    return true;
  }
  console.error(`[${kind}] Provider not configured (see src/lib/deliver.ts). Submission was NOT delivered.`);
  return false;
}
