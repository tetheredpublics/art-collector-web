import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import EntryCard from '../EntryCard.svelte';

function makeEntry(overrides = {}) {
	return /** @type {any} */ ({
		username: 'xellon',
		avatarUrl: 'https://example.com/avatar.png',
		avatarColorHex: '#CF2D2D',
		avatarDividerHex: '#992121',
		rank: 1,
		rankLabel: '#1',
		displayPoints: '+300XP',
		rankTrend: 'up',
		isLastWeeksWinner: false,
		metrics: [
			{ iconSrc: '/icons/collect.png', label: 'Collected', value: 3 },
			{ iconSrc: '/icons/drop.png', label: 'Dropped', value: 0 },
			{ iconSrc: '/icons/destroy.png', label: 'Destroyed', value: 3 }
		],
		...overrides
	});
}

describe('EntryCard', () => {
	it('renders rank 1 entry with gold left border', () => {
		const { container } = render(EntryCard, { props: { entry: makeEntry() } });
		expect(container.innerHTML).toMatchSnapshot();
		const card = container.querySelector('div');
		expect(card?.className).toContain('border-appYellow');
	});

	it('renders rank 2 entry with silver left border', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ rank: 2, rankLabel: '#2' }) }
		});
		expect(container.innerHTML).toMatchSnapshot();
		const card = container.querySelector('div');
		expect(card?.className).toContain('border-gray-300');
	});

	it('renders rank 3 entry with bronze left border', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ rank: 3, rankLabel: '#3' }) }
		});
		const card = container.querySelector('div');
		expect(card?.className).toContain('border-amber-600');
	});

	it('renders rank 4+ entry without accent border', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ rank: 4, rankLabel: '#4' }) }
		});
		const card = container.querySelector('div');
		expect(card?.className).not.toContain('border-l-4');
	});

	it('shows green up arrow for positive rank trend', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ rankTrend: 'up' }) }
		});
		const arrow = container.querySelector('[aria-label="Rank moved up"]');
		expect(arrow).toBeTruthy();
		expect(arrow?.textContent).toBe('▲');
		expect(arrow?.className).toContain('text-green-600');
	});

	it('shows red down arrow for negative rank trend', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ rankTrend: 'down' }) }
		});
		const arrow = container.querySelector('[aria-label="Rank moved down"]');
		expect(arrow).toBeTruthy();
		expect(arrow?.textContent).toBe('▼');
		expect(arrow?.className).toContain('text-red-500');
	});

	it('shows grey dash for unchanged rank', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ rankTrend: 'same' }) }
		});
		const dash = container.querySelector('[aria-label="Rank unchanged"]');
		expect(dash).toBeTruthy();
		expect(dash?.textContent).toBe('—');
		expect(dash?.className).toContain('text-gray-400');
	});

	it('renders last week winner icon when isLastWeeksWinner and categoryIconSrc provided', () => {
		const { container } = render(EntryCard, {
			props: {
				entry: makeEntry({ isLastWeeksWinner: true }),
				categoryIconSrc: '/icons/leaderboard/trophy.svg'
			}
		});
		expect(container.innerHTML).toMatchSnapshot();
		const winnerIcon = container.querySelector('img[alt="Last week\'s winner"]');
		expect(winnerIcon).toBeTruthy();
	});

	it('does not render winner icon when isLastWeeksWinner is false', () => {
		const { container } = render(EntryCard, {
			props: {
				entry: makeEntry({ isLastWeeksWinner: false }),
				categoryIconSrc: '/icons/leaderboard/trophy.svg'
			}
		});
		const winnerIcon = container.querySelector('img[alt="Last week\'s winner"]');
		expect(winnerIcon).toBeNull();
	});

	it('does not render winner icon when categoryIconSrc is missing', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ isLastWeeksWinner: true }) }
		});
		const winnerIcon = container.querySelector('img[alt="Last week\'s winner"]');
		expect(winnerIcon).toBeNull();
	});

	it('renders all metrics', () => {
		const { container } = render(EntryCard, { props: { entry: makeEntry() } });
		const metricIcons = container.querySelectorAll('.size-4');
		expect(metricIcons.length).toBe(3);
	});

	it('renders entry with empty metrics', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ metrics: [] }) }
		});
		expect(container.innerHTML).toMatchSnapshot();
		const metricIcons = container.querySelectorAll('.size-4');
		expect(metricIcons.length).toBe(0);
	});

	it('displays username and points', () => {
		const { getByText } = render(EntryCard, {
			props: { entry: makeEntry({ username: 'artfan42', displayPoints: '+500XP' }) }
		});
		expect(getByText('artfan42')).toBeTruthy();
		expect(getByText('+500XP')).toBeTruthy();
	});

	it('applies avatar color as background', () => {
		const { container } = render(EntryCard, {
			props: { entry: makeEntry({ avatarColorHex: '#0692E2', avatarDividerHex: '#046CB0' }) }
		});
		const avatarWrapper = container.querySelector('.size-12.rounded-md');
		const style = avatarWrapper?.getAttribute('style') ?? '';
		expect(style).toContain('background-color');
		expect(style).toContain('border-right');
	});
});
