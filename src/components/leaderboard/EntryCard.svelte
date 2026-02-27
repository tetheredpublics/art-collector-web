<script>
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

	/** @type {EntryDisplay} */
	export let entry;

	/** @type {string | undefined} */
	export let categoryIconSrc = undefined;

	/** @param {number} rank */
	function topThreeClass(rank) {
		if (rank === 1) return 'border-l-4 border-appYellow';
		if (rank === 2) return 'border-l-4 border-gray-300';
		if (rank === 3) return 'border-l-4 border-amber-600';
		return '';
	}
</script>

<div
	class="bg-white border border-appGreyBorder rounded-lg p-3 flex items-start gap-3 hover:shadow-md transition-shadow {topThreeClass(
		entry.rank
	)}"
>
	<!-- Avatar zone -->
	<div class="flex-shrink-0">
		<div
			class="size-12 rounded-md overflow-hidden relative"
			style="background-color: {entry.avatarColorHex}; border-right: 3px solid {entry.avatarDividerHex};"
		>
			<img
				src={entry.avatarUrl}
				alt="{entry.username}'s avatar"
				class="size-12 object-cover"
				loading="lazy"
			/>
		</div>
	</div>

	<!-- Content zone -->
	<div class="flex-1 min-w-0">
		<div class="flex items-baseline justify-between gap-1">
			<span class="text-sm font-bold text-gray-800 truncate">{entry.username}</span>
			<span class="text-xs font-semibold text-gray-500 flex-shrink-0">{entry.displayPoints}</span>
		</div>

		{#if entry.metrics && entry.metrics.length > 0}
			<div class="flex gap-3 mt-1">
				{#each entry.metrics as metric}
					<div class="flex items-center gap-1" title={metric.label}>
						<img src={metric.iconSrc} alt={metric.label} class="size-4" />
						<span class="text-xs text-gray-600">{metric.value}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Rank zone -->
	<div class="flex flex-col items-center flex-shrink-0 ml-1">
		{#if entry.rankTrend === 'up'}
			<span class="text-xs text-green-600" aria-label="Rank moved up">▲</span>
		{:else if entry.rankTrend === 'down'}
			<span class="text-xs text-red-500" aria-label="Rank moved down">▼</span>
		{:else}
			<span class="text-xs text-gray-400" aria-label="Rank unchanged">—</span>
		{/if}

		<span class="text-sm font-black text-gray-800">{entry.rankLabel}</span>

		{#if entry.isLastWeeksWinner && categoryIconSrc}
			<div
				class="mt-0.5 size-5 rounded-full flex items-center justify-center"
				style="background-color: rgba(237, 216, 83, 0.25); box-shadow: 0 0 0 2px #EDD853;"
			>
				<img src={categoryIconSrc} alt="Last week's winner" class="size-3" />
			</div>
		{/if}
	</div>
</div>
