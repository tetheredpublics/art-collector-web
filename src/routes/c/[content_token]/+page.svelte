<script lang="ts">
    import SEO from '../../../components/SEO.svelte';
    import IosDownloadButton from "../../../components/IOSDownloadButton.svelte";
    import AndroidDownloadButton from "../../../components/AndroidDownloadButton.svelte";
    import ArtView from "../../../components/ArtView.svelte";
    import AvatarView from "../../../components/AvatarView.svelte";
    import { page } from '$app/stores';
    
    export let data: any;
    
    $: content = data.content;
    $: error = data.error;
    
    // Access unified data model
    $: collector = content?.collector;
    $: item = content?.item;
    $: activity = content?.activity;
    
    // Set up SEO data
    $: seoTitle = item ? `${item.title} by ${item.artist}` : 'Shared Artwork';
    $: seoDescription = item ? `${item.title} by ${item.artist} (${item.year}) - ${item.medium}` : 'Check out this artwork shared on Art Collector';
    $: seoImage = item?.image_url || '/images/logo@0.5x.png';
</script>

<style>
    #art-collector-header {
        opacity: 0;
    }
</style>

<SEO title={seoTitle} description={seoDescription} image={seoImage} />

<main class="min-h-screen py-8">
    {#if error}
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Content Not Found</h1>
            <p class="text-gray-600 mb-8">The shared content could not be loaded.</p>
            <div class="flex space-x-2 justify-center">
                <IosDownloadButton />
                <AndroidDownloadButton />
            </div>
        </div>
    {:else if content}
        <div class="container mx-auto px-4 max-w-full w-[600px]">
            <!-- Small heading with avatar and username -->
            {#if collector}
                <div class="flex items-center space-x-2 mb-4">
                    <AvatarView url={collector.avatar_url} username={collector.username} size="small" />
                    <span class="text-[16px] font-bold leading-[19px] text-black">{collector.username} shared</span>
                </div>
            {/if}
            <!-- Artwork Content -->
            {#if item}
                <div class="bg-white p-4 rounded-lg shadow-sm pb-6 mb-6">
                    <ArtView 
                        item={item}
                        collector={collector}
                        activity={activity}
                        on:profileClick={(event) => {
                            // Handle profile click - could navigate to user profile
                            console.log('Profile clicked:', event.detail);
                        }}
                    />

                </div>
            {:else}
                <!-- Show when item is missing -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Content Not Available</h2>
                    <p class="text-gray-600">The artwork content could not be loaded. This may be due to:</p>
                    <ul class="text-gray-600 mt-2 list-disc list-inside">
                        <li>Incomplete API response</li>
                        <li>Missing artwork data</li>
                        <li>API endpoint issues</li>
                    </ul>
                </div>
            {/if}
            
            <!-- Download App Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 text-center">
                <h2 class="text-xl font-bold text-gray-900 mb-2">Discover Art While You Walk!</h2>
                <p class="text-gray-600 mb-6">Download Art Collector and start building your own collection!</p>
                <div class="flex space-x-2 justify-center">
                    <IosDownloadButton />
                    <AndroidDownloadButton />
                </div>
            </div>
        </div>
    {:else}
        <div class="container mx-auto px-4 text-center">
            <div class="animate-pulse">
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div class="flex items-center space-x-3 mb-4">
                        <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                            <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                            <div class="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div class="aspect-square bg-gray-200"></div>
                    <div class="p-6">
                        <div class="h-6 bg-gray-200 rounded mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main> 