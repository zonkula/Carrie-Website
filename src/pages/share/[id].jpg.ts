import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import sharp from 'sharp';

/**
 * Link preview images, one per painting: /share/<painting-id>.jpg
 * The whole painting, never cropped, centred on the site's background colour at 1200 × 630
 * (the shape most apps show). Generated once at build time.
 */
export const prerender = true;

const W = 1200;
const H = 630;
const PAD = 48;
const BACKGROUND = '#f7f7f5';

export const getStaticPaths = (async () => {
  const paintings = await getCollection('paintings');
  return paintings.map((painting) => ({ params: { id: painting.id }, props: { painting } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ painting: CollectionEntry<'paintings'> }> = async ({ props }) => {
  // Astro keeps the source file's path on a hidden `fsPath` property of imported images.
  const file = (props.painting.data.images.main as unknown as { fsPath?: string }).fsPath;
  if (!file) throw new Error(`No source file for ${props.painting.id}'s main image`);

  const art = await sharp(file)
    .rotate() // respect camera orientation
    .resize({ width: W - 2 * PAD, height: H - 2 * PAD, fit: 'inside', withoutEnlargement: false })
    .toBuffer({ resolveWithObject: true });

  const card = await sharp({ create: { width: W, height: H, channels: 3, background: BACKGROUND } })
    .composite([
      {
        input: art.data,
        left: Math.round((W - art.info.width) / 2),
        top: Math.round((H - art.info.height) / 2),
      },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(card), { headers: { 'Content-Type': 'image/jpeg' } });
};
