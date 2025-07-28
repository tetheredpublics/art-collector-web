<script lang="ts">
    import IosDownloadButton from "./IOSDownloadButton.svelte";
	import AndroidWaitlistButton from "./AndroidWaitlistButton.svelte";
    
    export let device: string;
    export let friend: string
</script>


{#if device === "ios"}
<div class="bg-[#FECDA5] rounded-xl p-4 mx-3 my-4 md:mx-0 flex items-center justify-between max-w-full space-x-4">
    <div class="flex-1 text-align-left space-y-1">
        <h2 class="text-lg font-bold text-black">Start Your Collection</h2>
        <p class="text-black text-opacity-[.84] text-xs leading-[18px]">
            Join <strong class="text-bold text-black">{friend}</strong> and others on Art Collector.
    </div>

    <div class="flex-shrink-0 h-[40px]">
      <IosDownloadButton />
    </div>
</div>

{:else if device === "android"}

<div class="bg-[#FECDA5] rounded-xl p-4 mx-3 my-4 md:mx-0 flex items-center justify-between max-w-full space-x-4">
    <div class="flex-1 text-align-left space-y-1">
        <h2 class="text-lg font-bold text-black">Get Early Access</h2>
        <p class="text-black text-opacity-[.84] text-xs leading-[18px]">
            Join <strong class="text-bold text-black">{friend}</strong> and others on Art Collector when we launch on Android.
        </p>
    </div>

    <div class="flex-shrink-0 h-[40px]">
      <AndroidWaitlistButton compact={true} />
    </div>
</div>


<!-- <div class="bg-[#FECDA5] rounded-xl mx-3 my-4 md:mx-0 max-w-full">
    <div class="flex items-center justify-between space-x-4  p-4">
        <h2 class="text-lg font-bold text-gray-900">Get Early Access</h2>

        <div class="flex-shrink-0 h-[40px]">
            <AndroidWaitlistButton compact={true} />
        </div>
    </div>
    <hr class="h-[1px] bg-black opacity-[.16] border-0 dark:bg-gray-700">
    <p class="text-black p-4 text-black text-opacity-[.64]">
        Join <strong class="text-bold text-black">{friend}</strong> and others on Art Collector when we launch on Android
    </p>
    
</div> -->

{:else}
<div class="bg-[#FECDA5] rounded-xl p-4 mx-3 my-4 md:mx-0 md:flex md:items-center md:justify-between max-w-full space-y-4 md:space-x-4">
    <div class="flex-1 text-align-left space-y-1">
        <h2 class="text-lg font-bold text-black">Start Your Collection!</h2>
        <p class="text-black text-opacity-[.84] text-xs leading-[18px]">
            Join <strong class="text-bold text-black">{friend}</strong> and others collecting great art from around the world.
        </p>
    </div>

    <div class="flex center flex-shrink-0 space-x-2">
        <div class="flex-shrink-0 h-[40px]">
            <AndroidWaitlistButton compact={true} />
        </div>
        <div class="flex-shrink-0 h-[40px]">
            <IosDownloadButton />
        </div>
    </div>
</div>
{/if}