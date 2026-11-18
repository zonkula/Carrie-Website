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

## High-res masters

Keep print masters in `masters/` (gitignored) or another backed-up location. They never go in the repo.
