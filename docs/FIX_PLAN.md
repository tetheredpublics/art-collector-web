# Fix Plan — Leaderboard Feature

Implementation plan for the `/leaderboard` page, broken into parallel workstreams.

Full feature specification: [`LEADERBOARD_FEATURE_SPEC.MD`](../LEADERBOARD_FEATURE_SPEC.MD)

---

## Workstream Overview

```
  ┌─────────────────────┐      ┌─────────────────────┐
  │  WORKSTREAM A       │      │  WORKSTREAM B        │
  │  Data & API Layer   │      │  UI Components       │
  │                     │      │                      │
  │  Types, transforms, │      │  Svelte components,  │
  │  server load, proxy │      │  layout CSS, assets  │
  └────────┬────────────┘      └────────┬─────────────┘
           │                            │
           │   both must complete       │
           └──────────┬─────────────────┘
                      ▼
           ┌──────────────────────┐
           │  WORKSTREAM C        │
           │  Integration & Polish│
           │                      │
           │  Page wiring, nav,   │
           │  auto-refresh, SEO,  │
           │  responsive QA       │
           └──────────────────────┘
```

**A and B run in parallel.** They touch completely different files — no merge conflicts.
**C runs after A and B are both merged/complete.** It wires data into components and does end-to-end QA.

---

## Workstream A — Data & API Layer

**Branch:** `feat/leaderboard-data`
**PR title:** `feat: Leaderboard data layer — types, transforms, server load, API proxy`
**Files touched:** `src/lib/leaderboard.js`, `src/lib/types.ts`, `src/routes/leaderboard/+page.server.js`, `src/routes/api/leaderboard/+server.js`

### Tasks

- [ ] **A1 — TypeScript types for the API response**
      Add `LeaderboardResponse`, `LeaderboardCategoryResponse`, `LeaderboardEntryResponse`, and `LeaderboardMetricResponse` interfaces to `src/lib/types.ts`. These model the raw JSON shape from `GET /api/1/collector/4/leaderboard` (see spec §4.1).

- [ ] **A2 — TypeScript types for the display state**
      Add `LeaderboardDisplayState`, `CategoryDisplay`, `EntryDisplay`, and `MetricDisplay` interfaces to `src/lib/types.ts`. These are the UI-ready shapes (see spec §4.2).

- [ ] **A3 — Avatar colour map**
      In `src/lib/leaderboard.js`, create a `AVATAR_COLOR_MAP` object mapping API colour keys (`"AppRed"`, `"AppBlue"`, …) to their hex values. Include all 13 known keys from the Tailwind config. Fall back to `#EDEDEA` (appGrey) for unknown keys. Export a function `resolveAvatarColor(apiKey: string): string` that returns the hex value.

- [ ] **A4 — Avatar divider colour utility**
      In `src/lib/leaderboard.js`, export a function `darkenColor(hex: string, amount: number): string` that mixes a hex colour toward black by the given ratio (0–1). Used to compute the 26 %-darkened avatar divider colour. Pure function, no dependencies.

- [ ] **A5 — Icon asset source resolver**
      In `src/lib/leaderboard.js`, export a function `resolveIconSrc(iconString: string): string` that handles the `asset://`, `bundle://`, `system://`, `https://`, and bare-name formats. For `asset://` names, look them up in a static `ICON_ASSET_MAP` object (e.g. `{ IconTrophy: '/icons/leaderboard/trophy.png', icon_collect: '/icons/collect.png', ... }`). Unknown asset names resolve to a placeholder path. HTTP(S) URLs pass through unchanged.

- [ ] **A6 — Date range formatter**
      In `src/lib/leaderboard.js`, export a function `formatWeekDateRange(weekStarting: string, weekEnding: string): string` implementing the three formatting rules from spec §2.2.1:

  - Same month & year → `"12 – 18 May 2025"`
  - Different months, same year → `"28 Apr – 4 May 2025"`
  - Different years → `"28 Dec 2024 – 3 Jan 2025"`
    Use the native `Intl.DateTimeFormat` API — no external date library.

- [ ] **A7 — Winners time formatter**
      In `src/lib/leaderboard.js`, export a function `formatWinnersTime(weekEnding: string): string` that formats the week-ending ISO date as `"EEEE HH:mm"` (e.g. `"Friday 00:00"`). Use `Intl.DateTimeFormat` with `{ weekday: 'long' }` and manual `HH:mm` formatting.

