/** @typedef {import('$lib/types').LeaderboardResponse} LeaderboardResponse */
/** @typedef {import('$lib/types').LeaderboardDisplayState} LeaderboardDisplayState */
/** @typedef {import('$lib/types').CategoryDisplay} CategoryDisplay */
/** @typedef {import('$lib/types').EntryDisplay} EntryDisplay */
/** @typedef {import('$lib/types').MetricDisplay} MetricDisplay */

// ---------------------------------------------------------------------------
// Avatar colour map (spec §5.1)
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const AVATAR_COLOR_MAP = {
	AppRed: '#CF2D2D',
	AppBlue: '#0692E2',
	AppGreen: '#00D084',
	AppDarkGreen: '#009961',
	AppYellow: '#EDD853',
	AppPurple: '#C06BE8',
	AppOrange: '#FF69CD',
	AppPink: '#FFCEEC',
	AppTeal: '#33A7B5',
	AppMidBlue: '#8E8EFC',
	AppMagenta: '#C52178',
	AppPeach: '#FECDA5',
	AppWhite: '#FFFFFF'
};

const FALLBACK_COLOR = '#EDEDEA';

/**
 * Map an API avatar colour key to a hex value.
 * @param {string} apiKey - e.g. `"AppRed"`
 * @returns {string} Hex colour string
 */
export function resolveAvatarColor(apiKey) {
	return AVATAR_COLOR_MAP[apiKey] ?? FALLBACK_COLOR;
}

// ---------------------------------------------------------------------------
// Colour mixing (spec §5.1 — avatar divider)
// ---------------------------------------------------------------------------

/**
 * Mix a hex colour toward `#000000` by the given ratio (0 = original, 1 = black).
 * @param {string} hex - 6-digit hex colour with leading `#`
 * @param {number} amount - Ratio in the range 0–1
 * @returns {string} Darkened hex colour
 */
export function darkenColor(hex, amount) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	const dr = Math.round(r * (1 - amount));
	const dg = Math.round(g * (1 - amount));
	const db = Math.round(b * (1 - amount));

	return `#${dr.toString(16).padStart(2, '0').toUpperCase()}${dg
		.toString(16)
		.padStart(2, '0')
		.toUpperCase()}${db.toString(16).padStart(2, '0').toUpperCase()}`;
}

// ---------------------------------------------------------------------------
// Icon asset resolution (spec §5.2)
// ---------------------------------------------------------------------------

/** @type {Record<string, string>} */
const ICON_ASSET_MAP = {
	IconTrophy: '/icons/leaderboard/trophy.png',
	icon_collect: '/icons/leaderboard/collect.png',
	icon_drop: '/icons/leaderboard/drop.png',
	icon_destroy: '/icons/leaderboard/destroy.png',
	icon_steps: '/icons/leaderboard/steps.png'
};

const PLACEHOLDER_ICON = '/icons/leaderboard/trophy.png';

/**
 * Resolve an API icon string to a usable image `src`.
 *
 * Handles `asset://`, `bundle://`, `system://` prefixed names, bare names,
 * and `http(s)://` URLs (passed through unchanged).
 *
 * @param {string} iconString - Raw icon value from the API
 * @returns {string} Resolved image path or URL
 */
