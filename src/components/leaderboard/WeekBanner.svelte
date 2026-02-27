<script>
	/** @type {string} */
	export let weekDateRange;
	/** @type {string} */
	export let winnersTimeLabel;
	/** @type {string | null} */
	export let rulesUrl = null;
</script>

<div class="flex flex-wrap items-start justify-between gap-2 px-4 py-4 md:px-6">
	<div>
		<h2 class="text-xl font-black text-gray-800">This Week</h2>
		<p class="text-sm text-gray-500 font-semibold">{weekDateRange}</p>
	</div>

	<div class="flex items-center gap-2">
		<span
			class="inline-flex items-center gap-1.5 bg-appYellow text-gray-800 text-xs font-bold rounded-full px-3 py-1"
		>
			<img src="/icons/leaderboard/trophy.svg" alt="" class="size-4" aria-hidden="true" />
			<span>Weekly Winners</span>
			<span class="text-gray-600">{winnersTimeLabel}</span>
		</span>

		{#if rulesUrl}
			<a
				href={rulesUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 hover:text-gray-600 transition-colors"
				aria-label="Leaderboard rules"
			>
				<img src="/icons/info.svg" alt="Rules" class="size-5" />
			</a>
		{/if}
	</div>
</div>
