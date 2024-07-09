<script>
    /** @type {object} */
    export let item
</script>


<div class="p-8 space-y-1 text-center md:text-left">
    <p class="text-2xl mb-4">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</p>
    <h3 class="text-black text-base/loose font-bold italic">{item.headline}</h3>
    <p class="text-md/loose font-bold italic text-gray-600 pb-4 md:min-h-32">
        "{item.body}"
    </p>
    
    <p class="text-sm/loose font-bold text-gray-600 block">– {item.username}, {item.source}</p>
</div>
