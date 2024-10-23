<script>
	import SEO from '../components/SEO.svelte';
	import DownloadHero from '../components/DownloadHero.svelte';
	import InfoCard from '../components/InfoCard.svelte';
	import InfoFlat from '../components/InfoFlat.svelte';
	import AppStats from '../components/AppStats.svelte';
	import AndroidDownloadButton from '../components/AndroidDownloadButton.svelte';
	import IosDownloadButton from '../components/IOSDownloadButton.svelte';
	import Testimonial from '../components/Testimonial.svelte';
	import { STRINGS } from '$lib';

	export let data;
</script>

<SEO title="Home" />

<main>
	<div class="space-y-8">
		<DownloadHero phoneHeight="456px" showControls={false} />
		<div class="bg-appBeige p-4 py-8 space-y-4 text-center border-t-2 border-b-2 border-[#ADADA9]">
			<div class="px-4 md:px-0">
				<h2 class="text-2xl font-black text-gray-800 mb-2">{STRINGS.appstats.title}</h2>
				<p class="text-lg text-gray-600 font-bold mb-4 max-w-md mx-auto">
					{STRINGS.appstats.body}
				</p>
			</div>
			<div class="flex justify-around items-center max-w-xl mx-auto">
				<AppStats
					value={data.appstats.collected}
					label="Collected"
					imageSrc="./icons/collect.png"
					imageAlt="Art Collector App Collect Art Icon"
				/>
				<AppStats
					value={data.appstats.dropped}
					label="Dropped"
					imageSrc="./icons/drop.png"
					imageAlt="Art Collector App Drop Art Icon"
				/>
				<AppStats
					value={data.appstats.destroyed}
					label="Destroyed"
					imageSrc="./icons/destroy.png"
					imageAlt="Art Collector App Destroy Art Icon"
				/>
			</div>
		</div>
		<div class="space-y-4">
			<InfoFlat
				title={STRINGS.homeInfo2.title}
				body={STRINGS.homeInfo2.body}
				imageSrc="./images/marketer.png"
				imageAlt={STRINGS.homeInfo2.imageAlt}
				ctaLabel="Recent Highlights"
				ctaUrl="/news/highlights"
			/>
			<div class="max-w-4xl mx-4 md:mx-auto border-b-[#BABAB6] border-b-2"></div>
			<InfoFlat
				title={STRINGS.homeInfo3.title}
				body={STRINGS.homeInfo3.body}
				imageSrc="./images/buildings@0.5x.png"
				imageAlt={STRINGS.homeInfo3.imageAlt}
				ctaLabel="Learn more"
				ctaUrl="/collections"
			/>
			<div class="max-w-4xl mx-4 md:mx-auto border-b-[#BABAB6] border-b-2"></div>
			<InfoFlat
				title={STRINGS.homeInfo1.title}
				body={STRINGS.homeInfo1.body}
				imageSrc="./images/artblock@0.5x.png"
				imageAlt={STRINGS.homeInfo1.imageAlt}
				ctaLabel="Join the Community"
				ctaUrl="/download"
			/>
		</div>
		<div class="bg-appBeige px-1 md:px-4 py-4 pb-16 space-y-4 border-y-2 border-[#ADADA9]">
			<div class="md:max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 col-auto mx-auto divide-y divide-dashed divide-gray-400 md:divide-none">
				{#each STRINGS.testimonials as testimonial}
				<Testimonial item={testimonial} />
				{/each}
			</div>
		</div>
	</div>
</main>
