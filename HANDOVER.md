# Kiwi Dose — Content, IA & Local SEO Pass: Handover

Nothing has been committed or deployed. All changes are in the working tree.

---

## 1. Blocked on the client

| Item | Needed for | Status |
|---|---|---|
| **Tabin ordering URL** | Every "Order Online" button | Set `TABIN_ORDER_URL` at the top of `script.js`. **That one line is the whole switch-on** — all 7 pages repoint automatically and the order page swaps its holding copy for live ordering copy. |
| **Parking information** | Contact page | `TODO` comment left in `contact.html`. Ask what's available: street parking on Mount Eden Road, time limits, nearby off-street. |
| **Facebook / TikTok URLs** | Footer, `sameAs` | Dead `href="#"` stubs were removed rather than shipped. Instagram is wired. If these accounts exist, send URLs and they go back in. |
| **Photographer's licence terms** | Legal | Confirm what the shoot permits: web, social, third-party/directory (Google Business Profile), and whether attribution is required or the licence is time-limited. Commissioned hospitality shoots are frequently web-and-social only. **Do not use these in paid advertising until this is confirmed.** |
| **Square logo mark** | Favicon | No square brand asset exists. An interim favicon was built from the leaf glyph already in the design system (`favicon.svg`), on brand deep-green. Replace when a proper mark exists. |
| **GBP street format** | NAP consistency | Structured data currently says "426 Mount Eden Road". If the Google Business Profile writes "Mt Eden Road", change `streetAddress` in the JSON-LD to match GBP exactly — visible prose stays "Mount Eden Road". |
| **"Hydro Charge"** | Copy accuracy | The brief says "Hydro Charge drinks"; the photography says "Hydration Boost" and "Wave Cooler". Confirm the real product-line name. |

**Assumed confirmed** (per the brief): phone `021 244 3421`, and Friday/Saturday close at 11:00pm.

---

## 2. Photo gaps — flagged, not filled with stock

The library is 11 portrait product shots. There is **no shopfront, no interior, no team, no premises photograph, and nothing landscape**. Requested:

- **Shopfront** — Contact page ships without one, so customers can't recognise the door. Google Business Profile needs this regardless.
- **Interior** — Homepage "Visit Us" and Our Story. Only the açaí cone shot shows any interior, as background bokeh.
- **Team at work** — Our Story.
- **Mini Dutch pancake topping variations** — only one frame exists; the brief wanted 2–4 for that landing page.
- **A true granola-and-fruit-topped açaí bowl** — the current "açaí bowl" photo is a soft-serve swirl, on the page meant to rank for "açaí bowls".
- **Any landscape frame**, and **hero-grade resolution**: every file is 1024–1131px wide, below the ~1400px a full-bleed hero needs. Not currently a problem because the hero stayed a CSS gradient.

---

## 3. Recorded concern: baked-in text on six images

Shipped as-is at your direction. For the record:

- Six frames carry marketing typography burned into the pixels, including **"ANTIOXIDANTS + NATURAL ENERGY"**, **"TROPICAL HYDRATION + ELECTROLYTE BOOST"** and **"NATURAL ENERGY"**. These are the same class of unevidenced claim Task 4 removed from the site text, but they are **not greppable and cannot be removed without re-editing the images** — so a clean grep does not mean the site is clean of claims.
- **`WHITTAKERS CHUNK MADDNESS`** contains a typo.
- **`OUR BEST SELLER`** appears on two different products.
- Text inside an image is invisible to search engines and to screen readers.

**Recommended fix: ask the photographer/designer for text-free exports of those six frames.** The typography is clearly a composited layer, so clean versions almost certainly exist. Container ratios were changed to 4:5 so the text is at least never cropped mid-headline.

---

## 4. Claims removed beyond the brief's list of seven

The brief listed 7. A full-codebase grep found these as well, all removed under the same standard:

`cold-pressed` (×4) · `never from concentrate` · `crafted daily` · `locally sourced` · `local honey` · `we source locally whenever possible` · `sustainable farming` · `Sustainably Sourced` (heading) · `natural sweeteners` · `No artificial colours, no preservatives` · `No artificial anything` · `wholesome` (applied to desserts) · `pristine environment` · `delivered fresh to your door`

**The entire "Proudly Aotearoa" section was deleted** from Our Story. It claimed sourcing "from the orchards of Hawke's Bay to the gardens of Canterbury" for a menu built on açaí, poffertjes, matcha and Whittaker's chocolate. Task 5's replacement copy supplies the honest reframe: *"combines international inspiration with the friendly and relaxed character of Aotearoa."*

Also fixed: `order.html` promised **"delivered fresh to your door"** for a café with no delivery.

---

## 5. Two functional defects found and fixed (not in the brief)

