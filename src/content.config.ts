import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Series / collections. Each gets a short intro so the gallery reads like an exhibition.
 * Data: src/data/series.yaml
 */
const series = defineCollection({
  loader: file('src/data/series.yaml'),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    order: z.number().int(), // display order in the gallery, lowest first
  }),
});

/**
 * Rooms for the true-scale mockup on painting pages. Each room image is "calibrated":
 * we know how many image pixels equal one inch on its wall.
 * Data: src/data/rooms.yaml (see the comments there for how to measure a new room photo)
 */
const rooms = defineCollection({
  loader: file('src/data/rooms.yaml'),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // e.g. "Living room", shown on the future room switcher
      order: z.number().int(), // the lowest is the default room
      image: image(),
      pixelsPerInch: z.number().positive(), // image pixels per real inch, measured on the wall plane
      floorY: z.number().nonnegative(), // pixel row (from the top) where the wall meets the floor
      centerX: z.number().nonnegative(), // pixel column the painting is centred on
      furnitureTop: z.number().nonnegative().default(0), // inches: top of furniture under the painting (0 = none)
      scaleNote: z.string(), // tells visitors what the reference object is, e.g. "Sofa is 84 in wide"
    }),
});

/**
 * Paintings. One entry per original. The YAML `id` becomes the URL slug.
 * Data: src/data/paintings.yaml
 * Image paths are relative to the YAML file, e.g. ../assets/paintings/<id>/main.jpg
 */
const paintings = defineCollection({
  loader: file('src/data/paintings.yaml'),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        year: z.number().int().min(1900).max(2100),
        medium: z.string(), // e.g. "Oil on linen"
        dimensions: z.object({
          width: z.number().positive(), // inches
          height: z.number().positive(), // inches
          depth: z.number().positive().optional(), // inches, for canvas or panel depth
        }),
        series: reference('series'),

        framed: z.boolean(),
        frame: z.string().optional(), // e.g. "Natural oak floater frame"

        note: z.string(), // short note on the piece, in her voice
        alt: z.string(), // descriptive alt text for the main image

        price: z.number().int().positive(), // whole US dollars; always shown
        status: z.enum(['available', 'sold', 'reserved']),

        featured: z.boolean().default(false), // include in the home page hero rotation

        images: z.object({
          main: image(),
          closeups: z.array(image()).max(2).default([]), // texture close-ups
        }),

        // Rooms for the true-scale mockup, from rooms.yaml. Optional: leave it out to use the
        // default room. A second room is for the room switcher (not built yet).
        rooms: z.array(reference('rooms')).min(1).max(2).optional(),

        // Hosted checkout link for the original (Stripe Payment Link). Empty until Stripe is set up.
        checkout: z.url().optional(),

        prints: z
          .object({
            edition: z.enum(['open', 'limited']),
            editionSize: z.number().int().positive().optional(), // required when limited
            options: z
              .array(
                z.object({
                  size: z.string(), // e.g. "11x14"
                  paper: z.string(), // e.g. "Hahnemühle Photo Rag"
                  price: z.number().int().positive(), // whole US dollars
                  checkout: z.url().optional(),
                }),
              )
              .min(1),
          })
          .refine((p) => p.edition === 'open' || p.editionSize !== undefined, {
            message: 'Limited-edition prints need an editionSize',
            path: ['editionSize'],
          })
          .optional(),
      }),
});

export const collections = { series, rooms, paintings };
