<script>
    import AndroidDownloadButton from "./AndroidDownloadButton.svelte";
	import IosDownloadButton from "./IOSDownloadButton.svelte";
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    /** @type {string} */
    export let phoneHeight = "496px";
    /** @type {boolean} */
    export let showControls = true;
    
    let heroData = [
        {
            image: "./images/preview/4.png",
            title: "Discover Art and Stay Fit",
            subtitle: "Each step you take brings you closer to uncovering another masterpiece",
            alt: "Progress page with 990 steps until next artwork. Pending artworks waiting"
        },
        {
            image: "./images/preview/3.png",
            title: "Collect Great Art",
            subtitle: "Build your own virtual collection with great art from world-renowned institutions",
            alt: "User art collection"
        },
        {
            image: "./images/preview/1.png",
            title: "You Call the Shots",
            subtitle: "Collect, curate, trade, and even decide the fate of great art.",
            alt: "Discovered new item, collect, drop or destroy artwork"
        }
    ]
    let heroIndex = 0;
    $: hero = heroData[heroIndex];
    
    /**
	 * @param {number} inc
	 */
     function incrementHeroIndex(inc) {
        heroIndex = ((heroIndex + inc + heroData.length) % heroData.length);
    }

	function nextHero() {
		heroIndex = incrementHeroIndex(1);
	}

    function prevHero() {
        heroIndex = incrementHeroIndex(-1);
    }

    function start() {
        interval = setInterval(nextHero, 4000);
        return () => clearInterval(interval);
    }
    let interval;
    
    onMount(start);

</script>
<div class="flex xs:container justify-center sm:mx-auto p-4">
    {#if showControls}
    <button on:click={prevHero} class="flex-none"><img class="size-8" alt="navigate back" src="/icons/chevron-left.svg"/></button>
    {/if}
    <div class="flex flex-wrap-reverse justify-center items-center py-4 sm:px-4 md:space-x-8">
        <div class="flex-none py-4 sm:px-4">
            <img 
                alt="App preview: {hero.alt}"
                style="max-height: {phoneHeight}"
                class="border-8 border-black rounded-3xl shadow-md" 
                src={hero.image}
            />
        </div>
        <div class="max-w-md py-4 sm:px-4 space-y-8 text-center md:text-left">
            <div class="space-y-4">
                <img 
                    class="block mx-auto md:mx-0 size-32 bg-white rounded-xl border-2 border-black/25" 
                    alt="Art Collector Logo" 
                    src="./images/logo@0.25x.png"
                />

                <div class="space-y-2">
                    <h1 class="text-3xl font-bold text-black">{hero.title}</h1>
                    <p class="text-xl text-gray-800">{hero.subtitle}</p>
                </div>
            </div>

            <div class="flex space-x-2 justify-center md:justify-start">
                <IosDownloadButton/>
                <AndroidDownloadButton/>
            </div>
        </div>
    </div>
    {#if showControls}
    <button on:click={nextHero} class="flex-none"><img class="size-8" alt="navigate next" src="./icons/chevron-right.svg"/></button>
    {/if}
</div>