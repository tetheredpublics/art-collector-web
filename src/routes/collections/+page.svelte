<script>
    import CollectionItem from "../../components/collections/CollectionItem.svelte";
    let collections = [
        {
            "name": "The Met 🇺🇸",
            "description": "The Metropolitan Museum of Art, or The Met, is the largest art museum in the United States. Located in New York City, it houses over two million works spanning 5,000 years of history – from Ancient Egyptian artifacts to European masterpieces and global modern art. Its collection reflects the breadth and depth of human creativity across cultures and time.",
            "image_src": "https://d3gm6vhzqyd5xu.cloudfront.net/assets/8bit-met.png",
            "image_alt": "Art Collector 8-bit Met building",
            "url": "https://www.metmuseum.org/",
        },
        {
            "name": "Rijksmuseum 🇳🇱",
            "description": "The Rijksmuseum in Amsterdam is the Netherlands' premier art and history museum. Known for its Dutch Golden Age masterpieces, including Rembrandt's \"The Night Watch,\" it spans over 800 years of art history with a vast collection of paintings, sculptures, and historical artifacts.",
            "image_src": "https://d3gm6vhzqyd5xu.cloudfront.net/assets/rijks-award.png",
            "image_alt": "Art Collector 8-bit Rijksmuseum building",
            "url": "https://www.rijksmuseum.nl/en",
        },
        {
            "name": "Art Institute of Chicago 🇺🇸",
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
            <p class="text-xl/loose text-gray-800 pb-4">Leveraging open-access data, Art Collector grants you access to the extensive archives of the world’s most renowned art institutions. Discover thousands of works, ranging from celebrated masterpieces to hidden gems rarely seen in gallery halls.</p>
        </div>
        <div class="space-y-4 mb-8">
            {#each collections as collection}
                <CollectionItem 
                    title={collection.name} 
                    body={collection.description}
                    imageSrc={collection.image_src}
                    imageAlt={collection.image_alt}
                    learnMoreUrl={collection.url}
                />
                <!-- <div class="max-w-4xl mx-4 md:mx-auto border-b-appGreyBorder border-b-2"></div> -->
            {/each}
        </div>
        <div class="mb-8">
            <p class="text-base/loose font-bold text-gray-600 px-1 md:px-0 mb-2">We're always on the look-out for more art to include in the app. Don't hesitate to reach out if you know of any great art datasets we might love!</p>
        </div>
    </div>
</main>