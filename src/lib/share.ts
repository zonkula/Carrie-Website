import type { CollectionEntry } from 'astro:content';
import { formatPrice, formatSize, statusLabel } from './format';

/** Link preview image for a painting, made by src/pages/share/[id].jpg.ts (1200 × 630). */
export const shareImagePath = (paintingId: string) => `/share/${paintingId}.jpg`;
export const SHARE_IMAGE = { width: 1200, height: 630 };

/** Title and description for a painting's link preview: always includes the price. */
export function paintingShareText(p: CollectionEntry<'paintings'>['data']) {
  const status = p.status === 'available' ? 'Available' : statusLabel[p.status];
  return {
    title: `${p.title} · ${formatPrice(p.price)}`,
    description: `${p.year}. ${p.medium}, ${formatSize(p.dimensions).replace(/ /g, ' ')}. Original painting, ${formatPrice(p.price)}. ${status}.`,
  };
}
