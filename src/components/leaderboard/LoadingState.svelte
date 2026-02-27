<script>
	/** @type {string} */
	export let message = 'Loading leaderboard…';
</script>

<div class="flex flex-col items-center justify-center py-24 text-gray-500">
	<div class="spinner mb-4" aria-hidden="true"></div>
	<p class="text-sm font-semibold">{message}</p>
</div>

<style>
	.spinner {
		width: 32px;
		height: 32px;
		border: 3px solid #babab6;
		border-top-color: #0692e2;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