export function resolveIconSrc(iconString) {
	if (!iconString) return PLACEHOLDER_ICON;

	if (iconString.startsWith('http://') || iconString.startsWith('https://')) {
		return iconString;
	}

	const name = iconString
		.replace(/^asset:\/\//, '')
		.replace(/^bundle:\/\//, '')
		.replace(/^system:\/\//, '');

	return ICON_ASSET_MAP[name] ?? PLACEHOLDER_ICON;
}

// ---------------------------------------------------------------------------
// Date formatting (spec §2.2.1 + §2.2)
// ---------------------------------------------------------------------------

/**
 * Format the leaderboard week date range according to the spec rules:
 * - Same month & year: `d – d MMMM yyyy`  (e.g. "12 – 18 May 2025")
 * - Different months, same year: `d MMM – d MMM yyyy`  (e.g. "28 Apr – 4 May 2025")
 * - Different years: `d MMM yyyy – d MMM yyyy`  (e.g. "28 Dec 2024 – 3 Jan 2025")
 *
 * @param {string} weekStarting - ISO 8601 date string
 * @param {string} weekEnding - ISO 8601 date string
 * @returns {string} Formatted date range
 */
export function formatWeekDateRange(weekStarting, weekEnding) {
	const start = new Date(weekStarting);
	const end = new Date(weekEnding);

	const sDay = start.getUTCDate();
	const eDay = end.getUTCDate();
	const sMonth = start.getUTCMonth();
	const eMonth = end.getUTCMonth();
	const sYear = start.getUTCFullYear();
	const eYear = end.getUTCFullYear();

	/** @param {Date} d */
	const longMonth = (d) =>
		new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' }).format(d);
	/** @param {Date} d */
	const shortMonth = (d) =>
		new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' }).format(d);

	if (sYear === eYear && sMonth === eMonth) {
		return `${sDay} – ${eDay} ${longMonth(end)} ${eYear}`;
	}

	if (sYear === eYear) {
		return `${sDay} ${shortMonth(start)} – ${eDay} ${shortMonth(end)} ${eYear}`;
	}

	return `${sDay} ${shortMonth(start)} ${sYear} – ${eDay} ${shortMonth(end)} ${eYear}`;
}

/**
 * Format the winners announcement time from the week-ending date.
 * Returns `"EEEE HH:mm"` format, e.g. `"Friday 00:00"`.
 *
 * @param {string} weekEnding - ISO 8601 date string
 * @returns {string} Day-of-week + time string
 */
export function formatWinnersTime(weekEnding) {
	const date = new Date(weekEnding);

	const weekday = new Intl.DateTimeFormat('en-GB', {
		weekday: 'long',
		timeZone: 'UTC'
	}).format(date);

	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');

	return `${weekday} ${hours}:${minutes}`;
}

// ---------------------------------------------------------------------------
// Response transformer (spec §4.3)
// ---------------------------------------------------------------------------

const DIVIDER_DARKEN_AMOUNT = 0.26;

/**
 * Transform a raw leaderboard API response into a display-ready state object.
 *
 * @param {LeaderboardResponse} response - Raw API JSON
 * @returns {LeaderboardDisplayState}
 */
export function transformLeaderboard(response) {
	return {
		weekDateRange: formatWeekDateRange(response.week_starting, response.week_ending),
		winnersTimeLabel: formatWinnersTime(response.week_ending),
		rulesUrl: response.rules_url ?? null,
		categories: response.categories.map(transformCategory)
	};
}

/**
 * @param {import('$lib/types').LeaderboardCategoryResponse} cat
 * @returns {CategoryDisplay}
 */
function transformCategory(cat) {
	return {
		id: cat.category_id,
		label: cat.label,
		iconSrc: resolveIconSrc(cat.icon),
		entries: cat.entries.map((entry) => transformEntry(entry)),
		emptyTitle: cat.api_empty_message?.title ?? 'No activity in this category yet',
		emptyBody: cat.api_empty_message?.body ?? 'Be the first to take the lead!'
	};
}

/**
 * @param {import('$lib/types').LeaderboardEntryResponse} entry
 * @returns {EntryDisplay}
 */
function transformEntry(entry) {
	const avatarColorHex = resolveAvatarColor(entry.avatar_color);

	return {
		username: entry.username,
		avatarUrl: entry.avatar_url,
		avatarColorHex,
		avatarDividerHex: darkenColor(avatarColorHex, DIVIDER_DARKEN_AMOUNT),
		rank: entry.rank,
		rankLabel: `#${entry.rank}`,
		displayPoints: `+${entry.points * 100}XP`,
		rankTrend: entry.rank_delta > 0 ? 'up' : entry.rank_delta < 0 ? 'down' : 'same',
		isLastWeeksWinner: entry.is_last_weeks_winner ?? false,
		metrics: entry.metrics.map(transformMetric)
	};
}

/**
 * @param {import('$lib/types').LeaderboardMetricResponse} metric
 * @returns {MetricDisplay}
 */
function transformMetric(metric) {
	return {
		iconSrc: resolveIconSrc(metric.icon),
		label: metric.label,
		value: metric.value
	};
}
