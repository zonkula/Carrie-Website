# Painter Website Spec

**Goal:** A minimal, art-first site that displays her paintings and sells originals and prints.

## Design principles

- The art takes over the screen. Neutral background, one or two fonts, no decorative effects.
- Prices visible on every piece. No "inquire for price."
- Accurate color. Photos should match the real painting, no enhancement.
- Mobile first. Most visitors will arrive from a phone.

## Pages

- **Home:** one strong hero image or a short rotation of her best work, a one-line intro, and a clear link to the shop.
- **Gallery:** organized by series or collection. Sold work stays visible and is marked sold. Current work only.
- **Painting page:** see the fields below.
- **Shop:** originals and prints in separate sections.
- **About:** a real photo of her, a short story, and an artist statement.
- **Contact and Commissions:** a simple inquiry form plus an email signup.
- **Policies:** shipping, returns, framing, print info.

## Painting page fields

- Title, year, medium, exact dimensions in inches
- Main image plus one or two close-ups showing texture
- Room-scale mockup so buyers can judge size
- Framed or unframed
- Short note on the piece
- Price and status (available, sold, reserved)
- Buy button for the original, plus a Print options selector if prints exist

## Polish details (the wow factor)

These make the site feel like a gallery, not a store. Build the first group in iteration one. The second group can follow.

### Iteration one

- **Zoom on click:** full-resolution view so buyers can see brushwork and texture.
- **Room mockups:** each painting shown at true scale on a living room wall. Add a second room or wall color where possible.
- **Slow, quiet transitions and generous white space:** fades and gentle motion only. The art is the focus.
- **Her own words:** a real artist statement and bio, even a rough draft, in her voice.
- **Series pages:** each collection gets a short intro so the work reads like an exhibition.

### Next round

- **Link preview cards:** when the site or a painting is shared by text or social, it shows her painting, title and price.
- **Scale visualizer:** pick a wall size or add a sofa or person silhouette so buyers see how big a piece is.
- **Room switcher:** toggle the same painting between a few room styles.
- **Frame preview:** toggle frame options on a print before buying.
- **Palette-aware pages:** the page background or accent color subtly picks up the painting's palette.
- **Swipe and arrow-key browsing:** move between paintings without going back to the gallery grid.
- **Hover close-up:** in the gallery grid, hovering swaps to a texture close-up.
- **Short light video:** a few seconds of the painting under natural light to show glazes and depth.
- **Process section:** photos or a short video of her in the studio.
- **"Notify me" on sold pieces:** collects an email for similar work or new releases.
- **Collector list:** early access to new paintings before public release.
- **Commission page:** a simple step-by-step process and inquiry form.
- **Unboxing details:** a signed certificate of authenticity, a handwritten thank-you note, and packaging photos on the policies page.
- **Testimonials and exhibitions:** buyer quotes, shows and press, kept short.
- **Speed:** blur-up image placeholders and fast loading, so large images never feel slow.
- **Descriptive alt text:** written for each painting, which helps accessibility and search.

## Originals

- One-of-one: single Buy button, auto-marks sold after purchase.
- Include a certificate of authenticity.
- Shipping: she packages carefully, buyer pays, tracking and insurance included.
- Returns: short inspection window (suggest 7 days) with return authorization. She decides.

## Prints

- Sizes and paper options, listed with price.
- State whether open or limited edition. Signed limited-edition giclee adds scarcity.
- Fulfillment: **decision needed** (see below).
- Shipping: small prints flat in a sleeve inside a stiff envelope, 16x20 and larger rolled in a tube.
- Replace or refund for damage or printer error.

## Decision needed: print fulfillment

- **Option A, partner print shop:** site takes the order and the shop prints and ships. She approves a color proof before any print goes live. Better color control and protects her files.
- **Option B, customer takes a file to any shop:** needs a high-res download plus a license statement for personal use. Less control over quality.
- Recommendation: Option A.

## Photography checklist

- Natural indirect light (north-facing window) at about 45 degrees, or diffused artificial light with consistent color temperature
- Neutral wall, camera on a tripod, lens parallel to the painting
- Custom white balance, low ISO, narrow aperture
- Check the photo against the real painting
- Photograph varnished pieces carefully to avoid glare
- Keep a high-res master for prints and web-sized versions for the site

## Build approach

- Custom front end for gallery and painting pages (the part that needs to look great).
- Hosted checkout behind it (Stripe or Shopify Buy Button) so payments, tax and shipping rates are not hand-rolled.
- Email signup from day one.
- Fast image loading: compressed web versions, lazy loading, zoom on click.

## Payments and fulfillment

Use a hosted checkout for payments. Start with manual or hands-off print fulfillment, depending on volume.

### Payments

- **Option A, Stripe Checkout or Payment Links (recommended for a custom build):** 2.9% + $0.30 per US card payment, no monthly fee ([source](https://globalfeecalculator.com/blog/how-stripe-fees-work/)). Shipping rates are a fixed amount per order ([source](https://docs.stripe.com/payments/during-payment/charge-shipping)). Stripe Tax costs 0.5% per transaction and only collects where she is registered ([source](https://docs.stripe.com/tax/checkout/page)). Originals need to be marked sold by the site, either on payment success or via a Stripe webhook.
- **Option B, Shopify Buy Button:** embeds products on any existing site and sends buyers to Shopify checkout. Handles inventory and print-service apps. Starter plan pricing and fees are reported inconsistently, so confirm on Shopify's pricing page before choosing.

### Print fulfillment

- **Route 1, fine-art print-on-demand:** Prodigi (no monthly fee, prints roughly $8 to $12, framed roughly $25 to $45, [source](https://bootstrappingecommerce.com/best-print-on-demand-sites-for-high-quality-prints/)) or Finer Works (order per sale, no account fees, [source](https://support.finerworks.com/?p=1007)). CreativeHub has no US fulfillment.
- **Route 2, local print shop (manual):** customer pays on the site, she places the order with the shop, shop ships or she picks up. Giclée jobs take 2 to 4 weeks, with proofs for color correction ([source](https://nataliamirabito.squarespace.com/fresh-paint-blog/how-to-make-giclee-prints)). Ask for wholesale pricing per size and whether they ship to customers.
- **Route 3, both:** local shop for limited editions, print-on-demand for the rest.
- Always order a sample of her own painting from any provider before listing it.

### Setup order

1. Confirm her state and register the business.
2. Open a Stripe account tied to a business bank account.
3. Scan or photograph each painting at high resolution.
4. Order sample prints and compare color against the originals.
5. Set print sizes and prices (wholesale cost + shipping + her margin).
6. Create one product per original (quantity 1) and one per print size.
7. Wire up checkout, shipping rates and confirmation emails.
8. Place a real test order before launch.
9. Publish the shipping and returns policies.

### Taxes and legal

- A seller's permit or sales tax permit is typically needed for taxable goods, and rules vary by state. Some places exempt fine art sold by the original artist.
- With nexus only in her home state, she collects sales tax only from buyers in that state ([source](https://www.taxjar.com/?p=8366)).
- Drop-shipped goods can be taxed differently ([source](https://stripe.com/en-bg/resources/more/adding-sales-tax-when-shipping-how-businesses-should-handle-it)).
- Confirm with her state's tax office or an accountant.

## Open questions for her

1. Print fulfillment: partner shop or file license?
2. Price range for originals and prints, and are prices public?
3. Does she ship originals herself, or offer local pickup too?
4. Open or limited edition prints?
5. Does she take commissions?
6. Does she want to register copyright before launch? (Worth checking with a lawyer.)
