// Small helpers shared by the form endpoints.

/** Topics offered in the contact form. The first is the default. */
export const TOPICS = ['General question', 'Commission', 'A specific painting', 'Prints'];

export const redirect = (location: string) => new Response(null, { status: 303, headers: { Location: location } });

/** Trimmed string field, capped in length. Missing fields become ''. */
export const field = (form: FormData | null, name: string, max = 200) =>
  String(form?.get(name) ?? '')
    .trim()
    .slice(0, max);

// Deliberately simple: something@something.something, no spaces.
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/** Hidden "website" field that people never see or fill in. Bots usually do. */
export const isBot = (form: FormData | null) => field(form, 'website') !== '';
