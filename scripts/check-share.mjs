// Shows what a link preview will look like for a page, and checks the image is reachable.
//
//   npm run check:share -- http://localhost:4321/paintings/<id>/
//   npm run check:share -- https://your-domain.com/            (after launch)
//
// It reads the same tags that iMessage, WhatsApp, Facebook, LinkedIn, Slack and X read.

const url = process.argv[2];
if (!url) {
  console.error('Usage: npm run check:share -- <page URL>');
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Could not load ${url}: HTTP ${res.status}`);
  process.exit(1);
}
const html = await res.text();

const tags = {};
for (const m of html.matchAll(/<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*)"/g)) tags[m[1]] = m[2].replace(/&amp;/g, '&');

const want = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type', 'product:price:amount', 'twitter:card'];
console.log(`\nLink preview for ${url}\n`);
for (const key of want) console.log(`  ${key.padEnd(22)} ${tags[key] ?? '(missing)'}`);

const problems = [];
for (const key of ['og:title', 'og:description', 'og:image']) if (!tags[key]) problems.push(`${key} is missing`);

if (tags['og:image']) {
  const img = await fetch(tags['og:image']).catch(() => null);
  if (!img || !img.ok) problems.push(`image did not load (${img ? `HTTP ${img.status}` : 'network error'}): ${tags['og:image']}`);
  else {
    const bytes = (await img.arrayBuffer()).byteLength;
    console.log(`\n  image loads: ${img.headers.get('content-type')}, ${(bytes / 1024).toFixed(1)} KB`);
    if (!/^image\//.test(img.headers.get('content-type') ?? '')) problems.push('og:image is not an image');
  }
  if (/localhost|127\.0\.0\.1/.test(tags['og:image'])) {
    console.log('\n  Note: the URLs point at localhost. That is fine for checking tags, but apps on other');
    console.log('  devices cannot load it. Set SITE_URL to the public address for real sharing.');
  }
}

if (problems.length) {
  console.log('\nProblems:');
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log('\nAll required preview tags are present.\n');
