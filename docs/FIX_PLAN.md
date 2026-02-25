# Fix Plan

This document defines all improvement work for the Art Collector website, organised into independent work streams that can run in parallel. Each work stream maps to a single branch and PR.

## How to use this plan

Each work stream is **independent** — no stream depends on another. This means you can assign separate Cursor Cloud agent sessions to work on different streams at the same time.

### Running work in parallel

- Each work stream gets its own **branch** (named in the heading).
- Agents should follow `CONTRIBUTING.md` and `AGENTS.md` conventions.
- Each stream includes a ready-to-use **prompt** you can paste directly into a new agent session.
- Since all streams branch from `main` and touch different files, merge conflicts should be minimal.

### After completion

- Each stream produces one PR against `main`.
- Review and squash-merge each PR independently.

---

## Stream A: Dead code & typo cleanup

**Branch:** `chore/cleanup-dead-code`
**Risk:** Low — removing unused code, no behaviour changes
**Files touched:** `src/components/`, `src/lib/`, `src/routes/`, `src/app.html`

### Items

- [ ] **A1** Rename `src/lib/mixpannelService.js` → `src/lib/mixpanelService.js` and update all imports (in `CookieConsent.svelte`, `IOSDownloadButton.svelte`, `AndroidDownloadButton.svelte`)
- [ ] **A2** Delete unused components: `src/components/SmallCard.svelte`, `src/components/SmallButton.svelte`
- [ ] **A3** Remove `DownloadCTA.svelte` import that's commented out in `ArtView.svelte` (the component itself can stay if you think it'll be used later, but clean the dead import)
- [ ] **A4** Remove all `console.log` / `console.error` statements from production code:
  - `src/routes/+page.server.js` (lines 4–5)
  - `src/routes/news/highlights/+page.server.js` (lines 4–5)
  - `src/routes/c/[content_token]/+page.server.js` (lines 26, 30, 50, 121)
  - `src/components/CookieConsent.svelte` (line 20)
  - `src/lib/mixpannelService.js` (lines 11, 23, 26) — do this after renaming the file in A1
- [ ] **A5** Fix typo in `src/components/AndroidDownloadButton.svelte`: "Comming Soon" → "Coming Soon"
- [ ] **A6** Remove unused Moment.js CDN `<script>` tag from `src/app.html`

### Prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

Branch from main as: chore/cleanup-dead-code

Tasks (do in this order):

1. Rename src/lib/mixpannelService.js to src/lib/mixpanelService.js (fix the typo). Update all imports that reference the old name — search for "mixpannelService" across the codebase.

2. Delete src/components/SmallCard.svelte and src/components/SmallButton.svelte — they are not imported anywhere.

3. In src/components/ArtView.svelte, remove any commented-out import of DownloadCTA.

4. Remove all console.log and console.error statements from:
   - src/routes/+page.server.js
   - src/routes/news/highlights/+page.server.js
   - src/routes/c/[content_token]/+page.server.js
   - src/components/CookieConsent.svelte
   - src/lib/mixpanelService.js (the renamed file)

5. In src/components/AndroidDownloadButton.svelte, fix "Comming Soon" → "Coming Soon".

6. In src/app.html, remove the Moment.js CDN script tag (the line with cdnjs.cloudflare.com/ajax/libs/moment.js). It is loaded but never used.

After all changes, run: npm run format && npm run lint && npm run check && npm run build — all must pass.

