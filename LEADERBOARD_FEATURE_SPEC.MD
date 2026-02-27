# Leaderboard Feature — Web Spec

> Specification for the `/leaderboard` page on the Art Collector marketing website.
> Based on the existing mobile implementation, adapted for a multi-column horizontal-scroll web layout.

---

## Table of Contents

1. [Page Layout (Web)](#1-page-layout-web)
2. [UI Components](#2-ui-components)
3. [Data / API Spec](#3-data--api-spec)
4. [Domain Model](#4-domain-model)
5. [Asset Mapping](#5-asset-mapping)
6. [Implementation Notes (SvelteKit)](#6-implementation-notes-sveltekit)

---

## 1. Page Layout (Web)

### 1.1 Core Layout Concept

The mobile app uses **tabs + swipe** to show one leaderboard category at a time. The web version replaces this with a **horizontally scrolling row of columns** so the user can see all categories side-by-side and compare them at a glance.

Each column scrolls **independently on the vertical axis**. The outer container scrolls on the **horizontal axis** to reveal additional columns when they overflow the viewport.

Think of it as a Kanban-style board where each lane is a leaderboard category.

```
┌─ viewport ────────────────────────────────────────────────────────────┐
│                                                                       │
│  ┌─ page header ───────────────────────────────────────────────────┐  │
│  │  "Leaderboard"                                           [ℹ️]  │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌─ week banner ───────────────────────────────────────────────────┐  │
│  │  This Week                                                      │  │
│  │  12 – 18 May 2025                      🏆 Weekly Winners        │  │
│  │                                          Friday 00:00           │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌─ columns container (horizontal scroll / snap) ──────────────────┐ │
│  │                                                                  │ │
│  │  ┌─ col ──────┐  ┌─ col ──────┐  ┌─ col ──────┐  ┌─ col ─────┐│ │
│  │  │ 🏆 Overall │  │ 👟 Steps  │  │ 🎨 Art     │  │ 💀 ...    ││ │
│  │  │────────────│  │────────────│  │────────────│  │────────────││ │
│  │  │            │  │            │  │            │  │            ││ │
│  │  │  entry 1   │  │  entry 1   │  │            │  │  entry 1   ││ │
│  │  │  entry 2   │  │  entry 2   │  │  (empty    │  │  entry 2   ││ │
│  │  │  entry 3   │  │  entry 3   │  │   state)   │  │            ││ │
│  │  │  entry 4   │  │            │  │            │  │            ││ │
│  │  │  ...       │  │            │  │            │  │            ││ │
│  │  │  ↕ scroll  │  │  ↕ scroll  │  │            │  │  ↕ scroll  ││ │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘│ │
│  │                                                                  │ │
│  │  ◄─────────────── horizontal scroll / snap ──────────────────►  │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

### 1.2 Responsive Column Sizing

The column container uses CSS scroll-snap for a paging feel. Column widths are viewport-responsive:

| Viewport                   | Visible columns | Column width | Behaviour                                                                 |
| -------------------------- | --------------- | ------------ | ------------------------------------------------------------------------- |
| **Mobile** (< 640 px)      | ~1.15           | ~85 vw       | Single-column focus; peek of next column signals horizontal scrollability |
| **Tablet** (640–1023 px)   | ~2.3            | ~42 vw       | Two columns in view with a peek                                           |
| **Desktop** (1024–1279 px) | ~3.3            | ~30 vw       | Three columns comfortably                                                 |
| **Wide** (≥ 1280 px)       | ~4+             | 300 px fixed | All/most columns visible; clamp max-width                                 |

Columns snap to start (`scroll-snap-align: start`) so horizontal paging feels deliberate, not floaty.

### 1.3 Vertical Scrolling (Per-Column)

Each column body (the entry list below the column header) scrolls independently:

- Use `overflow-y: auto` on each column body.
- Set a `max-height` on the column body so it doesn't stretch the page. This should be calculated relative to the viewport: roughly `calc(100vh - <header+banner+column-header heights>)`. Target something like `max-height: calc(100vh - 260px)` and refine during implementation.
- The page header and week banner remain **fixed/sticky above** the columns — they do not scroll away.

### 1.4 Section Breakdown

The page has three fixed vertical sections, top to bottom:

1. **Page Header** — title + optional info link (sticky top, part of the existing site `<header>`)
2. **Week Banner** — date range + winners button
3. **Columns Container** — the horizontally scrollable set of category columns; this section fills the remaining vertical space

### 1.5 Navigation Entry Point

Add a **"Leaderboard"** link to the site-wide navigation bar (both desktop nav and mobile hamburger menu). It should link to `/leaderboard`.

Position it after "Support Me" and before the "Download" button:

```
Home  |  Support Me  |  Leaderboard  |  [Download]
```

---

## 2. UI Components

### 2.1 Page Header

Uses the existing site header. The page title "Leaderboard" is set via the `<SEO>` component (browser tab title) — there is no separate in-page title bar since the site header is always visible.

An optional **info icon** (ℹ️) can be placed as a small link/button in the week banner area (see §2.2). It links to `rulesUrl` from the API response. Only rendered when `rulesUrl` is non-null.

### 2.2 Week Banner

Sits between the site header and the columns. Full-width, horizontally padded to match the columns container.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  This Week                          🏆 Weekly Winners       │
│  12 – 18 May 2025               [ℹ️]  Friday 00:00         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| Element            | Styling                                                                           | Notes                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **"This Week"**    | `text-xl font-black text-gray-800`                                                | Hardcoded string                                                                                                                           |
| **Date range**     | `text-sm text-gray-500 font-semibold`                                             | Derived from `week_starting` / `week_ending` (see §2.2.1)                                                                                  |
| **Winners button** | Pill/badge: `bg-appYellow text-gray-800 text-xs font-bold rounded-full px-3 py-1` | Trophy icon + "Weekly Winners" + day/time. Links to winners page or opens a modal (future scope, for now can be a no-op or link to rules). |
| **Info icon**      | Small `text-gray-400 hover:text-gray-600` link icon                               | Only shown when `rulesUrl` is non-null. Opens in new tab.                                                                                  |

#### 2.2.1 Date Range Formatting

Format the `week_starting` → `week_ending` range following these rules:

| Scenario                    | Format                    | Example                    |
| --------------------------- | ------------------------- | -------------------------- |
| Same month & year           | `d – d MMMM yyyy`         | `12 – 18 May 2025`         |
| Different months, same year | `d MMM – d MMM yyyy`      | `28 Apr – 4 May 2025`      |
| Different years             | `d MMM yyyy – d MMM yyyy` | `28 Dec 2024 – 3 Jan 2025` |

The winners day/time is derived from `week_ending`, formatted as `EEEE HH:mm` (e.g. `Friday 00:00`).

### 2.3 Column Header

Each column starts with a sticky header pinned to the top of the column:

```
┌──────────────────────┐
│   [🏆]  Overall      │
└──────────────────────┘
```

| Element        | Details                                                                    |
| -------------- | -------------------------------------------------------------------------- |
| **Icon**       | 32 × 32 px, from category `icon` field (see §5 for asset mapping)          |
| **Label**      | `text-sm font-bold text-gray-700`, from category `label` field             |
| **Background** | `bg-white` with a bottom border `border-b border-appGreyBorder`            |
| **Sticky**     | `position: sticky; top: 0; z-index: 10` within the column scroll container |

### 2.4 Entry Card

Each leaderboard entry renders as a compact card within its column.

```
┌────────────────────────────────┐
│ ┌──────┐                       │
│ │AVATAR│  username     +300XP  │
│ │      │  [🎨3] [💧0] [💀3]   │
│ └──────┘               ▲ #1   │
└────────────────────────────────┘
```

#### Card Container

| Property              | Value                                            |
| --------------------- | ------------------------------------------------ |
| Background            | `bg-white`                                       |
| Border                | `border border-appGreyBorder`                    |
| Border radius         | `rounded-lg` (8 px)                              |
| Padding               | 12 px (`p-3`)                                    |
| Spacing between cards | 8 px (`space-y-2`)                               |
| Layout                | `flex` row                                       |
| Hover                 | Subtle lift: `hover:shadow-md transition-shadow` |

#### Avatar

| Property   | Value                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Size       | 48 × 48 px (`size-12`)                                                                                                                                                               |
| Shape      | `rounded-md` (slightly rounded square, matching the app)                                                                                                                             |
| Background | Filled with the user's `avatar_color` (see §5.1 for colour map)                                                                                                                      |
| Image      | `avatar_url`, `object-cover`                                                                                                                                                         |
| Divider    | A 3 px-wide vertical bar to the right of the avatar, coloured slightly darker than the `avatar_color` (mix 26 % toward black). Use a CSS `border-right` or `::after` pseudo-element. |

#### Content Area (middle)

| Element         | Styling                               | Value                 |
| --------------- | ------------------------------------- | --------------------- |
| **Username**    | `text-sm font-bold text-gray-800`     | `entry.username`      |
| **Points**      | `text-xs font-semibold text-gray-500` | `"+{points × 100}XP"` |
| **Metrics row** | `flex gap-3`                          | One chip per metric   |

Each **metric chip**:

| Element | Details                                 |
| ------- | --------------------------------------- |
| Icon    | 16 × 16 px, from `metric.icon` (see §5) |
| Value   | `text-xs text-gray-600`                 |
| Layout  | `flex items-center gap-1`               |

#### Rank Area (right-aligned)

| Element         | Styling                                       | Value                                                                                                                                |
| --------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Trend icon**  | 12 px                                         | `rank_delta > 0`: green ▲ (`text-green-600`). `rank_delta < 0`: red ▼ (`text-red-500`). `rank_delta == 0`: grey — (`text-gray-400`). |
| **Rank**        | `text-sm font-black text-gray-800`            | `"#1"`, `"#2"`, etc.                                                                                                                 |
| **Winner icon** | 20 px, shown only when `is_last_weeks_winner` | Category icon with a subtle gold ring / background                                                                                   |

The rank area is a vertically stacked column, right-aligned: trend icon on top, rank number below, winner icon at the bottom (if applicable).

#### Top-3 Treatment (Optional Enhancement)

Consider giving the top 3 entries a subtle visual distinction:

| Rank | Accent                                             |
| ---- | -------------------------------------------------- |
| #1   | Left border `border-l-4 border-appYellow` (gold)   |
| #2   | Left border `border-l-4 border-gray-300` (silver)  |
| #3   | Left border `border-l-4 border-amber-600` (bronze) |

### 2.5 Empty State (Per-Column)

When a category has zero entries, show a centered message inside the column body:

```
┌──────────────────────┐
│   [🏆]  Overall      │
├──────────────────────┤
│                      │
│   No activity in     │
│   this category yet  │
│                      │
│   Be the first to    │
│   take the lead!     │
│                      │
└──────────────────────┘
```

| Element | Source                    | Fallback                             |
| ------- | ------------------------- | ------------------------------------ |
| Title   | `api_empty_message.title` | `"No activity in this category yet"` |
| Body    | `api_empty_message.body`  | `"Be the first to take the lead!"`   |

Styling: `text-center text-gray-400 text-sm py-12`

### 2.6 Page-Level States

| State       | Rendering                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Loading** | Centered spinner (reuse existing site loading pattern). Show while the initial API call is in-flight.                                   |
| **Error**   | Centered error message + "Retry" button (`bg-primary text-white font-bold rounded-md px-6 py-2`). Shown only if the initial load fails. |
| **Success** | Full leaderboard layout (banner + columns).                                                                                             |

On subsequent auto-refreshes (every 30 s), keep the existing data visible and silently replace on success. Errors during auto-refresh are swallowed — existing data stays on screen.

### 2.7 Winners Banner (Future Scope)

The mobile app has a sticky bottom banner that announces weekly winners. This is **out of scope for the initial web build** but noted here for future reference:

- Amber/gold bottom banner with marquee text
- Triggers within 3 days of `week_ending`
- Tapping opens a winners modal (separate API endpoint, not covered in this spec)
- Dismiss state stored in `localStorage`

---

## 3. Data / API Spec

### 3.1 Endpoint

```
GET /api/1/collector/4/leaderboard
```

**Base URL**: Use the existing `BACKEND_API_URL` env var (falls back to the production DigitalOcean backend).

**No query parameters.** No pagination. Returns the full leaderboard for the current week in a single response.

### 3.2 Headers

| Header         | Value                                 | Required           |
| -------------- | ------------------------------------- | ------------------ |
| `Content-Type` | `application/json`                    | Yes                |
| `x-api-key`    | Shared API key from `API_KEY` env var | Yes (if available) |

**No `Authorization` header.** The web user is not logged in. The endpoint returns the full leaderboard without highlighting any current user (`is_current_user` will be `null`/absent on all entries). This is the expected and correct behaviour for the web.

### 3.3 Response Shape

```json
{
	"week_starting": "2025-05-12T00:00:00Z",
	"week_ending": "2025-05-19T00:00:00Z",
	"rules_url": "https://example.com/leaderboard-rules",
	"categories": [
		{
			"category_id": "overall",
			"label": "Overall",
			"icon": "asset://IconTrophy",
			"api_empty_message": {
				"title": "No activity yet",
				"body": "Be the first to take the lead!",
				"icon": "asset://IconTrophy"
			},
			"entries": [
				{
					"username": "xellon",
					"avatar_url": "https://d3gm6vhzqyd5xu.cloudfront.net/assets/gamer.png",
					"avatar_color": "AppRed",
					"rank": 1,
					"points": 3,
					"rank_delta": 1,
					"is_last_weeks_winner": true,
					"is_current_user": null,
					"metrics": [
						{
							"icon": "asset://icon_collect",
							"label": "Collected",
							"value": 3
						},
						{
							"icon": "asset://icon_drop",
							"label": "Dropped",
							"value": 0
						},
						{
							"icon": "asset://icon_destroy",
							"label": "Destroyed",
							"value": 3
						}
					]
				}
			]
		}
	]
}
```

### 3.4 Field Reference

| JSON Field                             | Type              | Notes                                                                                       |
| -------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| `week_starting`                        | ISO 8601 string   | Start of the leaderboard period                                                             |
| `week_ending`                          | ISO 8601 string   | End of the leaderboard period                                                               |
| `rules_url`                            | `string \| null`  | URL to leaderboard rules page                                                               |
| `categories`                           | `array`           | Ordered list of category objects                                                            |
| `categories[].category_id`             | `string`          | Unique ID for the category                                                                  |
| `categories[].label`                   | `string`          | Display name                                                                                |
| `categories[].icon`                    | `string`          | Image source (see §5)                                                                       |
| `categories[].api_empty_message`       | `object \| null`  | Custom empty-state content                                                                  |
| `categories[].api_empty_message.title` | `string \| null`  | Empty state heading                                                                         |
| `categories[].api_empty_message.body`  | `string`          | Empty state body text                                                                       |
| `categories[].api_empty_message.icon`  | `string \| null`  | Empty state icon                                                                            |
| `categories[].entries`                 | `array`           | Ranked user list                                                                            |
| `entries[].username`                   | `string`          | Display name                                                                                |
| `entries[].avatar_url`                 | `string`          | Avatar image URL                                                                            |
| `entries[].avatar_color`               | `string`          | Named colour key (e.g. `"AppRed"`)                                                          |
| `entries[].rank`                       | `number`          | 1-based rank                                                                                |
| `entries[].points`                     | `number`          | Raw points — **multiply by 100 for display**                                                |
| `entries[].rank_delta`                 | `number`          | Rank change since last refresh. `> 0` = up, `< 0` = down, `0` = unchanged. Defaults to `0`. |
| `entries[].is_last_weeks_winner`       | `boolean \| null` | Won this category last week                                                                 |
| `entries[].is_current_user`            | `boolean \| null` | Always `null` on web (no auth)                                                              |
| `entries[].metrics`                    | `array`           | Breakdown metrics                                                                           |
| `metrics[].icon`                       | `string`          | Metric icon (image source)                                                                  |
| `metrics[].label`                      | `string`          | Metric label                                                                                |
| `metrics[].value`                      | `number`          | Metric count                                                                                |

### 3.5 Error Handling

- **Initial load failure**: show error state with a "Retry" button.
- **Auto-refresh failure** (30 s poll): silently swallow — keep existing data visible.
- **No automatic retry with backoff** — the 30 s polling cycle acts as the retry mechanism.

### 3.6 Data Fetching Strategy

Use a **SvelteKit server-side load function** (`+page.server.js`) to fetch leaderboard data on initial page load (SSR). This matches the existing patterns used by the homepage and highlights page.

For the **30 s auto-refresh**, use a client-side `setInterval` that calls a lightweight API route (or fetches directly from the client if CORS allows). If the backend does not allow direct browser requests, create a thin SvelteKit API route at `/api/leaderboard/+server.js` that proxies the request.

---

## 4. Domain Model

### 4.1 TypeScript Types

```typescript
/** Raw API response */
interface LeaderboardResponse {
	week_starting: string;
	week_ending: string;
	rules_url: string | null;
	categories: LeaderboardCategoryResponse[];
}

interface LeaderboardCategoryResponse {
	category_id: string;
	label: string;
	icon: string;
	api_empty_message: {
		title: string | null;
		body: string;
		icon: string | null;
	} | null;
	entries: LeaderboardEntryResponse[];
}

interface LeaderboardEntryResponse {
	username: string;
	avatar_url: string;
	avatar_color: string;
	rank: number;
	points: number;
	rank_delta: number;
	is_last_weeks_winner: boolean | null;
	is_current_user: boolean | null;
	metrics: LeaderboardMetricResponse[];
}

interface LeaderboardMetricResponse {
	icon: string;
	label: string;
	value: number;
}
```

### 4.2 Display State (Derived)

```typescript
/** Transformed for rendering */
interface LeaderboardDisplayState {
	weekDateRange: string; // e.g. "12 – 18 May 2025"
	winnersTimeLabel: string; // e.g. "Friday 00:00"
	rulesUrl: string | null;
	categories: CategoryDisplay[];
}

interface CategoryDisplay {
	id: string;
	label: string;
	iconSrc: string; // resolved to a usable URL or local path
	entries: EntryDisplay[];
	emptyTitle: string;
	emptyBody: string;
}

interface EntryDisplay {
	username: string;
	avatarUrl: string;
	avatarColorHex: string; // resolved from named key → hex
	avatarDividerHex: string; // 26% darker variant
	rank: number;
	rankLabel: string; // "#1", "#2", …
	displayPoints: string; // "+300XP"
	rankTrend: 'up' | 'down' | 'same';
	isLastWeeksWinner: boolean;
	metrics: MetricDisplay[];
}

interface MetricDisplay {
	iconSrc: string;
	label: string;
	value: number;
}
```

### 4.3 API → Display Mapping

| API field                       | Display field       | Transform                                            |
| ------------------------------- | ------------------- | ---------------------------------------------------- |
| `week_starting` + `week_ending` | `weekDateRange`     | Date range string (§2.2.1)                           |
| `week_ending`                   | `winnersTimeLabel`  | `EEEE HH:mm` format                                  |
| `rules_url`                     | `rulesUrl`          | Pass-through                                         |
| `category_id`                   | `id`                | Pass-through                                         |
| `label`                         | `label`             | Pass-through                                         |
| `icon`                          | `iconSrc`           | Resolve via asset map (§5)                           |
| `api_empty_message.title`       | `emptyTitle`        | Fallback: `"No activity in this category yet"`       |
| `api_empty_message.body`        | `emptyBody`         | Fallback: `"Be the first to take the lead!"`         |
| `username`                      | `username`          | Pass-through                                         |
| `avatar_url`                    | `avatarUrl`         | Pass-through                                         |
| `avatar_color`                  | `avatarColorHex`    | Map named key → hex (§5.1)                           |
| `avatar_color`                  | `avatarDividerHex`  | Mix `avatarColorHex` 26 % toward `#000000`           |
| `rank`                          | `rank`, `rankLabel` | Pass-through; format as `"#N"`                       |
| `points`                        | `displayPoints`     | `"+" + (points * 100) + "XP"`                        |
| `rank_delta`                    | `rankTrend`         | `> 0` → `"up"`, `< 0` → `"down"`, `=== 0` → `"same"` |
| `is_last_weeks_winner`          | `isLastWeeksWinner` | `?? false`                                           |
| `is_current_user`               | _(unused on web)_   | Ignored — always null without auth                   |
| `metrics[].icon`                | `iconSrc`           | Resolve via asset map (§5)                           |
| `metrics[].label`               | `label`             | Pass-through                                         |
| `metrics[].value`               | `value`             | Pass-through                                         |

---

## 5. Asset Mapping

### 5.1 Avatar Colour Map

The API returns named colour keys in `avatar_color`. Map them to the Tailwind tokens already defined in `tailwind.config.js`:

| API Key        | Tailwind Token | Hex       |
| -------------- | -------------- | --------- |
| `AppRed`       | `appRed`       | `#CF2D2D` |
| `AppBlue`      | `appBlue`      | `#0692E2` |
| `AppGreen`     | `appGreen`     | `#00D084` |
| `AppDarkGreen` | `appDarkGreen` | `#009961` |
| `AppYellow`    | `appYellow`    | `#EDD853` |
| `AppPurple`    | `appPurple`    | `#C06BE8` |
| `AppOrange`    | `appOrange`    | `#FF69CD` |
| `AppPink`      | `appPink`      | `#FFCEEC` |
| `AppTeal`      | `appTeal`      | `#33A7B5` |
| `AppMidBlue`   | `appMidBlue`   | `#8E8EFC` |
| `AppMagenta`   | `appMagenta`   | `#C52178` |
| `AppPeach`     | `appPeach`     | `#FECDA5` |
| `AppWhite`     | `appWhite`     | `#FFFFFF` |

If an unknown key is received, fall back to `appGrey` (`#EDEDEA`).

The avatar divider colour is computed as: `mix(avatarColorHex, #000000, 26%)` — i.e. 74 % of the avatar colour + 26 % black. Pre-compute or use a CSS utility.

### 5.2 Icon Asset Source Resolution

The API uses a string-based image source format:

| Prefix                                 | Resolution                                                                                                                                                                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset://` or `bundle://` or no prefix | Strip the prefix, map the name to a local asset path under `/icons/` or `/images/`. E.g. `"asset://IconTrophy"` → `/icons/leaderboard/icon-trophy.png`. A mapping object in code should translate known icon names to local file paths. |
| `http://` or `https://`                | Use directly as the `src` URL.                                                                                                                                                                                                          |
| `system://`                            | Legacy — treat as `asset://`.                                                                                                                                                                                                           |

Build a static lookup map for all known asset icon names. Unknown names should fall back to a generic placeholder icon.

Known icon names from the mobile codebase (to be confirmed against live API responses):

| Asset Name     | Suggested Local Path            | Description                                  |
| -------------- | ------------------------------- | -------------------------------------------- |
| `IconTrophy`   | `/icons/leaderboard/trophy.png` | Overall / winner category                    |
| `icon_collect` | `/icons/collect.png`            | Collected metric (already exists in project) |
| `icon_drop`    | `/icons/drop.png`               | Dropped metric (already exists in project)   |
| `icon_destroy` | `/icons/destroy.png`            | Destroyed metric (already exists in project) |

Additional icons will need to be exported from the mobile design assets or sourced from the design system when the full set of categories is known.

---

## 6. Implementation Notes (SvelteKit)

### 6.1 Route Structure

```
src/routes/leaderboard/
  +page.server.js      ← server-side load (initial SSR fetch)
  +page.svelte         ← page component
src/routes/api/leaderboard/
  +server.js           ← proxy endpoint for client-side auto-refresh (if needed)
src/components/leaderboard/
  WeekBanner.svelte    ← week info + winners button
  CategoryColumn.svelte ← single column (header + scrollable entry list)
  EntryCard.svelte     ← single leaderboard entry row
  EmptyState.svelte    ← empty category message
src/lib/
  leaderboard.js       ← API fetch, response transform, asset map, colour map
  types.ts             ← LeaderboardResponse types (or JSDoc equivalents)
```

### 6.2 Server Load (`+page.server.js`)

Follow the existing pattern from the homepage:

```javascript
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const BACKEND_API_URL =
	env.BACKEND_API_URL ?? 'https://tethered-publics-backend-7twz4.ondigitalocean.app';

export async function load() {
	const response = await fetch(`${BACKEND_API_URL}/api/1/collector/4/leaderboard`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(env.API_KEY ? { 'x-api-key': env.API_KEY } : {})
		}
	});

	if (!response.ok) {
		throw error(response.status, 'Failed to load leaderboard');
	}

	return { leaderboard: await response.json() };
}
```

### 6.3 Client-Side Auto-Refresh

Use `onMount` + `setInterval` (30 000 ms). Fetch from the SvelteKit proxy route `/api/leaderboard` to avoid CORS issues and keep the API key server-side. On success, reactively replace the store/data. On failure, do nothing (keep stale data).

Clear the interval in `onDestroy`.

### 6.4 Key CSS Patterns

```css
/* Horizontal scroll container */
.columns-container {
	display: flex;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	-webkit-overflow-scrolling: touch;
	gap: 1rem;
	padding: 0 1rem;
}

/* Individual column */
.category-column {
	flex: 0 0 85vw; /* mobile default */
	scroll-snap-align: start;
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 260px);
}

@media (min-width: 640px) {
	.category-column {
		flex: 0 0 42vw;
	}
}
@media (min-width: 1024px) {
	.category-column {
		flex: 0 0 30vw;
	}
}
@media (min-width: 1280px) {
	.category-column {
		flex: 0 0 300px;
	}
}

/* Column body (scrollable entry list) */
.column-body {
	flex: 1;
	overflow-y: auto;
}

/* Column header (sticky within column) */
.column-header {
	position: sticky;
	top: 0;
	z-index: 10;
	background: white;
}
```

Use Tailwind utility classes wherever possible; only drop into a `<style>` block for the scroll-snap and responsive `flex-basis` rules that aren't easily expressed in Tailwind 3.4.

### 6.5 SEO

- Use the `<SEO>` component with `title="Leaderboard"`.
- Add Open Graph meta: title `"Art Collector — Leaderboard"`, description `"See who's leading the art collection game this week."`.
- The page content is SSR'd, so leaderboard data is in the initial HTML for search engines.

### 6.6 Accessibility

- Column container: `role="region"`, `aria-label="Leaderboard categories"`, `tabindex="0"` (keyboard-scrollable).
- Each column: `role="region"`, `aria-label="{category label} leaderboard"`.
- Entry cards: semantic `<ol>` lists within each column, with `<li>` per entry.
- Trend icons: `aria-label="Rank moved up"` / `"Rank moved down"` / `"Rank unchanged"`.
- Colour contrast: ensure text on avatar-colour backgrounds meets WCAG AA.

### 6.7 Performance

- **SSR** the initial render — no client-side loading spinner on first paint.
- **Lazy-load avatar images** (`loading="lazy"`) since most will be off-screen in scrolled columns.
- **No pagination needed** — the API returns the complete list in one response (expected to be small, tens of entries).
- **30 s polling** is lightweight (single GET, small JSON). No WebSocket needed.

---

## Appendix: Scope Summary

| Feature                                            | In Scope | Notes                           |
| -------------------------------------------------- | -------- | ------------------------------- |
| Multi-column horizontal scroll layout              | ✅       | Core differentiator from mobile |
| Independent vertical scroll per column             | ✅       |                                 |
| Category headers with icons                        | ✅       |                                 |
| Entry cards (avatar, rank, points, metrics, trend) | ✅       |                                 |
| Empty state per category                           | ✅       |                                 |
| Week banner (date range, winners time)             | ✅       |                                 |
| Info/rules link                                    | ✅       |                                 |
| SSR initial load                                   | ✅       |                                 |
| 30 s auto-refresh                                  | ✅       |                                 |
| Loading / error page states                        | ✅       |                                 |
| Nav bar link                                       | ✅       |                                 |
| Current-user highlighting                          | ❌       | Not applicable — no auth on web |
| Profile navigation on entry click                  | ❌       | No user profiles on web         |
| Winners banner / modal                             | ❌       | Future scope                    |
| Pull-to-refresh                                    | ❌       | Not applicable to web           |
