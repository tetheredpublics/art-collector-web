# Fix Plan — Leaderboard Feature

Implementation plan for the `/leaderboard` page, broken into small focused tasks.

Full feature specification: [`LEADERBOARD_FEATURE_SPEC.MD`](../LEADERBOARD_FEATURE_SPEC.MD)

---

## How This Plan Works

Each **task** (e.g. A.1, B.2) is a single, focused agent session that produces one commit. Tasks are small enough that an agent can complete one in a single turn without losing context.

**Rules:**

- Within a workstream, run tasks **sequentially** (A.1 → A.2 → A.3 → A.4).
- Workstreams A and B have **zero file overlap** — run them in parallel.
- Workstream C depends on both A and B being complete.

---

## Dependency Graph

```
         WORKSTREAM A                    WORKSTREAM B
         (feat/leaderboard-data)         (feat/leaderboard-ui)

         A.1  Types                      B.1  Scaffold + simple components
          │                               │
          ▼                              ┌┴┐
         A.2  Utilities                 B.2  B.3  (parallel OK)
          │                              │   │
          ▼                              └┬──┘
         A.3  Transformer                │
          │                              ▼
          ▼                             B.3  Layout components
         A.4  Server routes
          │                              │
          └──────────┬───────────────────┘
                     ▼
              WORKSTREAM C
              (feat/leaderboard-page)

              C.1  Page wiring + refresh
               │
               ▼
              C.2  Nav link + SEO
               │
               ▼
              C.3  QA + accessibility
```

---

## Workstream A — Data & API Layer

**Branch:** `feat/leaderboard-data`

### Task A.1 — TypeScript types

**Scope:** Edit `src/lib/types.ts` only.

Add all leaderboard-related interfaces:

- **API response types:** `LeaderboardResponse`, `LeaderboardCategoryResponse`, `LeaderboardEntryResponse`, `LeaderboardMetricResponse` — model the raw JSON from `GET /api/1/collector/4/leaderboard` (spec §4.1)
- **Display state types:** `LeaderboardDisplayState`, `CategoryDisplay`, `EntryDisplay`, `MetricDisplay` — the UI-ready shapes (spec §4.2)

**Done when:** `npm run check` passes, types are exported.

---

### Task A.2 — Utility functions

**Scope:** Create `src/lib/leaderboard.js`.

Implement and export these pure functions:

| Function                                        | Purpose                                                                                                                                                                | Spec ref |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `resolveAvatarColor(apiKey)`                    | Map `"AppRed"` → `"#CF2D2D"` etc. Fallback `#EDEDEA`. Uses a static `AVATAR_COLOR_MAP` of all 13 keys from Tailwind config.                                            | §5.1     |
| `darkenColor(hex, amount)`                      | Mix a hex colour toward black by ratio (0–1). Returns hex string.                                                                                                      | §5.1     |
| `resolveIconSrc(iconString)`                    | Parse `asset://`, `bundle://`, `system://`, `https://`, bare-name prefixes. Map known asset names via `ICON_ASSET_MAP`. Unknown → placeholder. HTTP URLs pass through. | §5.2     |
| `formatWeekDateRange(weekStarting, weekEnding)` | Three formatting rules from spec. Use `Intl.DateTimeFormat`, no external deps.                                                                                         | §2.2.1   |
| `formatWinnersTime(weekEnding)`                 | Format as `"Friday 00:00"`. Use `Intl.DateTimeFormat`.                                                                                                                 | §2.2     |

**Done when:** `npm run lint` + `npm run check` pass.

---

### Task A.3 — Response transformer

**Scope:** Edit `src/lib/leaderboard.js` (append to the file created in A.2).

Implement and export `transformLeaderboard(response)`:

- Calls the utilities from A.2 to produce a `LeaderboardDisplayState` from raw API JSON
- Full mapping table is in spec §4.3
- Key transforms: `points × 100`, `rank_delta` → `"up"/"down"/"same"`, avatar colour + divider, icon resolution, empty-message fallbacks

**Done when:** `npm run lint` + `npm run check` pass.

---

### Task A.4 — Server routes

**Scope:** Create two new files:

1. `src/routes/leaderboard/+page.server.js` — SSR load function. Follow the pattern in `src/routes/+page.server.js`. Fetch `${BACKEND_API_URL}/api/1/collector/4/leaderboard` with `Content-Type` + optional `x-api-key`. Return `{ leaderboard: <raw JSON> }`. On failure: `throw error(status, 'Failed to load leaderboard')`.

2. `src/routes/api/leaderboard/+server.js` — thin GET proxy for client-side 30 s polling. Same backend call, pipes JSON back. Returns `200` with JSON body, or upstream error status.