Commit, push, and open a PR against main titled: "chore: Clean up dead code, fix typos, remove unused dependencies"
```

---

## Stream B: Performance quick wins

**Branch:** `fix/performance-quick-wins`
**Risk:** Low — no logic changes, only HTML attributes and script loading
**Files touched:** `src/app.html`, `src/components/`, `src/routes/`

### Items

- [ ] **B1** Defer GTM and GA scripts in `src/app.html` — add `async` or `defer` to the `<script>` tags
- [ ] **B2** Add `loading="lazy"` to below-fold images:
  - Info section illustrations in `src/routes/+page.svelte` (marketer.png, buildings, artblock)
  - Artwork images in `src/routes/news/highlights/+page.svelte`
  - Collection building images in `src/routes/collections/+page.svelte`
- [ ] **B3** Add `font-display=swap` to the Google Fonts URL in `src/app.html`
- [ ] **B4** Debounce scroll handlers in `src/routes/+layout.svelte` and `src/components/StickyFooterCta.svelte` — use a simple requestAnimationFrame guard or a 16ms throttle

### Prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

Branch from main as: fix/performance-quick-wins

Tasks:

1. In src/app.html, make the Google Tag Manager and Google Analytics script tags non-blocking. Add defer or async as appropriate. The GTM inline script should keep its current position but the external gtag.js script should have async (it may already — verify).

2. Add loading="lazy" to images that are below the fold:
   - In src/routes/+page.svelte: the three InfoFlat images (marketer.png, buildings@0.5x.png, artblock@0.5x.png)
   - In src/routes/news/highlights/+page.svelte: artwork images inside the grid
   - In src/routes/collections/+page.svelte: collection building images
   Do NOT add lazy loading to the hero section images or the logo — those are above the fold.

3. In src/app.html, find the Google Fonts <link> tag and append &display=swap to the URL to prevent FOIT (Flash of Invisible Text).

4. In src/routes/+layout.svelte, the scroll handler (handleScroll) fires on every scroll event. Wrap it with a requestAnimationFrame guard so it only runs once per frame. Do the same in src/components/StickyFooterCta.svelte if it has a scroll listener.

After all changes, run: npm run format && npm run lint && npm run check && npm run build — all must pass. Verify the dev server still works by starting it and curling the homepage.

Commit, push, and open a PR against main titled: "fix: Performance quick wins — lazy loading, deferred scripts, font-display"
```

---

## Stream C: Server-side code fixes

**Branch:** `fix/server-code-issues`
**Risk:** Medium — changes runtime behaviour, test thoroughly
**Files touched:** `src/routes/`, `src/lib/`, `src/components/`, `package.json`

### Items

- [ ] **C1** Replace `mixpanel-browser` with the `mixpanel` Node.js package in the server-side `/api/mixpanel` endpoint (`src/routes/api/mixpanel/+server.js`). Install `mixpanel` (the server package), update the import and init call. Remove `mixpanel-browser` from package.json if nothing else uses it (check — `src/lib/mixpanelService.js` might use it client-side)
- [ ] **C2** Deduplicate `isMobile` — `src/components/StickyFooterCta.svelte` has its own copy. Replace with an import from `$lib/utils`
- [ ] **C3** Centralise download URLs — create `src/lib/constants.js` exporting `IOS_DOWNLOAD_URL` and `ANDROID_WAITLIST_URL`. Update `src/routes/+layout.svelte`, `src/components/IOSDownloadButton.svelte`, and `src/components/AndroidWaitlistButton.svelte` to import from there. Remove the TODO comment in `IOSDownloadButton.svelte`
- [ ] **C4** Move hardcoded backend API URLs to environment variables — in `src/routes/+page.server.js`, `src/routes/news/highlights/+page.server.js`, and `src/routes/c/[content_token]/+page.server.js`, replace the hardcoded `https://tethered-publics-backend-...` and `http://api.artcollectorapp.net` URLs with env vars imported from `$env/static/private`. Add the new env var names to the `.env` example in AGENTS.md
- [ ] **C5** Fix error handling in `src/routes/+page.server.js` and `src/routes/news/highlights/+page.server.js` — they call `error()` without importing it from `@sveltejs/kit`. Either import it or replace with a proper try/catch pattern

### Prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

Branch from main as: fix/server-code-issues

Tasks (do in this order):

1. The file src/routes/api/mixpanel/+server.js uses mixpanel-browser (a client-side library) on the server. Install the mixpanel npm package (server-side SDK) and rewrite the endpoint to use it instead. The API is different: use mixpanel.init(token) and mixpanel.track(name, properties). Check whether mixpanel-browser is still used elsewhere (src/lib/mixpannelService.js uses it client-side) — only remove it from package.json if nothing else imports it.

2. src/components/StickyFooterCta.svelte defines its own isMobile object. Replace it with an import from $lib/utils which already exports the same thing.

3. Create src/lib/constants.js with exports:
   - IOS_DOWNLOAD_URL = 'https://apps.apple.com/app/apple-store/id6449506448?pt=122009505&ct=artcollector-web&mt=8'
   - ANDROID_WAITLIST_URL = 'https://forms.gle/kHuwRg63drVoTgCF9'
   Update src/routes/+layout.svelte (clickDownload function), src/components/IOSDownloadButton.svelte, and src/components/AndroidWaitlistButton.svelte to import from $lib/constants instead of hardcoding the URLs.

