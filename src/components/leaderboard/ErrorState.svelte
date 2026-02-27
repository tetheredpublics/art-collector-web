<script>
	import { createEventDispatcher } from 'svelte';

	/** @type {string} */
	export let message = 'Something went wrong. Please try again.';

	const dispatch = createEventDispatcher();

	function handleRetry() {
		dispatch('retry');
	}
</script>

<div class="flex flex-col items-center justify-center py-24 text-center px-4">
	<p class="text-gray-600 text-sm font-semibold mb-4">{message}</p>
	<button
		on:click={handleRetry}
		class="bg-primary text-white font-bold rounded-md px-6 py-2 hover:opacity-90 transition-opacity"
	>
		Retry
	</button>
</div>
