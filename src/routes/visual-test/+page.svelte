<script>
	import EmptyState from '../../components/leaderboard/EmptyState.svelte';
	import LoadingState from '../../components/leaderboard/LoadingState.svelte';
	import ErrorState from '../../components/leaderboard/ErrorState.svelte';
	import EntryCard from '../../components/leaderboard/EntryCard.svelte';
	import WeekBanner from '../../components/leaderboard/WeekBanner.svelte';
	import CategoryColumn from '../../components/leaderboard/CategoryColumn.svelte';
	import ColumnsContainer from '../../components/leaderboard/ColumnsContainer.svelte';

	/**
	 * @typedef {'up' | 'down' | 'same'} RankTrend
	 */

	/** @type {RankTrend} */
	const UP = 'up';
	/** @type {RankTrend} */
	const DOWN = 'down';
	/** @type {RankTrend} */
	const SAME = 'same';

	const rank1Entry = {
		username: 'xellon',
		avatarUrl: '',
		avatarColorHex: '#CF2D2D',
		avatarDividerHex: '#992121',
		rank: 1,
		rankLabel: '#1',
		displayPoints: '+300XP',
		rankTrend: UP,
		isLastWeeksWinner: true,
		metrics: [
			{ iconSrc: '/icons/collect.png', label: 'Collected', value: 3 },
			{ iconSrc: '/icons/drop.png', label: 'Dropped', value: 0 },
			{ iconSrc: '/icons/destroy.png', label: 'Destroyed', value: 3 }
		]
	};

	const rank2Entry = {
		...rank1Entry,
		username: 'artlover99',
		avatarColorHex: '#0692E2',
		avatarDividerHex: '#046CB0',
		rank: 2,
		rankLabel: '#2',
		displayPoints: '+200XP',
		rankTrend: DOWN,
		isLastWeeksWinner: false
	};

	const rank3Entry = {
		...rank1Entry,
		username: 'collector_x',
		avatarColorHex: '#00D084',
		avatarDividerHex: '#009961',
		rank: 3,
		rankLabel: '#3',
		displayPoints: '+100XP',
		rankTrend: SAME,
		isLastWeeksWinner: false
	};

	const rank5Entry = {
		...rank1Entry,
		username: 'newbie42',
		avatarColorHex: '#C06BE8',
		avatarDividerHex: '#8E4FAC',
		rank: 5,
		rankLabel: '#5',
		displayPoints: '+50XP',
		rankTrend: SAME,
		isLastWeeksWinner: false
	};

	const noMetricsEntry = {
		...rank1Entry,
		rank: 4,
		rankLabel: '#4',
		metrics: [],
		isLastWeeksWinner: false
	};

	const mockCategory = {
		id: 'overall',
		label: 'Overall',
		iconSrc: '/icons/leaderboard/trophy.svg',
		entries: [rank1Entry, rank2Entry, rank3Entry],
		emptyTitle: 'No activity yet',
		emptyBody: 'Be the first to take the lead!'
	};

	const emptyCategory = {
		id: 'art',
		label: 'Art',
		iconSrc: '/icons/collect.png',
		entries: [],
		emptyTitle: 'No art activity yet',
		emptyBody: 'Start collecting to appear here!'
	};

	const stepsCategory = {
		id: 'steps',
		label: 'Steps',
		iconSrc: '/icons/shoe-print.png',
		entries: [rank1Entry, rank2Entry],
		emptyTitle: '',
		emptyBody: ''
	};
</script>

<div class="bg-appBackground p-8 space-y-12 max-w-lg mx-auto font-main">
	<section data-testid="empty-state-default">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">EmptyState — default</h2>
		<EmptyState />
	</section>

	<section data-testid="empty-state-custom">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">EmptyState — custom</h2>
		<EmptyState title="No art collected yet" body="Start walking to discover art!" />
	</section>

	<section data-testid="loading-state">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">LoadingState</h2>
		<LoadingState />
	</section>

	<section data-testid="error-state">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">ErrorState</h2>
		<ErrorState />
	</section>

	<section data-testid="entry-card-rank1">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">
			EntryCard — rank 1 (gold, up, winner)
		</h2>
		<EntryCard entry={rank1Entry} categoryIconSrc="/icons/leaderboard/trophy.svg" />
	</section>

	<section data-testid="entry-card-rank2">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">
			EntryCard — rank 2 (silver, down)
		</h2>
		<EntryCard entry={rank2Entry} />
	</section>

	<section data-testid="entry-card-rank3">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">
			EntryCard — rank 3 (bronze, same)
		</h2>
		<EntryCard entry={rank3Entry} />
	</section>

	<section data-testid="entry-card-rank5">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">EntryCard — rank 5 (no accent)</h2>
		<EntryCard entry={rank5Entry} />
	</section>

	<section data-testid="entry-card-no-metrics">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">EntryCard — no metrics</h2>
		<EntryCard entry={noMetricsEntry} />
	</section>

	<section data-testid="week-banner">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">WeekBanner</h2>
		<div class="border border-appGreyBorder rounded-lg overflow-hidden bg-white">
			<WeekBanner
				weekDateRange="12 – 18 May 2025"
				winnersTimeLabel="Friday 00:00"
				rulesUrl="https://example.com/rules"
			/>
		</div>
	</section>

	<section data-testid="week-banner-no-rules">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">WeekBanner — no rules link</h2>
		<div class="border border-appGreyBorder rounded-lg overflow-hidden bg-white">
			<WeekBanner weekDateRange="28 Apr – 4 May 2025" winnersTimeLabel="Monday 00:00" />
		</div>
	</section>

	<section data-testid="category-column-with-entries">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">CategoryColumn — with entries</h2>
		<div style="width: 320px; height: 500px;">
			<CategoryColumn category={mockCategory} />
		</div>
	</section>

	<section data-testid="category-column-empty">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase">CategoryColumn — empty</h2>
		<div style="width: 320px; height: 400px;">
			<CategoryColumn category={emptyCategory} />
		</div>
	</section>
</div>

<div class="bg-appBackground p-4 font-main">
	<section data-testid="columns-container">
		<h2 class="text-xs font-bold text-gray-400 mb-2 uppercase px-4">
			ColumnsContainer — multi-column layout
		</h2>
		<ColumnsContainer>
			<CategoryColumn category={mockCategory} />
			<CategoryColumn category={emptyCategory} />
			<CategoryColumn category={stepsCategory} />
		</ColumnsContainer>
	</section>
</div>