4. Create two new env vars: BACKEND_API_URL and ART_COLLECTOR_API_URL. In src/routes/+page.server.js and src/routes/news/highlights/+page.server.js, replace the hardcoded 'https://tethered-publics-backend-7twz4.ondigitalocean.app' with BACKEND_API_URL imported from $env/static/private. In src/routes/c/[content_token]/+page.server.js, replace 'http://api.artcollectorapp.net' with ART_COLLECTOR_API_URL. Add these vars to the .env file. Update the environment variables section in AGENTS.md to document them.

5. In src/routes/+page.server.js and src/routes/news/highlights/+page.server.js, the catch block calls error(404, 'Not found') but error is not imported from @sveltejs/kit. Add the import: import { error } from '@sveltejs/kit'. Also remove the console.log('whats happening') lines (they should already be gone if Stream A ran first, but handle it either way).

After all changes, run: npm run format && npm run lint && npm run check && npm run build — all must pass. Start the dev server and verify the homepage and /news/highlights pages load correctly (they fetch from the backend API).

Commit with logical grouping (one commit per task is fine), push, and open a PR against main titled: "fix: Server-side code — correct mixpanel package, centralise config, fix error handling"
```

---

## Stream D: SEO improvements

**Branch:** `feat/improve-seo`
**Risk:** Low — additive meta tags, no behaviour changes
**Files touched:** `src/components/SEO.svelte`, `src/routes/`

### Items

- [ ] **D1** Add Twitter Card meta tags to `SEO.svelte`: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- [ ] **D2** Add `<link rel="canonical">` and `og:url` using `$page.url` in `SEO.svelte`
- [ ] **D3** Fix the default OG image to use an absolute URL instead of the relative `./images/logo@0.5x.png`
- [ ] **D4** Add `<SEO>` component to pages that are missing it: `/collections`, `/news/highlights`, `/referral-terms`
- [ ] **D5** Add basic JSON-LD structured data (`Organization` schema) to the homepage

### Prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

Branch from main as: feat/improve-seo

Tasks:

1. In src/components/SEO.svelte, add Twitter Card meta tags alongside the existing Open Graph tags:
   - <meta name="twitter:card" content="summary_large_image" />
   - <meta name="twitter:title" content={title} />
   - <meta name="twitter:description" content={description} />
   - <meta name="twitter:image" content={image} />

2. In SEO.svelte, import { page } from '$app/stores' and add:
   - <link rel="canonical" href={$page.url.href} />
   - <meta property="og:url" content={$page.url.href} />

3. The default image prop in SEO.svelte likely uses a relative path like ./images/logo@0.5x.png. Change it to an absolute URL: https://artcollectorapp.net/images/logo@0.5x.png

4. Add the <SEO> component to pages that don't have it yet:
   - src/routes/collections/+page.svelte — title="Our Collections", description="Explore artworks from The Met, Rijksmuseum, and Art Institute of Chicago"
   - src/routes/news/highlights/+page.svelte — title="News Highlights", description="See recent artwork activity from Art Collector users"
   - src/routes/referral-terms/+page.svelte — title="Referral Programme", description="Earn exclusive awards through our referral scheme"

5. On the homepage (src/routes/+page.svelte), add a JSON-LD script block in the <svelte:head> with Organization schema:
   { "@context": "https://schema.org", "@type": "Organization", "name": "Art Collector", "url": "https://artcollectorapp.net", "logo": "https://artcollectorapp.net/images/logo@0.5x.png" }

After all changes, run: npm run format && npm run lint && npm run check && npm run build — all must pass.

Commit, push, and open a PR against main titled: "feat: Improve SEO — Twitter Cards, canonical URLs, structured data"
```

---

## Stream E: Design polish

**Branch:** `fix/design-polish`
**Risk:** Low — visual changes only, verify with browser
**Files touched:** `src/routes/`, `src/components/`

### Items

- [ ] **E1** Normalise artwork card image aspect ratios in `/news/highlights` — wrap images in a fixed aspect-ratio container with `object-cover`
- [ ] **E2** Add a page heading to `/news/highlights` (e.g., "Recent Highlights" with a subtitle)
- [ ] **E3** Review and update the footer CTA copy — "The first 500 users win an award!" may be outdated
- [ ] **E4** Reduce the gap between the last collection item and the footer on `/collections`
- [ ] **E5** Increase vertical padding on mobile menu links for better tap targets

### Prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

Branch from main as: fix/design-polish

Tasks:

1. In src/routes/news/highlights/+page.svelte, the artwork image cards have inconsistent heights because images have different aspect ratios. Wrap each image in a container with a fixed aspect ratio (e.g., aspect-video or aspect-[4/3]) and use object-cover on the img tag so images fill uniformly.

