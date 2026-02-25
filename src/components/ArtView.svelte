<script lang="ts">
	import type { SharedActivity, SharedArtworkItem, SharedCollector } from '$lib/types';
	import ArtLabelView from './ArtLabelView.svelte';
	import CreditBanner from './CreditBanner.svelte';
	import MicroCta from './MicroCta.svelte';

	export let item: SharedArtworkItem | null = null;
	export let collector: SharedCollector | null = null;
	export let activity: SharedActivity | null = null;
	export let fixedHeightImages: boolean = false;
	export let normalizeImageAspect: boolean = false;
</script>

<div class="flex flex-col space-y-4 md:w-[600px] max-w-full mx-auto pb-4">
	{#if item?.image_url}
		<div
			class={`w-[600px] max-w-full bg-[#EDEDEA] flex items-center justify-center md:rounded-md ${
				normalizeImageAspect ? 'aspect-[4/3] p-3' : ''
			}`}
		>
			<img
				src={item.image_url}
				alt={item.title ?? 'Artwork image'}
				class={normalizeImageAspect
					? 'h-full w-full object-contain'
					: `${fixedHeightImages ? 'h-[364px]' : 'max-h-[364px]'} w-auto object-contain`}
			/>
		</div>
	{:else}
		<div
			class={`w-[600px] max-w-full bg-[#EDEDEA] flex items-center justify-center ${
				normalizeImageAspect ? 'aspect-[4/3]' : 'h-[400px]'
			}`}
		>
			<span class="text-gray-500">No image available</span>
		</div>
	{/if}

	<!-- Credit Banner - only show if there's an activity -->
	{#if activity}
		<CreditBanner
			username={activity.collector?.username}
			avatarUrl={activity.collector?.avatar_url ?? undefined}
			avatarColor={activity.collector?.avatar_color ?? undefined}
			timestamp={activity.time ?? undefined}
			actionLabel={activity.action_label ?? undefined}
			actionIcon={activity.action_icon ?? undefined}
		/>
	{/if}

	<!-- Art Label View -->
	<ArtLabelView
		title={item?.title ?? undefined}
		year={item?.year != null ? String(item.year) : undefined}
		artist={item?.artist ?? undefined}
		medium={item?.medium ?? undefined}
	/>

	{#if collector}
		<MicroCta friend={collector.username} />
	{/if}
</div>
