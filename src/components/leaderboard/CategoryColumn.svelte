<script>
	import EntryCard from './EntryCard.svelte';
	import EmptyState from './EmptyState.svelte';

	/**
	 * @typedef {Object} MetricDisplay
	 * @property {string} iconSrc
	 * @property {string} label
	 * @property {number} value
	 */

	/**
	 * @typedef {Object} EntryDisplay
	 * @property {string} username
	 * @property {string} avatarUrl
	 * @property {string} avatarColorHex
	 * @property {string} avatarDividerHex
	 * @property {number} rank
	 * @property {string} rankLabel
	 * @property {string} displayPoints
	 * @property {'up' | 'down' | 'same'} rankTrend
	 * @property {boolean} isLastWeeksWinner
	 * @property {MetricDisplay[]} metrics
	 */

	/**
	 * @typedef {Object} CategoryDisplay
	 * @property {string} id
	 * @property {string} label
	 * @property {string} iconSrc
	 * @property {EntryDisplay[]} entries
	 * @property {string} emptyTitle
	 * @property {string} emptyBody
	 */

	/** @type {CategoryDisplay} */
	export let category;
</script>

<div
	class="category-column flex flex-col bg-white rounded-lg border border-appGreyBorder overflow-hidden"
	role="region"
	aria-label="{category.label} leaderboard"
>
	<!-- Sticky column header -->
	<div
		class="column-header sticky top-0 z-10 bg-white border-b border-appGreyBorder flex items-center gap-2 px-3 py-2"
	>
		<img src={category.iconSrc} alt="" class="size-8" aria-hidden="true" />
		<span class="text-sm font-bold text-gray-700">{category.label}</span>
	</div>

	<!-- Scrollable entry list -->
	<div class="column-body flex-1 overflow-y-auto p-2 space-y-2">
		{#if category.entries.length > 0}
			<ol class="space-y-2" aria-label="{category.label} rankings">
				{#each category.entries as entry (entry.rank)}
					<li>
						<EntryCard {entry} categoryIconSrc={category.iconSrc} />
					</li>
				{/each}
			</ol>
		{:else}
			<EmptyState title={category.emptyTitle} body={category.emptyBody} />
		{/if}
	</div>
</div>

<style>
	.category-column {
		flex: 0 0 85vw;
		scroll-snap-align: start;
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
</style>
