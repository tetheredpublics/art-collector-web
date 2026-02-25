<script>
	import ArtView from '../../../components/ArtView.svelte';

	export let data;
</script>

<main class="px-4 py-8 md:px-8 md:py-16 xl:px-16">
	<div class="mx-auto max-w-6xl">
		<div class="mb-8 md:mb-10">
			<h1 class="text-3xl md:text-4xl font-black text-gray-800 mb-3">Recent Highlights</h1>
			<p class="text-base md:text-lg text-gray-600">
				See the latest standout artworks discovered and collected in Art Collector.
			</p>
		</div>
		<div
			class="max-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 col-auto mx-auto"
		>
			{#each data.highlights as newsItem}
				<div
					class="bg-white md:p-4 md:rounded-xl shadow-sm pb-6 border-[0.5px] md:border-appGreyBorder"
				>
					<ArtView
						item={newsItem.item}
						activity={{
							collector: {
								username: newsItem.username,
								avatar_color: newsItem.avatar_color,
								avatar_url: newsItem.avatar_url
							},
							time: newsItem.time,
							action_label: newsItem.activity.label,
							action_icon: newsItem.activity.icon
						}}
						coverImages={true}
					/>
				</div>
			{/each}
		</div>
	</div>
</main>
