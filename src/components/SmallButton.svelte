<script>
    /** @type {string} */
    export let url
    export let label = "Learn More"
</script>

<a class="inline-block" href={url} target="_blank">
    <button class="border-greyBorder border-2 font-bold block text-sm text-link font-bold px-2 py-1 bg-grey rounded-md">
        {label}
    </button>
</a>