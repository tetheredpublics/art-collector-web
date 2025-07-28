<script>
    export let title = '';
    export let year = '';
    export let artist = '';
    export let medium = '';
</script>

<div class="flex flex-col items-start space-y-2 w-full max-w-full px-5 md:px-3 pe-16">
    <!-- Title with italic styling -->
    <h3 class="text-base font-bold italic text-black leading-[21px]">
        {title}
    </h3>
    
    <!-- Year -->
    <p class="text-sm font-bold text-gray-700 leading-[18px]">
        {year}
    </p>
    
    <!-- Artist -->
    <p class="text-sm font-bold text-gray-700 leading-[18px]">
        {artist}
    </p>
    
    <!-- Medium with minimum height -->
    <p class="text-sm font-bold text-gray-700 leading-[18px] min-h-4">
        {medium}
    </p>
</div> 