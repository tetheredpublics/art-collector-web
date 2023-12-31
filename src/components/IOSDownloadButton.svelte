
<script>	
	import { MixpanelService } from "$lib/mixpannelService";
    import { isMobile } from "$lib/utils";
	import Popover from "./Popover.svelte";
    
    // TODO Make constant
    let IOS_DOWNLOAD_URL = "https://apple.co/41HAEvl"
    let showPopover = false;

    function presentDownload() {
        console.log("present")
        
        MixpanelService.logTappedIOSDownloadButton()
        if (isMobile.iOS()) {
            window.location.replace(IOS_DOWNLOAD_URL);
        } else {
            togglePopover()
        }
    }

    function togglePopover() {
        showPopover = !showPopover
    }
</script>


<button class="popover-button" on:click={presentDownload}>
    <img class="h-10" alt="Download on the App Store" src="./images/download/app-store-badge.svg">
</button>

<Popover bind:visible={showPopover}>
    <div>
        <img class="max-w-full" alt="ios download QR code" src="./images/download/ios-qr-code.jpg">
        
        <a class="z-1 text-link font-bold p-2" target="_blank" href="{IOS_DOWNLOAD_URL}">
            Download on the App Store
        </a>
    </div>
</Popover>
