# Phone test checklist

Run through this on a real phone before showing the site. Ideally use one iPhone (Safari) and one Android phone (Chrome). Open the live Vercel address, not localhost.

Placeholder paintings and grey images are expected for now. This pass is about whether everything **works** and **feels right**.

## 1. First impression (homepage)

- [ ] The page loads quickly on mobile data (turn Wi-Fi off once).
- [ ] The painting, intro line and "View the gallery" button all show without scrolling.
- [ ] Fades are slow and gentle, not jumpy. Nothing flickers or shifts as the page loads.
- [ ] The "CARRIE" wordmark and the menu (Gallery · Shop · About · Contact) fit on one screen width.
- [ ] Nothing scrolls sideways anywhere (drag the page left and right).

## 2. Navigation

- [ ] Every menu link works, and the current page is underlined.
- [ ] Tapping "CARRIE" returns to the homepage from any page.
- [ ] The phone's back button / back swipe behaves as expected everywhere.
- [ ] Links and buttons are easy to tap with a thumb (no mis-taps).

## 3. Gallery

- [ ] The series links at the top glide smoothly to each series.
- [ ] Sold pieces show the red dot and "Sold", and reserved pieces show the outlined dot.
- [ ] Every card opens the right painting page.

## 4. Painting page

- [ ] "← Series name" goes back to that series in the gallery.
- [ ] Title, year, medium, size, framing, note and price are all readable.
- [ ] **Zoom:** tap the painting, and it opens full screen. Tap to zoom in, drag to look around, tap to zoom out, then "Close". Repeat for the close-up.
- [ ] Pinch-zoom and rotating the phone to landscape don't break the viewer.
- [ ] **Room mockup:** the painting sits on the wall above the sofa at a believable size. Compare a small and a large painting.
- [ ] "Previous / Next" moves through the series.

## 5. Buying (Stripe test mode)

No real money moves. Use Stripe's test card.

- [ ] On an **available** painting, tap **Buy the original**. Stripe Checkout opens with the right title and price.
- [ ] Pay with card `4242 4242 4242 4242`, any future expiry, any CVC, any US address. Apple Pay / Google Pay may also appear in test mode.
- [ ] You come back to the painting page with "Thank you. Your purchase is complete…" at the top.
- [ ] The payment appears in the Stripe **test** dashboard (Payments).
- [ ] Start checkout again and tap the back arrow in Stripe instead: "Checkout was cancelled. Nothing was charged."
- [ ] **Sold** and **reserved** paintings have no Buy button.
- [ ] Expected for now: the painting still shows as available after buying (marking sold automatically isn't built yet), and checkout adds no shipping charge.

## 6. Shop, About, Policies

- [ ] Shop: Originals and Prints jump links work. The prints tables are readable without sideways scrolling.
- [ ] "Ask about a print" opens Contact with **Prints** already selected.
- [ ] About: photo, bio and statement read well. Placeholder text is expected.
- [ ] Policies: the contents links jump to each section.

## 7. Forms

- [ ] Contact form: the phone shows the right keyboard (email keyboard for the email field), and the page doesn't zoom in when you tap a field.
- [ ] Submit a message. **Expected until Resend is connected:** "Sorry, your message could not be sent." The text you typed is still there.
- [ ] Footer signup on any page: **expected until Buttondown is connected:** "Sorry, that did not go through." The page stays where you were.

## 8. Sharing

- [ ] Text a painting link to yourself. The preview shows the painting, its title and price.
- [ ] Text the homepage link: it shows the featured painting.
- [ ] Optional: paste a link into https://www.opengraph.xyz to see previews for other apps.

## 9. Comfort and accessibility

- [ ] Turn on larger text in the phone's settings. Pages still read well and nothing overlaps.
- [ ] Turn on "Reduce Motion" (iPhone: Settings › Accessibility › Motion). Fades and smooth scrolling stop.
- [ ] In bright light, the grey caption text is still readable.

## Note anything odd

For each problem: the page, what you tapped, what happened, the phone model and browser. A screenshot helps.
