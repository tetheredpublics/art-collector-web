# Fix Plan

All improvement work for the Art Collector website, organised into independent work streams that can run in parallel.

## Workflow (for all streams)

Each stream follows the same process. Use this as the base prompt for any agent session, appending the specific stream's task list.

### Universal agent prompt

```
Follow the conventions in AGENTS.md and CONTRIBUTING.md.

1. Branch from main using the branch name specified in the stream heading.
2. Read through every file listed in the stream before making changes.
3. Complete each numbered task in order.
4. After all changes, run:
   npm run format
   npm run lint
   npm run check
   npm run build
   All four must pass with zero errors.
5. Start the dev server (npm run dev) and verify affected pages still load correctly.
6. For visual changes (Stream E), check both desktop and mobile layouts in the browser.
7. Commit with clear, imperative messages. One commit per logical task is fine, or group related tasks.
8. Push and open a PR against main. PR title should match the stream heading.
```

### Running streams in parallel

- Each stream is independent — assign separate agent sessions to different streams.
- All streams branch from `main` and touch different files, so merge conflicts are minimal.
- See the parallelisation matrix at the bottom for conflict notes.

---

## Stream A: Dead code cleanup

**Branch:** `chore/cleanup-dead-code`
**PR title:** `chore: Clean up dead code and remove unused dependencies`
**Risk:** Low

- [ ] **A1** Rename `src/lib/mixpannelService.js` → `src/lib/mixpanelService.js` and update all imports across the codebase
- [ ] **A2** Delete unused components: `src/components/SmallCard.svelte`, `src/components/SmallButton.svelte`
- [ ] **A3** Remove the commented-out `DownloadCTA` import in `src/components/ArtView.svelte`
- [ ] **A4** Remove all `console.log` / `console.error` statements from production code in:
  - `src/routes/+page.server.js`
  - `src/routes/news/highlights/+page.server.js`
  - `src/routes/c/[content_token]/+page.server.js`
  - `src/components/CookieConsent.svelte`
  - `src/lib/mixpanelService.js` (after rename)
- [ ] **A5** Remove the unused Moment.js CDN `<script>` tag from `src/app.html` (loaded but never referenced)
- [ ] **A6** Fix any remaining typos encountered during cleanup (e.g. "Comming Soon" → "Coming Soon" in `AndroidDownloadButton.svelte`)

---

## Stream B: Performance quick wins

**Branch:** `fix/performance-quick-wins`
**PR title:** `fix: Performance — lazy loading, deferred scripts, font-display`
**Risk:** Low

- [ ] **B1** Defer non-critical scripts in `src/app.html` — add `async` or `defer` to GTM and GA `<script>` tags as appropriate
- [ ] **B2** Add `loading="lazy"` to below-fold images (do NOT add to hero or logo):
  - Info section illustrations in `src/routes/+page.svelte`
  - Artwork images in `src/routes/news/highlights/+page.svelte`
  - Collection building images in `src/routes/collections/+page.svelte`
- [ ] **B3** Append `&display=swap` to the Google Fonts URL in `src/app.html`
- [ ] **B4** Throttle scroll handlers in `src/routes/+layout.svelte` and `src/components/StickyFooterCta.svelte` using a `requestAnimationFrame` guard

---

## Stream C: Server-side fixes

**Branch:** `fix/server-code-issues`
**PR title:** `fix: Server-side — correct packages, centralise config, fix error handling`
**Risk:** Medium