**Both forms were fake.** `script.js` called `preventDefault()`, `console.log`ged the data, hid the form and showed a success message. Nothing was ever sent. The contact page said *"We reply to every message"* while discarding every message, and the order page said *"You're on the list!"* while discarding the address.

Both are now wired to **Netlify Forms** (`data-netlify="true"` + honeypot), submitted over `fetch` so the page keeps its own success state. A success message is only shown after Netlify accepts the submission; on failure the user gets the phone number and email instead of a false confirmation.

> **After first deploy:** open Netlify → Forms and confirm `contact` and `order-notify` are detected, then set up notification emails. Netlify only detects forms present in deployed HTML.

**The menu page had no `<h1>`** — the whole page is two images, so it had no text at all. A visually hidden `<h1>` was added: no visual change, fixes the accessibility and indexing gap.

---

## 6. Deliberately not implemented

- **Menu-page image-to-text conversion — correctly skipped as out of scope.** The menu images, `.menu-full` block, layout and routing are untouched; a diff confirms zero lines changed in that block. The two new landing pages carry the readable, indexable product text instead.
- **Photo hero** — the homepage hero stays a CSS gradient. Every candidate image is portrait, under 1400px, and mostly white-background cutouts that would be unreadable behind white hero text. Adding a photo hero would also have been the redesign the brief ruled out.
- **`Order for Pickup` nav rename** — dropped, because Tabin makes "Order Online" accurate.

---

## 7. Results

| | Before | After |
|---|---|---|
| Accessibility | 93 | **100** |
| Best Practices | 96 | **100** |
| SEO | 100 | **100** |
| Shared assets per page load | 468KB | **98KB** (−370KB) |

Performance was 63 on production. It is not directly comparable yet (the after-run was localhost, no network latency), so **re-run Lighthouse against production after deploy**. The known wins: `kiwi-dose-green.png` was **12756px wide / 353KB**, shipped on every page and displayed at 36px tall — now 900px / 10KB; and three remote Unsplash images are gone, replaced by self-hosted WebP.

**Verified:** claims grep clean · zero stock imagery · "New Zealand" gone as a location · one phone number sitewide, all `tel:` · 426 Mount Eden Road on every page · unique title/description/canonical per page · JSON-LD valid on all 7 pages · sitemap matches canonicals exactly · one `<h1>` per page with no skipped heading levels · no horizontal overflow, JS errors or failed requests at 320/375/768/1440px · tap targets ≥44px verified by hit-testing.

**Still to do after deploy:** validate the JSON-LD in Google's Rich Results Test against the live URL, and re-run Lighthouse on production.

---

## 8. Outside the codebase — needed for the SEO work to pay off

**Google Business Profile** is at least as important as the site for local search:
- NAP exactly matching the site: Kiwi Dose · 426 Mount Eden Road, Mount Eden, Auckland 1024 · 021 244 3421
- Correct primary category (Dessert shop / Café)
- Menu link pointing at `https://www.kiwidose.nz/menu`
- Product listings for **mini Dutch pancakes** and **açaí bowls**
- 15–20 real photos (the six poster images are ideal here — baked-in text belongs on social and GBP, not in web page furniture)
- Weekly posts, and a reply to every review

**Google Search Console:** create the property, verify, submit `https://www.kiwidose.nz/sitemap.xml`, and request indexing for the two new URLs plus the changed ones.

---

## 9. Notes for whoever picks this up next

- **There is no build step.** Nav appears twice per page (desktop + mobile overlay) and the footer, `<head>` and JSON-LD are duplicated across all 7 files. A nav change means editing 14 places. This was a deliberate call to keep a content pass low-risk; a build step (Eleventy or a small assembler) is worth considering as separate work.
- **URLs:** files are `.html`; canonicals, sitemap and every internal link use the extensionless form, which Netlify already serves. Both forms return 200, and the canonical tags resolve the duplication.
- `image-manifest.json` records source filename, new filename, subject, placement, alt text, orientation, hero flag, plus the per-file audit (pixel dimensions, colour profile, EXIF orientation, byte size) and WebP variants.
- **The supplied originals in `photography/` are byte-identical to what was delivered.** The audit found all 11 files sRGB, EXIF orientation 1, with no EXIF/XMP/IPTC/GPS at all — so there was nothing to strip or rotate, and re-encoding inflated 6 of 11 files. The `.jpg` in `images/` is therefore a straight copy; only the WebP variants are transcoded. No image was upscaled: no source exceeds 1131px, so no 1200px+ variant exists.
- All 11 photos are used on the site, so `/photography/library/` for unused frames was not needed. `photography/` itself is the untouched original set and is currently untracked — **commit it.**
- Dead weight still in the repo, out of scope but worth deleting: four unused `KD_MENU_indoor *.png` (~1.9MB), `kiwi-dose-black.png`, `kiwi-dose-logo.jpg`.
