<script>
    let heroData = [
        {
            image: "./images/preview/3.png",
            title: "Collector and Curator",
            subtitle: "Build your own virtual collection with great art from world-renowned institutions",
            alt: "User art collection"
        },
        {
            image: "./images/preview/2.png",
            title: "Discover Art and Stay Fit",
            subtitle: "Each step you take brings you closer to uncovering another masterpiece",
            alt: "Progress page with 990 steps until next artwork. Pending artworks waiting"
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
        let unbounded = heroIndex + inc;
        if (unbounded > heroData.length - 1) {
            return 0;
        }
        if (unbounded < 0) {
            return heroData.length - 1;
        }
        return unbounded;
	}

	function nextHero() {
		heroIndex = incrementHeroIndex(1);
	}

    function prevHero() {
        heroIndex = incrementHeroIndex(-1);
    }

</script>
<main class="landscape-background center" style="background-image: url('./images/landscape-clear-sm.png');">
    <div class="flex sm:container justify-center sm:mx-auto p-4">
        <button on:click={prevHero} class="flex-none"><img class="size-8" alt="navigate back" src="./icons/chevron-left.svg"/></button>
        <div class="flex flex-wrap-reverse justify-center items-center p-4 md:space-x-4">
            <div class="flex-none relative p-4">
                <img alt="App preview: {hero.alt}"
                    class="h-[496px] border-8 border-black rounded-3xl shadow-md" 
                    src={hero.image}
                    on:click={nextHero} />
            </div>
            <div class="max-w-md p-4 space-y-2 text-center md:text-left">
                <div class="space-y-1">
                    <h1 class="text-3xl font-bold">{hero.title}</h1>
                    <p class="text-xl">{hero.subtitle}</p>
                </div>

                <div class="flex space-x-2 py-4 justify-center md:justify-start">
                    <img alt="Download on the App Store" class="h-10" src="./images/download/app-store-badge.svg">
                    <img alt="Get it on Google Play" class="h-10" src="./images/download/google-play-badge.png">
                </div>
            </div>
        </div>

        <button on:click={nextHero} class="flex-none"><img class="size-8" alt="navigate next" src="./icons/chevron-right.svg"/></button>
    </div>
</main>