<script>
	import { MixpanelService } from "$lib/mixpannelService";
    import Popover from "./Popover.svelte";
    let showPopover = false

    function togglePopover() {
        MixpanelService.logTappedAndroidDownloadButton()
        showPopover = !showPopover
    }
</script>

<button class="popover-button" on:click={togglePopover}>
    <img class="h-10" alt="Get it on Google Play" src="./images/download/google-play-badge.png">
</button>

<Popover bind:visible={showPopover}>
    <div>
        <h2 class="text-xl font-bold mb-2">Comming Soon...</h2>
        <p>Encourage our Android developers work faster!</p>
    </div>
</Popover>