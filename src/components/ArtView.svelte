<script lang="ts">
    import ArtLabelView from './ArtLabelView.svelte';
    import CreditBanner from './CreditBanner.svelte';
    
    export let item: any;
    export let collector: any;
    export let activity: any = null;
    
    // Event dispatcher for profile clicks
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    function handleProfileClick(event: CustomEvent) {
        dispatch('profileClick', event.detail);
    }
</script>

<div class="flex flex-col space-y-4 w-[600px] max-w-full mx-auto">
    <!-- Image with 600px width, max 400px height and grey background, maintaining aspect ratio -->
    {#if item?.image_url}
        <div class="w-[600px] max-w-full h-[400px] bg-[#EDEDEA] flex items-center justify-center">
            <img 
                src={item.image_url} 
                alt={item.title} 
                class="h-full w-auto object-contain"
            />
        </div>
    {:else}
        <div class="w-[600px] max-w-full h-[400px] bg-[#EDEDEA] flex items-center justify-center">
            <span class="text-gray-500">No image available</span>
        </div>
    {/if}
    
    <!-- Credit Banner - only show if there's an activity -->
    {#if activity}
        <CreditBanner 
            username={activity.collector?.username}
            avatarUrl={activity.collector?.avatar_url}
            avatarColor={activity.collector?.avatar_color}
            timestamp={activity.timestamp}
            actionLabel={activity.action_label}
            actionIcon={activity.action_icon}
            on:profileClick={handleProfileClick}
        />
    {/if}
    
    <!-- Art Label View -->
    <ArtLabelView 
        title={item?.title}
        year={item?.year}
        artist={item?.artist}
        medium={item?.medium}
    />
</div> 