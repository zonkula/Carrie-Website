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
          rooms: z.array(image()).default([]), // room-scale mockups
        }),

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

export const collections = { series, paintings };