- [ ] **A8 — API response → display state transformer**
      In `src/lib/leaderboard.js`, export a function `transformLeaderboard(response: LeaderboardResponse): LeaderboardDisplayState` that:

  - Formats the date range and winners time (A6, A7)
  - Maps each category: resolves icon source, applies empty-message fallbacks
  - Maps each entry: resolves avatar colour + divider, computes `displayPoints` (`points × 100`), computes `rankTrend` from `rank_delta`, resolves metric icons
  - See the full mapping table in spec §4.3

- [ ] **A9 — Server-side load function**
      Create `src/routes/leaderboard/+page.server.js` following the existing patterns in `src/routes/+page.server.js`. Fetch from `${BACKEND_API_URL}/api/1/collector/4/leaderboard` with `Content-Type` and optional `x-api-key` headers. Return `{ leaderboard: <raw JSON> }`. On failure, `throw error(response.status, 'Failed to load leaderboard')`.

- [ ] **A10 — API proxy route for client-side refresh**
      Create `src/routes/api/leaderboard/+server.js` as a thin `GET` handler that calls the same backend endpoint and pipes the JSON response back. This keeps the API key server-side and avoids CORS issues for the 30 s client-side polling. Return the raw API JSON with a `200` status, or a JSON error body with the upstream status code.

---

## Workstream B — UI Components

**Branch:** `feat/leaderboard-ui`
**PR title:** `feat: Leaderboard UI components — columns, cards, banner, layout CSS`
**Files touched:** `src/components/leaderboard/*.svelte`, `static/icons/leaderboard/*`

All components should accept **display-state types** as props (the `*Display` interfaces from A2), not raw API types. During development before A is merged, use inline JSDoc or simply code against the expected shape from the spec.

### Tasks

- [ ] **B1 — Scaffold component directory**
      Create `src/components/leaderboard/` directory.

