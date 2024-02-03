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

<div class="flex flex-wrap md:flex-nowrap max-w-4xl items-center justify-center rounded-xl mx-auto p-4 md:p-16 space-y-4 md:space-y-0 md:space-x-16 md:bg-white md:shadow-appbox md:border-2 md:border-[#ADADA9]">
    <img class="max-h-56 w-56 max-w-full px-8 md:p-0" src="{imageSrc}" alt="{imageAlt}" />
    <div>
        <h2 class="text-2xl font-black text-gray-800 mb-2">
            {title}
        </h2>
        <p class="text-base/loose font-bold text-gray-600">{body}</p>
        <slot>
        </slot>
    </div>
</div>