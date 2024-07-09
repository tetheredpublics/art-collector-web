<script>
    import CollectionItem from "../../components/collections/CollectionItem.svelte";
    let collections = [
        {
            "name": "Rijksmuseum",
            "description": "The Rijksmuseum in Amsterdam is the Netherlands' premier art and history museum. Known for its Dutch Golden Age masterpieces, including Rembrandt's \"The Night Watch,\" it spans over 800 years of art history with a vast collection of paintings, sculptures, and historical artifacts.",
            "image_src": "https://d3gm6vhzqyd5xu.cloudfront.net/assets/rijks-award.png",
            "image_alt": "Art Collector 8-bit Rijksmuseum building",
            "url": "https://www.rijksmuseum.nl/en",
        },
        {
            "name": "Art Institute of Chicago",
            "description": "The Art Institute of Chicago, is one of the largest and oldest art museums in the U.S. It features a vast collection from ancient to modern art, including iconic works like Seurat's \"A Sunday on La Grande Jatte\" and Wood's \"American Gothic,\" along with extensive collections of African, Asian, and Ancient art.",
            "image_src": "https://d3gm6vhzqyd5xu.cloudfront.net/assets/chicago-award.png",
            "image_alt": "Art Collector 8-bit Rijksmuseum building",
            "url": "https://www.artic.edu/",
        }
    ]

</script>

<main class="pb-32 pt-16">
    <div class="p-4 max-w-4xl mx-auto">
        <div class="mb-8">
            <h1 class="text-4xl font-black text-gray-800 mb-8">Our Collections</h1>
            <p class="text-xl/loose text-gray-800 pb-4">Embark on a unique journey where each step immerses you deeper into the world of art. With Art Collector, build your own virtual collection with masterpieces from world-renowned institutions. Collect, curate, trade, and even decide the fate of great art. You’re the curator, your choices shape this world.</p>
        </div>
        <div class="space-y-8">
            {#each collections as collection}
                <CollectionItem 
                    title={collection.name} 
                    body={collection.description}
                    imageSrc={collection.image_src}
                    imageAlt={collection.image_alt}
                    learnMoreUrl={collection.url}
                />
                <!-- <div class="max-w-4xl mx-4 md:mx-auto border-b-[#BABAB6] border-b-2"></div> -->
            {/each}
        </div>
    </div>
</main>