**Done when:** `npm run lint` + `npm run check` + `npm run build` pass.

---

## Workstream B — UI Components

**Branch:** `feat/leaderboard-ui`

### Task B.1 — Scaffold, assets, and simple components

**Scope:** Create `src/components/leaderboard/` directory and the following files:

1. **Icon assets** — Create `static/icons/leaderboard/` with a `trophy.png` (placeholder OK until real asset available). Confirm existing `collect.png`, `drop.png`, `destroy.png` paths in `static/icons/`.

2. **EmptyState.svelte** — Per-column empty message (spec §2.5). Props: `title`, `body`. Centered text, `py-12`, gray tones.

3. **LoadingState.svelte** — Centered spinner. Simple CSS animation, match site aesthetic.

4. **ErrorState.svelte** — Error message + "Retry" button. Dispatches a `retry` event. Button styled `bg-primary text-white font-bold rounded-md px-6 py-2`.

**Done when:** `npm run lint` + `npm run check` pass. Components render without errors.

---

### Task B.2 — EntryCard component

**Scope:** Create `src/components/leaderboard/EntryCard.svelte`.

Implement the entry card per spec §2.4:

- **Avatar zone:** 48 × 48, `rounded-md`, background-colour fill from `avatarColorHex`, image overlay (`object-cover`), 3 px divider bar on the right using `avatarDividerHex`
- **Content zone:** username (`text-sm font-bold`), points display (`text-xs font-semibold text-gray-500`, e.g. "+300XP"), metrics row (`flex gap-3`, each chip: 16 px icon + value)
- **Rank zone** (right-aligned column): trend arrow (▲ green / ▼ red / — grey, 12 px), rank label (`text-sm font-black`, "#1"), optional last-week-winner icon (20 px, category icon with gold ring)
- **Top-3 accent:** rank 1 → `border-l-4 border-appYellow`, rank 2 → `border-l-4 border-gray-300`, rank 3 → `border-l-4 border-amber-600`
- **Card container:** `bg-white border border-appGreyBorder rounded-lg p-3 hover:shadow-md transition-shadow`
- **Props:** accepts an `entry` object (matching `EntryDisplay` shape from spec §4.2) + optional `categoryIconSrc` string

**Done when:** `npm run lint` + `npm run check` pass.

---

### Task B.3 — Layout components (WeekBanner, CategoryColumn, ColumnsContainer)

**Scope:** Create three files in `src/components/leaderboard/`:

1. **WeekBanner.svelte** (spec §2.2) — Left: "This Week" heading + date range. Right: winners pill badge + optional info icon link. Props: `weekDateRange`, `winnersTimeLabel`, `rulesUrl`.

2. **CategoryColumn.svelte** (spec §2.3 + §1.3) — Sticky column header (32 px icon + label, white bg, bottom border). Scrollable body (`overflow-y: auto`): renders `<ol>` of `EntryCard` or `EmptyState`. Props: accepts a `category` object (matching `CategoryDisplay` shape).

3. **ColumnsContainer.svelte** (spec §1.1 + §6.4) — Horizontal scroll container wrapping slotted children. Flex, `overflow-x: auto`, `scroll-snap-type: x mandatory`, responsive column sizing via `<style>` block (85 vw mobile, 42 vw sm, 30 vw md, 300 px xl).

**Done when:** `npm run lint` + `npm run check` + `npm run build` pass.

---

## Workstream C — Integration & Polish

**Branch:** `feat/leaderboard-page`
**Depends on:** Workstreams A and B both merged into this branch.

### Task C.1 — Page component + auto-refresh

**Scope:** Create `src/routes/leaderboard/+page.svelte`.

- Receive `data.leaderboard` from the server load function
- Transform via `transformLeaderboard()` in a reactive statement
- Render: `WeekBanner` → `ColumnsContainer` wrapping `CategoryColumn` for each category
- Handle loading/error/success states using `LoadingState` and `ErrorState`
- `onMount`: start 30 s `setInterval` polling `/api/leaderboard`. On success: update data reactively. On failure: do nothing.
- `onDestroy`: clear interval.

**Done when:** `npm run lint` + `npm run check` + `npm run build` pass. Page renders with live data at `/leaderboard`.

---

### Task C.2 — Navigation link + SEO

**Scope:** Edit two files:

1. **`src/routes/+layout.svelte`** — Add "Leaderboard" link between "Support Me" and "Download" in both desktop nav and mobile menu. Style: `text-black/[.64] hover:text-black px-3 py-3 md:py-2 text-sm font-bold`. Link to `/leaderboard`. Add `on:click={closeMenu}` for mobile.

2. **`src/routes/leaderboard/+page.svelte`** — Add `<SEO title="Leaderboard" />` with Open Graph description: `"See who's leading the art collection game this week."` (spec §6.5).