- [ ] **B2 — EntryCard.svelte**
      Implement the leaderboard entry card per spec §2.4:

  - Avatar (48 × 48, rounded-md, background-colour fill, image overlay, right-side divider bar)
  - Content area: username (bold), points display ("+300XP"), metrics row (icon chips)
  - Rank area (right-aligned column): trend arrow (▲ green / ▼ red / — grey), rank label ("#1"), last-week-winner icon
  - Top-3 accent: left border (gold #1, silver #2, bronze #3)
  - Card container: white bg, border, rounded-lg, p-3, hover:shadow-md
  - Props: one `EntryDisplay` object + optional `categoryIconSrc` (for winner badge)

- [ ] **B3 — EmptyState.svelte**
      Implement the per-column empty state per spec §2.5:

  - Centered text: title (bold, gray-500) + body (gray-400)
  - Padding: py-12
  - Props: `title: string`, `body: string`

- [ ] **B4 — CategoryColumn.svelte**
      Implement a single leaderboard column per spec §2.3 + §1.3:

  - Sticky column header: icon (32 × 32) + label, white bg, bottom border
  - Scrollable body (`overflow-y: auto`): renders `<ol>` of `EntryCard` components or `EmptyState`
  - Props: one `CategoryDisplay` object

- [ ] **B5 — WeekBanner.svelte**
      Implement the week banner per spec §2.2:

  - Left side: "This Week" heading + date range subtitle
  - Right side: winners pill/badge (trophy icon + "Weekly Winners" + day/time) + optional info icon link
  - Full-width, horizontally padded
  - Props: `weekDateRange: string`, `winnersTimeLabel: string`, `rulesUrl: string | null`

- [ ] **B6 — Horizontal scroll container CSS**
      Establish the core layout CSS per spec §1.1 and §6.4:

  - Flex container with `overflow-x: auto`, `scroll-snap-type: x mandatory`
  - Column sizing: 85 vw (mobile), 42 vw (sm), 30 vw (md), 300 px (xl)
  - `scroll-snap-align: start` on each column
  - `-webkit-overflow-scrolling: touch` for iOS momentum scrolling
  - This CSS lives in the `+page.svelte` `<style>` block (Workstream C will create the page file, but the CSS spec should be ready). Alternatively, create a thin wrapper component `ColumnsContainer.svelte` in `src/components/leaderboard/` that provides the scroll container and responsive column sizing via slot children.

- [ ] **B7 — Loading and error state markup**
      Create `LoadingState.svelte` and `ErrorState.svelte` in `src/components/leaderboard/`:

  - Loading: centered spinner (simple CSS animation or SVG, match site aesthetic)
  - Error: centered message + "Retry" button (`bg-primary text-white font-bold rounded-md px-6 py-2`). Emits a `retry` event.

- [ ] **B8 — Source / create icon assets**
  - Confirm that `collect.png`, `drop.png`, `destroy.png` already exist in `static/icons/` — verify paths and names match the asset map in A5.
  - Create `static/icons/leaderboard/` directory.
  - Add a `trophy.png` icon for the `IconTrophy` asset name. Source from the app's design assets, or create a simple placeholder until the real asset is available.
  - Add any other category icons discovered from live API responses. Document unknowns as TODOs.

---

## Workstream C — Integration & Polish

**Branch:** `feat/leaderboard-page`
**PR title:** `feat: Leaderboard page — integration, auto-refresh, nav link, SEO`
**Files touched:** `src/routes/leaderboard/+page.svelte`, `src/routes/+layout.svelte`
**Depends on:** Workstream A (merged) + Workstream B (merged)

### Tasks

- [ ] **C1 — Create the page component**
      Create `src/routes/leaderboard/+page.svelte` that:

  - Receives `data.leaderboard` from the server load function (A9)
  - Transforms it via `transformLeaderboard()` (A8) in a reactive statement
  - Renders the three-section layout: `WeekBanner` → horizontal `ColumnsContainer` with `CategoryColumn` children
  - Handles loading / error / success states (B7)

- [ ] **C2 — Client-side auto-refresh**
      In `+page.svelte`, set up a 30 s `setInterval` in `onMount` that fetches `/api/leaderboard` (A10). On success, reactively update the leaderboard data. On failure, do nothing (keep stale data on screen). Clear the interval in `onDestroy`.

- [ ] **C3 — Navigation link**
      Add a "Leaderboard" link to the site-wide nav in `src/routes/+layout.svelte`:

  - Desktop: between "Support Me" and the "Download" button
  - Mobile hamburger menu: same position
  - Link to `/leaderboard`
  - Style: same as existing nav links (`text-black/[.64] hover:text-black px-3 py-3 md:py-2 text-sm font-bold`)

- [ ] **C4 — SEO meta tags**
      Add `<SEO title="Leaderboard" />` and appropriate Open Graph description to the page. See spec §6.5.

- [ ] **C5 — Responsive QA**
      Manually verify the layout at all four breakpoints (mobile, tablet, desktop, wide):

  - Horizontal scroll/snap works correctly
  - Columns size appropriately
  - Independent vertical scroll within each column
  - Week banner layout doesn't break on small screens
  - Entry cards are legible at all sizes

- [ ] **C6 — Accessibility pass**
      Verify and fix:

  - `role="region"` and `aria-label` on column container and individual columns
  - `<ol>` / `<li>` semantics on entry lists
  - `aria-label` on trend icons
  - Keyboard navigability of the horizontal scroll container (`tabindex="0"`)

- [ ] **C7 — Run all checks**
      Ensure `npm run lint`, `npm run check`, and `npm run build` all pass with zero errors.

---

## File Ownership Matrix

This table confirms that Workstreams A and B have zero file overlap and can merge independently.

| File / Directory                                     | A   | B   | C   |
| ---------------------------------------------------- | --- | --- | --- |
| `src/lib/types.ts`                                   | ✏️  |     |     |
| `src/lib/leaderboard.js`                             | ✏️  |     |     |
| `src/routes/leaderboard/+page.server.js`             | ✏️  |     |     |
| `src/routes/api/leaderboard/+server.js`              | ✏️  |     |     |
| `src/components/leaderboard/EntryCard.svelte`        |     | ✏️  |     |
| `src/components/leaderboard/EmptyState.svelte`       |     | ✏️  |     |
| `src/components/leaderboard/CategoryColumn.svelte`   |     | ✏️  |     |
| `src/components/leaderboard/WeekBanner.svelte`       |     | ✏️  |     |
| `src/components/leaderboard/ColumnsContainer.svelte` |     | ✏️  |     |
| `src/components/leaderboard/LoadingState.svelte`     |     | ✏️  |     |
| `src/components/leaderboard/ErrorState.svelte`       |     | ✏️  |     |
| `static/icons/leaderboard/*`                         |     | ✏️  |     |
| `src/routes/leaderboard/+page.svelte`                |     |     | ✏️  |
| `src/routes/+layout.svelte`                          |     |     | ✏️  |

---

## Agent Prompt Template

Paste the following into an agent session, replacing `{LETTER}` with `A`, `B`, or `C`.

> **Note:** For Workstream C, ensure Workstreams A and B are merged into the working branch first.

```
YOUR TASK IS TO EXECUTE WORKSTREAM {LETTER}

0a. Study `LEADERBOARD_FEATURE_SPEC.MD` and `docs/FIX_PLAN.md` to learn about the project specifications and implementation plan.

0b. The source code of the project is in `src/`.

0c. Study `docs/FIX_PLAN.md` — your workstream is **Workstream {LETTER}**. Only implement the tasks listed under that workstream.

1. Your task is to implement the leaderboard feature's Workstream {LETTER} tasks and produce working SvelteKit code for that functionality. Follow `docs/FIX_PLAN.md` and implement all tasks listed under Workstream {LETTER}. Before making changes search the codebase (don't assume something isn't implemented) using subagents. You may use up to 4 parallel subagents for all operations but only 1 subagent for build/tests (SvelteKit/Vite).

2. After implementing functionality or resolving problems, run the checks for that unit of code that was improved (`npm run lint`, `npm run check`, `npm run build`). If functionality is missing then it's your job to add it as per the application specifications. Think hard.

3. When you discover a logic, architecture, or environment issue, immediately update `docs/FIX_PLAN.md` with your findings using a subagent. When the issue is resolved, update `docs/FIX_PLAN.md` and remove the item using a subagent.

4. When the checks pass update `docs/FIX_PLAN.md`, then add changed code and `docs/FIX_PLAN.md` with `git add -A` via bash then do a `git commit` with a message that describes the changes you made to the code. After the commit do a `git push` to push the changes to the remote repository.

5. Important: When authoring documentation capture the "why" — explain why the implementation choices and the backing checks are important.

6. Important: We want single sources of truth, no migrations/adapters. If checks unrelated to your work fail then it's your job to resolve them as part of the increment of change.

8. You may add extra logging if required to be able to debug issues.

9. ALWAYS KEEP `docs/FIX_PLAN.md` up to date with your learnings using a subagent. Especially after wrapping up/finishing your turn.

10. When you learn something new about how to run the project or useful examples, make sure you update `AGENTS.md` using a subagent but keep it brief. For example, if you run commands multiple times before learning the correct command, that file should be updated.

11. IMPORTANT DO NOT IGNORE: The leaderboard feature should be authored in Svelte 4 / JavaScript / TypeScript (matching the existing codebase). If you find any implementation that doesn't follow existing project conventions, migrate it.

12. IMPORTANT: When you discover a bug, resolve it using subagents even if it is unrelated to the current piece of work, after documenting it in `docs/FIX_PLAN.md`.

13. Follow the existing project patterns — study `src/routes/+page.server.js`, `src/routes/+page.svelte`, and `src/components/` for conventions on data loading, component structure, and Tailwind usage.

14. Keep components co-located in `src/components/leaderboard/` with clear, descriptive names.

15. Keep `AGENTS.md` up to date with information on how to build the project and your learnings to optimize the build/check loop using a subagent.

16. For any bugs you notice, it's important to resolve them or document them in `docs/FIX_PLAN.md` to be resolved using a subagent.

17. When authoring components you may author multiple modules at once using up to 4 parallel subagents.

18. When `docs/FIX_PLAN.md` becomes large, periodically clean out the completed items from the file using a subagent.

19. If you find inconsistencies in the `LEADERBOARD_FEATURE_SPEC.MD` then flag them in `docs/FIX_PLAN.md` and proceed with your best judgement.

20. DO NOT IMPLEMENT PLACEHOLDER OR SIMPLE IMPLEMENTATIONS. WE WANT FULL IMPLEMENTATIONS. DO IT OR I WILL YELL AT YOU.

21. SUPER IMPORTANT DO NOT IGNORE: DO NOT PLACE STATUS REPORT UPDATES INTO `AGENTS.md`.

Follow the conventions in `AGENTS.md` and `CONTRIBUTING.md`. Run `npm run format`, `npm run lint`, `npm run check`, and `npm run build` before pushing — all four must pass with zero errors.
```

---

## Parallelisation Advice

| Group       | Workstreams | Can start immediately | Notes                              |
| ----------- | ----------- | --------------------- | ---------------------------------- |
| **Group 1** | A + B       | ✅                    | Zero file overlap — fully parallel |
| **Group 2** | C           | After Group 1 merges  | Wires A's data into B's components |

**Estimated relative effort:** A ≈ 40 %, B ≈ 40 %, C ≈ 20 %

Workstreams A and B are roughly equal in size and can run as two simultaneous agent sessions. Workstream C is smaller — mostly wiring, a layout link, and QA — but must wait for both A and B.
