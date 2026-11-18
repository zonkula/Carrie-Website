# Open actions

Everything still to do before and after launch. Add new items as they come up, tick them off (`- [x]`) when done, and move finished sections to **Done** at the bottom.

**Owner key:** **Her** = the artist decides or supplies it. **Us** = build or setup work.

_Last updated: 2026-11-18_

---

## Decisions (Her)

These come from the open questions in SPEC.md. Several block work further down.

- [ ] **Print fulfilment.** Partner print shop, print-on-demand (Prodigi / Finer Works), local shop, or a mix. _Blocks online print ordering._ Spec recommends a partner shop.
- [ ] **Open or limited edition prints**, and whether limited editions are signed and numbered.
- [ ] **Print sizes, papers and prices** (wholesale cost + shipping + margin).
- [ ] **Original prices** for each painting.
- [ ] **Shipping for originals.** Who ships, US only or international, dispatch time, and whether local pickup is offered. Checkout currently collects **US addresses only**.
- [ ] **Shipping rates.** Flat rate or per size. Checkout currently charges **no shipping**.
- [ ] **Returns.** Inspection window (spec suggests 7 days) and who pays return shipping.
- [ ] **Framing.** Whether unframed canvases arrive wired and ready to hang, and whether framing can be added.
- [ ] **Commissions.** Does she take them? If so: kinds, starting price, turnaround.
- [ ] **Copyright registration** before launch (check with a lawyer).

## Content to supply (Her)

- [ ] Her full name as it should appear in the wordmark and page titles → `src/site.config.ts` (`name`).
- [ ] One-line homepage intro in her voice → `src/site.config.ts` (`intro`).
- [ ] Photograph every painting per the SPEC.md photography checklist (main image, 1–2 texture close-ups).
- [ ] Add each painting to `src/data/paintings.yaml` with images in `src/assets/paintings/<id>/`, then **delete the three placeholder paintings and their images**.
- [ ] Descriptive alt text for each painting (the `alt` field).
- [ ] Real series names and intros → `src/data/series.yaml` (delete the placeholders).
- [ ] Choose which paintings appear on the homepage (`featured: true`; the first one is the hero).
- [ ] Portrait photo → replace `src/assets/site/portrait.jpg`, and describe it in `src/content/bio.md` (`photoAlt`).
- [ ] Bio → `src/content/bio.md`.
- [ ] Artist statement → `src/content/statement.md`.
- [ ] Commissions text → `src/content/commissions.md`.
- [ ] Fill every PLACEHOLDER in `src/content/policies.md`, and set its `updated` date.
- [ ] Instagram profile URL (optional) → `src/site.config.ts` (`instagram`).

## Accounts and business setup

Follows the setup order in SPEC.md.

- [ ] Confirm her state and register the business.
- [ ] Seller's / sales tax permit; confirm sales tax rules for fine art with the state or an accountant.
- [ ] Business bank account.
- [ ] **Stripe** account tied to the business bank account. Put the test key in `.env` (`STRIPE_SECRET_KEY`).
- [ ] Decide on Stripe Tax (0.5% per transaction) or handle tax another way.
- [ ] Buy a domain.
- [ ] Choose a host (Vercel, Netlify, a Node server, ...) and swap the Node adapter in `astro.config.mjs` for the host's.
- [ ] **Resend** account, verify the domain, then set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- [ ] **Buttondown** account, then set `BUTTONDOWN_API_KEY`. Check whether double opt-in is on; if so, change the signup message to "check your inbox to confirm".
- [ ] Order sample prints of her own paintings from the chosen printer and compare color against the originals.

## Build work (Us)

### Before launch

- [ ] Set `site` and uncomment `security.allowedDomains` in `astro.config.mjs` with the real domain. Without it, Stripe sends buyers back to `localhost`.
- [ ] **Stripe webhook to mark originals sold automatically** after payment. Needs a place to store status outside `paintings.yaml`. Until then, set `status: sold` by hand after each sale.
- [ ] Add shipping rates to Stripe Checkout once decided (and international countries, if any).
- [ ] Switch to live Stripe keys: deliberately remove the test-only check in `src/pages/api/checkout.ts`.
- [ ] Run a full test purchase with the Stripe test card (`4242 4242 4242 4242`).
- [ ] Send a real test message and signup once Resend and Buttondown keys are set. Both were only tested with fake keys.
- [ ] Place one real order before launch (SPEC.md setup step 8).
- [ ] Favicon and `robots.txt`.
- [ ] Read through every page on a real phone with real photos in place.

### SPEC.md iteration one, not yet built

- [ ] **Room scale is a close match, not exact.** The room image was generated from the illustration, so its sofa is treated as 84 in wide (6.5 px/in on the wall). Its layout matches the illustration within 1–2%, but the furniture is drawn a little taller than in the illustration. Revisit if a real, measured room photo is used later.
- [ ] (Optional) A higher-resolution version of the room photo. It is 1188 px wide, which looks slightly soft on large high-density screens.
- [ ] **Second room** (different room or wall color) in `rooms.yaml`, then a **room switcher** on the painting page. The data already supports up to 2 rooms per painting (`rooms:` in `paintings.yaml`).
- [ ] Decide what to do for paintings too large for the room's visible wall (currently cut off at the photo edge, with a build warning).
- [ ] **Print options selector** on the painting page and **print checkout**. _Blocked by the print fulfilment decision._
- [ ] Decide whether series need their own pages. Today each series is a section of the gallery with its intro.

### SPEC.md next round

- [ ] Link preview cards (shows the painting, title and price when shared).
- [ ] Scale visualizer (wall size, sofa or person silhouette).
- [ ] Room switcher.
- [ ] Frame preview for prints.
- [ ] Palette-aware page backgrounds.
- [ ] Swipe and arrow-key browsing between paintings (previous/next links exist; add gestures and keys).
- [ ] Short light video of each painting.
- [ ] Process / studio section.
- [ ] "Notify me" on sold pieces.
- [ ] Collector list (early access).
- [ ] Commission page with a step-by-step process.
- [ ] Unboxing details on the policies page (certificate, thank-you note, packaging photos).
- [ ] Testimonials and exhibitions.
- [ ] Blur-up image placeholders.

---

## Done

- [x] Project set up (Astro), paintings and series data files with schema checks.
- [x] Homepage: hero painting, intro line, gallery and shop links.
- [x] Painting page: details, price and status, click-to-zoom, Buy button (Stripe test mode), sold state, back link, previous/next.
- [x] Gallery: grouped by series with intros, sold work marked, close-up on hover, smooth-scrolling series links.
- [x] About page and Contact and Commissions page (inquiry form, email signup, spam trap).
- [x] Shop page (originals; prints with prices, ordering "opens soon") and Policies page (draft).
- [x] Header navigation, footer with email signup on every page.
- [x] Forms wired to Resend and Buttondown, switched on by environment variables.
- [x] All work committed and pushed to GitHub (2026-11-18).
- [x] True-scale room mockup on painting pages (2026-11-18).
- [x] Room is now the realistic living room image generated from the illustration (no canvas on the wall), calibrated to an 84 in sofa at 6.5 px per inch (2026-11-18).
- [x] Room mockup work committed and pushed (2026-11-18).
