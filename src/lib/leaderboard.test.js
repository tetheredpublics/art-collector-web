import { describe, it, expect } from 'vitest';
import {
	resolveAvatarColor,
	darkenColor,
	resolveIconSrc,
	formatWeekDateRange,
	formatWinnersTime,
	transformLeaderboard
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

// ---------------------------------------------------------------------------
// transformLeaderboard
// ---------------------------------------------------------------------------

/** @returns {import('$lib/types').LeaderboardResponse} */
function makeFullResponse() {
	return {
		week_starting: '2025-05-12T00:00:00Z',
		week_ending: '2025-05-19T00:00:00Z',
		rules_url: 'https://example.com/rules',
		categories: [
			{
				category_id: 'overall',
				label: 'Overall',
				icon: 'asset://IconTrophy',
				api_empty_message: {
					title: 'Custom empty title',
					body: 'Custom empty body',
					icon: 'asset://IconTrophy'
				},
				entries: [
					{
						username: 'alice',
						avatar_url: 'https://cdn.example.com/alice.png',
						avatar_color: 'AppRed',
						rank: 1,
						points: 3,
						rank_delta: 2,
						is_last_weeks_winner: true,
						is_current_user: null,
						metrics: [
							{ icon: 'asset://icon_collect', label: 'Collected', value: 5 },
							{ icon: 'asset://icon_drop', label: 'Dropped', value: 1 }
						]
					},
					{
						username: 'bob',
						avatar_url: 'https://cdn.example.com/bob.png',
						avatar_color: 'AppBlue',
						rank: 2,
						points: 2,
						rank_delta: -1,
						is_last_weeks_winner: false,
						is_current_user: null,
						metrics: [{ icon: 'asset://icon_destroy', label: 'Destroyed', value: 3 }]
					},
					{
						username: 'carol',
						avatar_url: 'https://cdn.example.com/carol.png',
						avatar_color: 'AppGreen',
						rank: 3,
						points: 1,
						rank_delta: 0,
						is_last_weeks_winner: null,
						is_current_user: null,
						metrics: []
					}
				]
			}
		]
	};
}

describe('transformLeaderboard', () => {
	it('transforms weekDateRange and winnersTimeLabel', () => {
		const result = transformLeaderboard(makeFullResponse());
		expect(result.weekDateRange).toBe('12 – 19 May 2025');
		expect(result.winnersTimeLabel).toBe('Monday 00:00');
	});

	it('passes through rulesUrl', () => {
		const result = transformLeaderboard(makeFullResponse());
		expect(result.rulesUrl).toBe('https://example.com/rules');
	});

	it('handles null rulesUrl', () => {
		const resp = makeFullResponse();
		resp.rules_url = null;
		expect(transformLeaderboard(resp).rulesUrl).toBeNull();
	});

	it('maps category fields correctly', () => {
		const result = transformLeaderboard(makeFullResponse());
		expect(result.categories).toHaveLength(1);

		const cat = result.categories[0];
		expect(cat.id).toBe('overall');
		expect(cat.label).toBe('Overall');
		expect(cat.iconSrc).toBe('/icons/leaderboard/trophy.png');
		expect(cat.emptyTitle).toBe('Custom empty title');
		expect(cat.emptyBody).toBe('Custom empty body');
	});

	it('applies empty-message fallbacks when api_empty_message is null', () => {
		const resp = makeFullResponse();
		resp.categories[0].api_empty_message = null;
		const cat = transformLeaderboard(resp).categories[0];
		expect(cat.emptyTitle).toBe('No activity in this category yet');
		expect(cat.emptyBody).toBe('Be the first to take the lead!');
	});

	it('applies empty-message fallback when title is null', () => {
		const resp = makeFullResponse();
		resp.categories[0].api_empty_message = { title: null, body: 'Has body', icon: null };
		const cat = transformLeaderboard(resp).categories[0];
		expect(cat.emptyTitle).toBe('No activity in this category yet');
		expect(cat.emptyBody).toBe('Has body');
	});

	it('transforms entry points as ×100 XP', () => {
		const entries = transformLeaderboard(makeFullResponse()).categories[0].entries;
		expect(entries[0].displayPoints).toBe('+300XP');
		expect(entries[1].displayPoints).toBe('+200XP');
		expect(entries[2].displayPoints).toBe('+100XP');
	});

	it('maps rank_delta to trend enum', () => {
		const entries = transformLeaderboard(makeFullResponse()).categories[0].entries;
		expect(entries[0].rankTrend).toBe('up'); // rank_delta: 2
		expect(entries[1].rankTrend).toBe('down'); // rank_delta: -1
		expect(entries[2].rankTrend).toBe('same'); // rank_delta: 0
	});

	it('formats rankLabel as #N', () => {
		const entries = transformLeaderboard(makeFullResponse()).categories[0].entries;
		expect(entries[0].rankLabel).toBe('#1');
		expect(entries[1].rankLabel).toBe('#2');
		expect(entries[2].rankLabel).toBe('#3');
	});

	it('resolves avatar colour and darkened divider', () => {
		const entries = transformLeaderboard(makeFullResponse()).categories[0].entries;
		expect(entries[0].avatarColorHex).toBe('#CF2D2D');
		expect(entries[0].avatarDividerHex).toBe(darkenColor('#CF2D2D', 0.26));
		expect(entries[1].avatarColorHex).toBe('#0692E2');
	});

	it('maps is_last_weeks_winner with null fallback to false', () => {
		const entries = transformLeaderboard(makeFullResponse()).categories[0].entries;
		expect(entries[0].isLastWeeksWinner).toBe(true);
		expect(entries[1].isLastWeeksWinner).toBe(false);
		expect(entries[2].isLastWeeksWinner).toBe(false); // null → false
	});

	it('resolves metric icons', () => {
		const metrics = transformLeaderboard(makeFullResponse()).categories[0].entries[0].metrics;
		expect(metrics).toHaveLength(2);
		expect(metrics[0].iconSrc).toBe('/icons/leaderboard/collect.png');
		expect(metrics[0].label).toBe('Collected');
		expect(metrics[0].value).toBe(5);
		expect(metrics[1].iconSrc).toBe('/icons/leaderboard/drop.png');
	});

	it('handles unknown avatar colour with fallback', () => {
		const resp = makeFullResponse();
		resp.categories[0].entries[0].avatar_color = 'UnknownColor';
		const entry = transformLeaderboard(resp).categories[0].entries[0];
		expect(entry.avatarColorHex).toBe('#EDEDEA');
	});

	it('handles unknown icon name with placeholder', () => {
		const resp = makeFullResponse();
		resp.categories[0].icon = 'asset://UnknownIcon';
		const cat = transformLeaderboard(resp).categories[0];
		expect(cat.iconSrc).toBe('/icons/leaderboard/trophy.png');
	});

	it('handles category with zero entries', () => {
		const resp = makeFullResponse();
		resp.categories[0].entries = [];
		const cat = transformLeaderboard(resp).categories[0];
		expect(cat.entries).toHaveLength(0);
	});

	it('handles multiple categories', () => {
		const resp = makeFullResponse();
		resp.categories.push({
			category_id: 'steps',
			label: 'Steps',
			icon: 'asset://icon_steps',
			api_empty_message: null,
			entries: []
		});
		const result = transformLeaderboard(resp);
		expect(result.categories).toHaveLength(2);
		expect(result.categories[1].id).toBe('steps');
		expect(result.categories[1].iconSrc).toBe('/icons/leaderboard/steps.png');
		expect(result.categories[1].emptyTitle).toBe('No activity in this category yet');
	});
});
