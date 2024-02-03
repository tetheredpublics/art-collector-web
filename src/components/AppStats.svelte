<script>
    /** @type {number} */
    export let value
    /** @type {string} */
    export let label
    /** @type {string} */
    export let imageSrc
    /** @type {string} */
    export let imageAlt

    /**
	 * @param {number} value
	 */
    function formated(value) {
        return value.toLocaleString("en-GB", {
		    // notation: "compact",
		    compactDisplay: "short"
	    })
    }
</script>

<div class="p-6 space-y-2 text-center">
    <img class="size-16 mx-auto" src="{imageSrc}" alt="{imageAlt}" />
    <div>
        <p class="text-2xl font-bold text-center">{formated(value)}</p>
        <p class="text-base/loose text-gray-600 text-xs font-bold">{label}</p>
    </div>
</div>