- [ ] **C1** Replace `mixpanel-browser` with the `mixpanel` Node.js package in `src/routes/api/mixpanel/+server.js` (it's a server endpoint using a browser library). Only remove `mixpanel-browser` from `package.json` if nothing else imports it
- [ ] **C2** Deduplicate `isMobile` — `src/components/StickyFooterCta.svelte` has its own copy. Replace with an import from `$lib/utils`
- [ ] **C3** Centralise download URLs — create `src/lib/constants.js` exporting `IOS_DOWNLOAD_URL` and `ANDROID_WAITLIST_URL`. Update all files that hardcode these URLs (`+layout.svelte`, `IOSDownloadButton.svelte`, `AndroidWaitlistButton.svelte`)
- [ ] **C4** Move hardcoded backend API URLs to env vars — create `BACKEND_API_URL` and `ART_COLLECTOR_API_URL` in `.env`, import from `$env/static/private` in the three server files. Update `AGENTS.md` to document the new vars
- [ ] **C5** Fix error handling in `src/routes/+page.server.js` and `src/routes/news/highlights/+page.server.js` — `error()` is called without being imported from `@sveltejs/kit`
- [ ] **C6** Remove `svelte-portal` dependency — only used in `src/components/Popover.svelte`. Replace `use:portal={'body'}` with native DOM mounting or a simple Svelte action

---

## Stream D: SEO improvements

**Branch:** `feat/improve-seo`
**PR title:** `feat: SEO — Twitter Cards, canonical URLs, structured data`
**Risk:** Low

- [ ] **D1** Add Twitter Card meta tags to `src/components/SEO.svelte` (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- [ ] **D2** Add `<link rel="canonical">` and `og:url` using `$page.url` in `SEO.svelte`
- [ ] **D3** Fix the default OG image to use an absolute URL (`https://artcollectorapp.net/images/logo@0.5x.png`) instead of the relative path
- [ ] **D4** Add `<SEO>` component to pages missing it: `/collections`, `/news/highlights`, `/referral-terms`
- [ ] **D5** Add JSON-LD `Organization` schema to the homepage

---

## Stream E: Design & copy polish

**Branch:** `fix/design-and-copy-polish`
**PR title:** `fix: Design polish — card layouts, copy updates, mobile UX`
**Risk:** Low

- [ ] **E1** Normalise artwork card image aspect ratios in `/news/highlights` — use a fixed aspect-ratio container with `object-contain` so the full artwork stays visible (no cropping)
- [ ] **E2** Add a page heading to `/news/highlights` (e.g. "Recent Highlights") — currently jumps straight into the card grid with no context
- [ ] **E3** Remove outdated footer CTA copy — replace "Download today - The first 500 users win an award!" with "Download today and start your art collection" in `src/routes/+layout.svelte`
- [ ] **E4** Fix the large empty gap between the last collection entry and the footer on `/collections`
- [ ] **E5** Increase vertical padding on mobile menu links in `src/routes/+layout.svelte` for better tap targets

---

## Stream F: TypeScript & Tailwind standardisation

**Branch:** `chore/standardise-types-and-theme`
**PR title:** `chore: Standardise TypeScript types and Tailwind colour palette`
**Risk:** Medium

- [ ] **F1** Fix `@ts-ignore` in `src/components/Popover.svelte` — add a proper `MouseEvent` type annotation instead
- [ ] **F2** Replace `any` types with proper interfaces in `src/components/ArtView.svelte` and `src/routes/c/[content_token]/+page.svelte`. Consider creating shared types in `src/lib/types.ts`
- [ ] **F3** Clean up duplicate Tailwind colours in `tailwind.config.js` — remove the legacy unprefixed names (`beige`, `grey`, `background`, `greyBorder`) and update all component references to use the `app*` equivalents

---

## Parallelisation matrix

| Stream | Branch                              | Risk   | Can run in parallel with |
| ------ | ----------------------------------- | ------ | ------------------------ |
| **A**  | `chore/cleanup-dead-code`           | Low    | B, D, E, F               |
| **B**  | `fix/performance-quick-wins`        | Low    | A, C, D, E, F            |
| **C**  | `fix/server-code-issues`            | Medium | B, D, E, F               |
| **D**  | `feat/improve-seo`                  | Low    | A, B, C, E, F            |
| **E**  | `fix/design-and-copy-polish`        | Low    | A, B, C, D, F            |
| **F**  | `chore/standardise-types-and-theme` | Medium | B, D, E                  |

### Conflict notes

- **A ↔ C**: Both touch `src/lib/mixpanelService.js` and server files — run A first or resolve merge conflicts
- **A ↔ F**: Both touch components — low conflict risk but review diffs
- All other combinations are safe to run fully in parallel

### Recommended parallel groups

- **Group 1** (run together): A + B + D + E
- **Group 2** (run after Group 1 merges): C + F
