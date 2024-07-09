<script>
    import SmallButton from "../SmallButton.svelte";

    /** @type {string} */
    export let title
    /** @type {string} */
    export let body
    /** @type {string} */
    export let imageSrc
    /** @type {string} */
    export let imageAlt
    /** @type {string} */
    export let learnMoreUrl
</script>

<div class="flex flex-wrap md:flex-nowrap max-w-4xl items-center justify-center mx-auto p-2 md:py-4 space-y-4 md:space-y-0 md:space-x-16">
    <img class="max-h-80 w-80 max-w-full px-4 md:px-0" src="{imageSrc}" alt="{imageAlt}" />
    <div>
        <h2 class="text-2xl font-black text-gray-800 mb-2 px-1 md:px-0">
            {title}
        </h2>
        <p class="text-base/loose font-bold text-gray-600 px-1 md:px-0 mb-4">{body}</p>
        
        <a class="inline-block" href="{learnMoreUrl}">
            <button class="border-gray-400 border-2 font-bold block text-gray-800 text-sm shadow-gray px-4 py-2 bg-white rounded-md">
                Learn more
            </button>
        </a>
    </div>
</div>