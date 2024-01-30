<script>
	import DownloadHero from "../components/DownloadHero.svelte";
	import InfoCard from "../components/InfoCard.svelte";
</script>
<main class="pb-16">
	<div class="space-y-16 mb-16">
		<DownloadHero />
		<div class="bg-[#EADFD0] py-12 space-y-4 text-center border-t-2 border-b-2 border-[#ADADA9]">
			<div>
				<h2 class="text-2xl font-bold">You Call the Shots... How Will You Play?</h2>
				<p class="text-lg">Collect, curate, trade, and even decide the fate of great art.</p>
			</div>
			<div class="flex justify-around items-center max-w-xl mx-auto">
				<div class="p-6 space-y-2 text-center">
					<img class="size-16 mx-auto" src="./icons/collect.png" alt="x" />
					<div class="space-y-0">
						<p class="text-2xl font-bold text-center">564</p>
						<p class="text-sm">Collected</p>
					</div>
				</div>
				<div class="p-6 space-y-2 text-center">
					<img class="size-16 mx-auto" src="./icons/drop.png" alt="x" />
					<div class="space-y-0">
						<p class="text-2xl font-bold text-center">123</p>
						<p class="text-sm">Dropped</p>
					</div>
				</div>
				<div class="p-6 space-y-2 text-center">
					<img class="size-16 mx-auto" src="./icons/destroy.png" alt="x" />
					<div class="space-y-0">
						<p class="text-2xl font-bold text-center">123</p>
						<p class="text-sm">Destroyed</p>
					</div>
				</div>
			</div>
		</div>
		<InfoCard 
			title="Step into Art with Art Collector"
			body="Embark on a unique journey where each step immerses you deeper into the world of art. With Art Collector, build your own virtual collection with masterpieces from world-renowned institutions. Collect, curate, trade, and even decide the fate of great art. You’re the curator, your choices shape this world."
			imageSrc="./images/marketer-color.png"
			imageAlt="Who'll love Art Collector Infographic"
		/>
	</div>
</main>