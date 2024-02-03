<script>
	import { MixpanelService } from "$lib/mixpannelService";
    import Popover from "./Popover.svelte";
    let showPopover = false

    function togglePopover() {
        MixpanelService.logTappedAndroidDownloadButton()
        showPopover = !showPopover
    }
</script>

<button class="android-download-button flex-none popover-button" on:click={togglePopover}>
    <img id="android-download-button" class="android-download-button h-10" alt="Get it on Google Play" src="./images/download/google-play-badge.png">
</button>

<Popover bind:visible={showPopover}>
    <div class="text-center m-4">
        <h2 class="text-2xl font-black text-gray-800 mb-2">Comming Soon...</h2>
        <p class="text-base/loose font-bold text-gray-600 mb-4">
            Encourage our Android developers to work faster, 
            <a href="https://www.instagram.com/artcollectorapp/">
                Follow us on Instagram for updates
            </a>
        </p>
        <p class="text-base/loose font-bold text-link mb-4">
            <a target="_blank" class="block hover:bg-grey-300" href="https://www.instagram.com/artcollectorapp/">
                @artcollectorapp
            </a>
        </p>
    </div>
</Popover>