**Done when:** `npm run lint` + `npm run check` + `npm run build` pass. Nav link visible on all pages.

---

### Task C.3 — Responsive QA + accessibility

**Scope:** Edit `src/routes/leaderboard/+page.svelte` and `src/components/leaderboard/*.svelte` as needed.

**Responsive checks** (spec §1.2):

- Mobile (< 640 px): one column visible, peek of next
- Tablet (640–1023 px): two columns, peek of third
- Desktop (1024–1279 px): three columns
- Wide (≥ 1280 px): four+ columns, 300 px fixed width
- Week banner adapts to narrow screens (stack vertically if needed)

**Accessibility checks** (spec §6.6):

- Column container: `role="region"`, `aria-label="Leaderboard categories"`, `tabindex="0"`
- Each column: `role="region"`, `aria-label="{label} leaderboard"`
- Entry lists: `<ol>` with `<li>` per entry
- Trend icons: `aria-label="Rank moved up/down/unchanged"`
- Keyboard navigation: horizontal scroll container focusable and scrollable via arrow keys

Fix any issues found. Run `npm run lint` + `npm run check` + `npm run build`.

**Done when:** All checks pass, layout works at all breakpoints, accessibility attributes are in place.

---

## File Ownership Matrix

| File / Directory                                     | A        | B   | C             |
| ---------------------------------------------------- | -------- | --- | ------------- |
| `src/lib/types.ts`                                   | A.1      |     |               |
| `src/lib/leaderboard.js`                             | A.2, A.3 |     |               |
| `src/routes/leaderboard/+page.server.js`             | A.4      |     |               |
| `src/routes/api/leaderboard/+server.js`              | A.4      |     |               |
| `src/components/leaderboard/EmptyState.svelte`       |          | B.1 |               |
| `src/components/leaderboard/LoadingState.svelte`     |          | B.1 |               |
| `src/components/leaderboard/ErrorState.svelte`       |          | B.1 |               |
| `static/icons/leaderboard/*`                         |          | B.1 |               |
| `src/components/leaderboard/EntryCard.svelte`        |          | B.2 |               |
| `src/components/leaderboard/WeekBanner.svelte`       |          | B.3 |               |
| `src/components/leaderboard/CategoryColumn.svelte`   |          | B.3 |               |
| `src/components/leaderboard/ColumnsContainer.svelte` |          | B.3 |               |
| `src/routes/leaderboard/+page.svelte`                |          |     | C.1, C.2, C.3 |
| `src/routes/+layout.svelte`                          |          |     | C.2           |

---

## Agent Prompt Template

Paste the following into an agent session, replacing `{ID}` with a task ID like `A.1`, `B.2`, or `C.1`.

```
YOUR TASK IS TO EXECUTE TASK {ID}

Study `LEADERBOARD_FEATURE_SPEC.MD` and `docs/FIX_PLAN.md`. Find your task (Task {ID}) in the plan and implement exactly that scope — nothing more, nothing less.

The source code is in `src/`. Study the existing patterns in `src/routes/+page.server.js`, `src/routes/+page.svelte`, and `src/components/` before writing code.

Rules:
1. Search the codebase before making changes — don't assume something isn't implemented.
2. After implementing, run `npm run format && npm run lint && npm run check && npm run build`. All must pass.
3. When done, mark your task complete in `docs/FIX_PLAN.md` (change `[ ]` to `[x]`).
4. Commit with `git add -A && git commit -m "<descriptive message>"` then `git push`.
5. If you discover a bug or issue (even unrelated), document it in `docs/FIX_PLAN.md` under a new "## Discovered Issues" section and fix it if quick, otherwise leave it documented.
6. If you learn something useful about running the project, briefly update `AGENTS.md`.
7. DO NOT implement placeholder or stub code. Full implementation only.
8. DO NOT place status updates in `AGENTS.md`.
9. Follow Svelte 4 / JavaScript / TypeScript conventions matching the existing codebase.
```

---

## Parallelisation Summary

| Phase       | Tasks           | Parallel?   | Notes           |
| ----------- | --------------- | ----------- | --------------- |
| **Phase 1** | A.1 + B.1       | ✅ parallel | Different files |
| **Phase 2** | A.2 + B.2       | ✅ parallel | Different files |
| **Phase 3** | A.3 + B.3       | ✅ parallel | Different files |
| **Phase 4** | A.4             | solo        | Last data task  |
| **Phase 5** | C.1 → C.2 → C.3 | sequential  | Integration     |

Maximum parallelism: **2 agents at a time** during Phases 1–3.
Total tasks: **10** (4 + 3 + 3).
Each task: **one focused commit**.
