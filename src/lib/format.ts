import type { CollectionEntry } from 'astro:content';

type Painting = CollectionEntry<'paintings'>['data'];

export const formatPrice = (dollars: number) => `$${dollars.toLocaleString('en-US')}`;

/** "30 × 24 × 1.5 in" (height × width × depth). Non-breaking spaces keep it on one line. */
export const formatSize = ({ height, width, depth }: Painting['dimensions']) =>
  [height, width, depth].filter((n) => n !== undefined).join(' × ') + ' in';

export const statusLabel: Record<Painting['status'], string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
};
