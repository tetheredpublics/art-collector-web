<script>
    /** @type {string} */
    export let title
    /** @type {string} */
    export let body
    /** @type {string} */
    export let imageSrc
    /** @type {string} */
    export let imageAlt

</script>

<div class="flex flex-wrap md:flex-nowrap max-w-4xl items-center justify-center rounded-xl mx-auto p-6 md:space-x-12 md:bg-white md:border-2 md:shadow-appbox md:border-[#ADADA9]">
    <img class="h-56" src="{imageSrc}" alt="{imageAlt}" />
    <div>
        <h1 class="text-2xl/loose font-black text-gray-800">
            {title}
        </h1>
        <p class="text-base/loose text-gray-600 mb-4">{body}</p>
    </div>
</div>