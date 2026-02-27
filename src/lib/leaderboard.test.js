import { describe, it, expect } from 'vitest';
import {
	resolveAvatarColor,
	darkenColor,
	resolveIconSrc,
	formatWeekDateRange,
	formatWinnersTime
} from './leaderboard.js';

// ---------------------------------------------------------------------------
// resolveAvatarColor
// ---------------------------------------------------------------------------

describe('resolveAvatarColor', () => {
	it('maps all 13 named keys to correct hex values', () => {
		const expected = /** @type {const} */ ({
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
		});

		for (const [key, hex] of Object.entries(expected)) {
			expect(resolveAvatarColor(key)).toBe(hex);
		}
	});

	it('returns fallback for unknown key', () => {
		expect(resolveAvatarColor('SomethingRandom')).toBe('#EDEDEA');
	});

	it('returns fallback for empty string', () => {
		expect(resolveAvatarColor('')).toBe('#EDEDEA');
	});
});

// ---------------------------------------------------------------------------
// darkenColor
// ---------------------------------------------------------------------------

describe('darkenColor', () => {
	it('returns original colour at 0% darkening', () => {
		expect(darkenColor('#FF8800', 0)).toBe('#FF8800');
	});

	it('returns black at 100% darkening', () => {
		expect(darkenColor('#FF8800', 1)).toBe('#000000');
	});

	it('darkens white by 26% correctly', () => {
		// 255 * 0.74 = 188.7 → 189 = 0xBD
		expect(darkenColor('#FFFFFF', 0.26)).toBe('#BDBDBD');
	});

	it('darkens AppRed (#CF2D2D) by 26%', () => {
		// R: 207 * 0.74 = 153.18 → 153 = 0x99
		// G: 45  * 0.74 = 33.30  → 33  = 0x21
		// B: 45  * 0.74 = 33.30  → 33  = 0x21
		expect(darkenColor('#CF2D2D', 0.26)).toBe('#992121');
	});

	it('keeps black as black regardless of amount', () => {
		expect(darkenColor('#000000', 0)).toBe('#000000');
		expect(darkenColor('#000000', 0.5)).toBe('#000000');
		expect(darkenColor('#000000', 1)).toBe('#000000');
	});
});

// ---------------------------------------------------------------------------
// resolveIconSrc
// ---------------------------------------------------------------------------

describe('resolveIconSrc', () => {
	it('resolves asset:// prefix to local path', () => {
		expect(resolveIconSrc('asset://IconTrophy')).toBe('/icons/leaderboard/trophy.png');
	});

	it('resolves bundle:// prefix to local path', () => {
		expect(resolveIconSrc('bundle://icon_collect')).toBe('/icons/leaderboard/collect.png');
	});

	it('resolves system:// prefix to local path', () => {
		expect(resolveIconSrc('system://icon_drop')).toBe('/icons/leaderboard/drop.png');
	});

	it('passes through https:// URLs unchanged', () => {
		const url = 'https://cdn.example.com/img/trophy.png';
		expect(resolveIconSrc(url)).toBe(url);
	});

	it('passes through http:// URLs unchanged', () => {
		const url = 'http://cdn.example.com/img/trophy.png';
		expect(resolveIconSrc(url)).toBe(url);
	});

	it('resolves bare known name without prefix', () => {
		expect(resolveIconSrc('icon_destroy')).toBe('/icons/leaderboard/destroy.png');
	});

	it('returns placeholder for unknown bare name', () => {
		expect(resolveIconSrc('some_unknown_icon')).toBe('/icons/leaderboard/trophy.png');
	});

	it('returns placeholder for unknown asset:// name', () => {
		expect(resolveIconSrc('asset://UnknownIcon')).toBe('/icons/leaderboard/trophy.png');
	});

	it('returns placeholder for empty string', () => {
		expect(resolveIconSrc('')).toBe('/icons/leaderboard/trophy.png');
	});
});

// ---------------------------------------------------------------------------
// formatWeekDateRange
// ---------------------------------------------------------------------------

describe('formatWeekDateRange', () => {
	it('formats same month & year: d – d MMMM yyyy', () => {
		expect(formatWeekDateRange('2025-05-12T00:00:00Z', '2025-05-18T00:00:00Z')).toBe(
			'12 – 18 May 2025'
		);
	});

	it('formats different months, same year: d MMM – d MMM yyyy', () => {
		expect(formatWeekDateRange('2025-04-28T00:00:00Z', '2025-05-04T00:00:00Z')).toBe(
			'28 Apr – 4 May 2025'
		);
	});

	it('formats different years: d MMM yyyy – d MMM yyyy', () => {
		expect(formatWeekDateRange('2024-12-28T00:00:00Z', '2025-01-03T00:00:00Z')).toBe(
			'28 Dec 2024 – 3 Jan 2025'
		);
	});

	it('handles single-day range within same month', () => {
		expect(formatWeekDateRange('2025-06-01T00:00:00Z', '2025-06-01T00:00:00Z')).toBe(
			'1 – 1 June 2025'
		);
	});
});

// ---------------------------------------------------------------------------
// formatWinnersTime
// ---------------------------------------------------------------------------

describe('formatWinnersTime', () => {
	it('formats midnight UTC as weekday 00:00', () => {
		// 2025-05-19 is a Monday
		expect(formatWinnersTime('2025-05-19T00:00:00Z')).toBe('Monday 00:00');
	});

	it('formats mid-day UTC correctly', () => {
		// 2025-05-14 is a Wednesday
		expect(formatWinnersTime('2025-05-14T14:30:00Z')).toBe('Wednesday 14:30');
	});

	it('formats Friday midnight', () => {
		// 2025-05-16 is a Friday
		expect(formatWinnersTime('2025-05-16T00:00:00Z')).toBe('Friday 00:00');
	});

	it('pads single-digit hours and minutes', () => {
		// 2025-05-18 is a Sunday
		expect(formatWinnersTime('2025-05-18T03:05:00Z')).toBe('Sunday 03:05');
	});
});
