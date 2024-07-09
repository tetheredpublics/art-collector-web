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

<!-- <div class="flex flex-wrap md:flex-nowrap max-w-4xl items-end justify-center mx-auto p-4 space-y-4 md:space-y-0 md:space-x-16"> -->
<div class="p-8 min-h-120 pb-16 text-center">
    <div class="place-content-center min-h-64 md:min-h-80">
        <img class="h-20 w-20 mx-auto mb-4 border-box" src="{imageSrc}" alt="{imageAlt}" />
        <h2 class="text-2xl font-bold text-white pb-2 md:pb-4">
            {title}
        </h2>
        <!-- <p class="text-base/loose font-bold text-gray-200">{body}</p> -->
        <slot>
        </slot>
    </div>
</div>