2. The /news/highlights page has no heading — it jumps straight into the card grid. Add a heading section at the top: <h1>Recent Highlights</h1> with a subtitle like "See what collectors have been up to". Style it consistently with the /collections page heading.

3. In src/routes/+layout.svelte, the footer CTA says "Download today - The first 500 users win an award!". Review whether this copy is still accurate. If unsure, change it to something evergreen like "Download today and start your art collection!".

4. In src/routes/collections/+page.svelte, there's a large empty gap between the last collection entry and the footer. Add a bottom margin or padding to tighten the layout.

5. In src/routes/+layout.svelte, the mobile menu links (inside the nav when menuIsOpen) could use more vertical padding. Increase the padding on the mobile menu links (the ones inside the translate-x-0 block) from space-y-4 to space-y-6, and ensure each link has at least py-3 for comfortable tap targets.

After all changes, run: npm run format && npm run lint && npm run check && npm run build — all must pass. Start the dev server and visually verify the changes in the browser — check both desktop and mobile layouts.

Commit, push, and open a PR against main titled: "fix: Design polish — card layouts, headings, mobile tap targets"
```

---

## Stream F: TypeScript & Tailwind standardisation

**Branch:** `chore/standardise-types-and-theme`
**Risk:** Medium — touches many files, run all checks carefully
**Files touched:** `src/components/`, `tailwind.config.js`

### Items

- [ ] **F1** Fix `@ts-ignore` in `Popover.svelte` — add proper type annotation to the `event` parameter
- [ ] **F2** Replace `any` types with proper interfaces in `ArtView.svelte` and `c/[content_token]/+page.svelte`
- [ ] **F3** Clean up the Tailwind colour palette in `tailwind.config.js` — remove the duplicate legacy colours (`beige`, `grey`, `background`, `greyBorder`) that overlap with the `app*` prefixed versions. Update any component references from legacy to `app*` names

### Prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

Branch from main as: chore/standardise-types-and-theme

Tasks:

1. In src/components/Popover.svelte, there is a @ts-ignore comment above the handleClickOutside function. Remove the @ts-ignore and add a proper type: function handleClickOutside(event: MouseEvent). The function uses event.target.closest() which needs a cast — use (event.target as HTMLElement).closest().

2. In src/components/ArtView.svelte, the props use "any" types. Define proper TypeScript interfaces for the item, collector, and activity props based on the data shape used in the template. Do the same for src/routes/c/[content_token]/+page.svelte — its data prop can use the same interfaces (consider putting shared types in src/lib/types.ts).

3. In tailwind.config.js, there are duplicate colour definitions — e.g., "beige" and "appBeige", "grey" and "appGrey", "background" and "appBackground", "greyBorder" and "appGreyBorder". Remove the legacy (unprefixed) versions. Then search the codebase for any references to the removed colour names (e.g., bg-beige, text-grey, bg-background, border-greyBorder) and replace them with their app* equivalents (bg-appBeige, text-appGrey, bg-appBackground, border-appGreyBorder). Be thorough — check all .svelte files and app.css.

After all changes, run: npm run format && npm run lint && npm run check && npm run build — all must pass. Start the dev server and visually verify that colours haven't changed (they should be identical since the values are the same).

Commit, push, and open a PR against main titled: "chore: Standardise TypeScript types and Tailwind colour palette"
```

---

## Parallelisation matrix

| Stream | Branch                              | Risk   | Can run in parallel with |
| ------ | ----------------------------------- | ------ | ------------------------ |
| **A**  | `chore/cleanup-dead-code`           | Low    | B, D, E, F               |
| **B**  | `fix/performance-quick-wins`        | Low    | A, C, D, E, F            |
| **C**  | `fix/server-code-issues`            | Medium | B, D, E, F               |
| **D**  | `feat/improve-seo`                  | Low    | A, B, C, E, F            |
| **E**  | `fix/design-polish`                 | Low    | A, B, C, D, F            |
| **F**  | `chore/standardise-types-and-theme` | Medium | B, D, E                  |

**Conflict notes:**

- **A and C** both touch `src/lib/mixpannelService.js` and server files — run A first or resolve merge conflicts
- **A and F** both touch components — low conflict risk but review diffs
- All other combinations are safe to run fully in parallel

**Recommended parallel groups:**

- **Group 1** (run together): A + B + D + E
- **Group 2** (run after Group 1 merges): C + F
