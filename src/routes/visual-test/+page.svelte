<script>
	import EmptyState from '../../components/leaderboard/EmptyState.svelte';
	import LoadingState from '../../components/leaderboard/LoadingState.svelte';
	import ErrorState from '../../components/leaderboard/ErrorState.svelte';
	import EntryCard from '../../components/leaderboard/EntryCard.svelte';

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
</div>
