<script lang="ts">
    import ArtLabelView from './ArtLabelView.svelte';
    import CreditBanner from './CreditBanner.svelte';
	import MicroCta from './MicroCta.svelte';
    
    export let item: any;
    export let collector: any = null;
    export let activity: any = null;
    export let fixedHeightImages: boolean = false;
</script>

<div class="flex flex-col space-y-4 md:w-[600px] max-w-full mx-auto pb-4">
    {#if item?.image_url}
        <div class="w-[600px] max-w-full bg-[#EDEDEA] flex items-center justify-center md:rounded-md">
            <img 
                src={item.image_url} 
                alt={item.title} 
                class="{fixedHeightImages ? "h-[364px]" : "max-h-[364px]"} w-auto object-contain"
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
            timestamp={activity.time}
            actionLabel={activity.action_label}
            actionIcon={activity.action_icon}
        />
    {/if}
    
    <!-- Art Label View -->
    <ArtLabelView 
        title={item?.title}
        year={item?.year}
        artist={item?.artist}
        medium={item?.medium}
    />

    {#if collector}
        <MicroCta friend={collector.username} />
    {/if}
    <!-- <DownloadCta device={device} friend={collector.username} /> -->


</div> 