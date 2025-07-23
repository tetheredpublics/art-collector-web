<script lang="ts">
    export let url = '';
    export let username = '';
    export let size: 'small' | 'medium' | 'large' = 'medium';
    
    const sizeClasses = {
        small: 'w-8 h-8 text-sm',
        medium: 'w-12 h-12 text-base',
        large: 'w-16 h-16 text-lg'
    };
    
    $: sizeClass = sizeClasses[size];
</script>

<div class="rounded-full overflow-hidden bg-gray-200 flex-shrink-0 {sizeClass}">
    {#if url}
        <img src={url} alt="{username}" class="w-full h-full object-cover" />
    {:else}
        <div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {username}
        </div>
    {/if}
</div> 