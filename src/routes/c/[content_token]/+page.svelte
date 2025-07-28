<script lang="ts">
    import SEO from '../../../components/SEO.svelte';
    import IosDownloadButton from "../../../components/IOSDownloadButton.svelte";
    import AndroidDownloadButton from "../../../components/AndroidDownloadButton.svelte";
    import ArtView from "../../../components/ArtView.svelte";
    import AvatarView from "../../../components/AvatarView.svelte";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
	import StickyFooterCta from '../../../components/StickyFooterCta.svelte';
    
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


    const isMobile = {
        Android: () => navigator.userAgent.match(/Android/i),
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        any: function () {
            return this.Android() || this.iOS();
        }
    };

  let device: string = 'unknown';

  onMount(() => {
    if (isMobile.Android()) {
      device = 'android';
    } else if (isMobile.iOS()) {
      device = 'ios';
      
    } else {
        console.log(navigator.userAgent)
        console.log("FUICK FOOF")
    }
  });
</script>

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
        <div class="container mx-auto md:px-4 max-w-full w-[564px]">
            <!-- Small heading with avatar and username -->
            {#if collector}
                <div class="flex items-center space-x-2 mb-4 px-4">
                    <AvatarView 
                        url={collector.avatar_url} 
                        username={collector.username} 
                        size="small" 
                        color={collector.avatar_color} 
                    />
                    <span class="text-[16px] font-bold leading-[19px] text-black">{collector.username} shared...</span>
                </div>
            {/if}
            <!-- Artwork Content -->
            {#if item}
                <div class="bg-white md:p-4 md:rounded-xl shadow-sm pb-6">
                    <ArtView 
                        item={item}
                        collector={collector}
                        activity={activity}
                        fixedHeightImages={false}
                    />

                </div>
            {:else}
                <!-- Show when item is missing -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">Content Not Available</h2>
                    <p class="text-gray-600">The artwork content could not be loaded.</p>
                </div>
            {/if}
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

    <StickyFooterCta/>
</main> 