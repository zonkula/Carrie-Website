# Carrie Website

A minimal, art-first portfolio and shop, built with [Astro](https://astro.build). See `SPEC.md` for the full spec.

## Run it

```sh
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```

## Adding a painting

1. Make a folder `src/assets/paintings/<id>/` (lowercase, hyphens, e.g. `morning-tide`).
2. Put the photos in it: `main.jpg`, plus optional `closeup-1.jpg`, `closeup-2.jpg`, `room-1.jpg`.
   Use full-quality web exports. The site makes the smaller versions automatically.
3. Add an entry to `src/data/paintings.yaml`. The comments at the top of that file list every field.
4. Run `npm run dev`. If a field is missing or wrong, the error message names it.

Series and their intros live in `src/data/series.yaml`. The schema for both files is in `src/content.config.ts`.

## Stripe (test mode)

The Buy button on a painting page creates a Stripe Checkout session on the server (`src/pages/api/checkout.ts`).

1. Copy `.env.example` to `.env` (gitignored) and paste the **test** secret key from the Stripe dashboard.
2. `npm run dev`, open a painting marked `available`, and click Buy. Pay with Stripe's test card `4242 4242 4242 4242`, any future date and any CVC.

The endpoint refuses live keys for now. Prices always come from `paintings.yaml`, never from the browser.

**Not done yet:** a paid painting is not marked sold automatically. Until the Stripe webhook is added, change its `status` to `sold` in `paintings.yaml` by hand. Before launch, set `security.allowedDomains` in `astro.config.mjs` (see the comment there).

## High-res masters

Keep print masters in `masters/` (gitignored) or another backed-up location. They never go in the repo.
