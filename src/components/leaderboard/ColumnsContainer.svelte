<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="columns-container" role="region" aria-label="Leaderboard categories" tabindex="0">
	<slot />
</div>

<style>
	.columns-container {
		display: flex;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		gap: 1rem;
		padding: 0 1rem 1rem;
	}
</style>
