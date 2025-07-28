<script lang="ts">
    import IosDownloadButton from "./IOSDownloadButton.svelte";
	import AndroidWaitlistButton from "./AndroidWaitlistButton.svelte";
    import { onMount, onDestroy } from 'svelte';

    let device: 'ios' | 'android' | 'unknown' = 'unknown';
    let showSticky = true;

    const isMobile = {
        Android: () => navigator.userAgent.match(/Android/i),
        iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
        any: function () {
        return this.Android() || this.iOS();
        }
    };
    function handleScroll() {

        if (typeof window === 'undefined') return;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.offsetHeight;

        const atBottom = scrollTop + windowHeight >= bodyHeight - 200;
        showSticky = !(atBottom);
    } 

    onMount(() => {
        if (isMobile.Android()) {
            device = 'android';
        } else if (isMobile.iOS()) {
            device = 'ios';
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // call once to set initial state
    });
    onDestroy(() => {
        if (typeof window === 'undefined') return;
        window.removeEventListener('scroll', handleScroll);
    });
</script>


<div class:translate-y-full={!showSticky} class="bg-appPeach fixed bottom-0 space-x-4 left-0 right-0 z-50 border-t border-black border-opacity-[0.16] px-4 py-4 flex items-center justify-between transition-transform duration-300 transform">
    {#if device === 'android'}
        <h2 class="md:text-lg font-bold text-black">Get Early Access</h2>
    {:else}
        <div class="flex items-center space-x-2">
            <img 
                class="w-[24px] h-[24-px]"
                src="/icons/collect.png" 
                alt="icon collect" 
            />
            <h2 class="md:text-lg font-bold text-black">Start Your Collection <span class="hidden md:inline">Today</span></h2>
        </div>
    {/if}

    <div class="flex-shrink-0 h-[40px]">
        {#if device === 'ios'}
            <IosDownloadButton />
        {:else if device === 'android'}
            <AndroidWaitlistButton compact={true} />
        {:else}
            <div class="flex space-x-2 ml-3">
            <IosDownloadButton />
            <AndroidWaitlistButton compact={true} />
            </div>
        {/if}
    </div>
</div>
