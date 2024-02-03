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

<div class="p-6 rounded-lg md:bg-white md:shadow-appbox md:border-2 md:border-[#ADADA9]">
    <img class="p-4 max-size-32 w-32 max-w-full mx-auto" src="{imageSrc}" alt="{imageAlt}" />
    <div class="space-y-2">
        <h1 class="text-lg/6 font-black text-gray-800">
            {title}
        </h1>
        <p class="text-sm/6 text-gray-600">{body}</p>
    </div>
</div>