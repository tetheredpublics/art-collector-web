
<script>	
	import { MixpanelService } from "$lib/mixpannelService";
    import { isMobile } from "$lib/utils";
	import Popover from "./Popover.svelte";
    
    // TODO Make constant
    let IOS_DOWNLOAD_URL = "https://apps.apple.com/app/apple-store/id6449506448?pt=122009505&ct=artcollector-web&mt=8"
    let showPopover = false;

    function presentDownload() {
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


<button class="ios-download-button flex-none popover-button" on:click={presentDownload}>
    <img id="ios-download-button" class="ios-download-button h-10" alt="Download on the App Store" src="/images/download/app-store-badge.svg">
</button>

<Popover bind:visible={showPopover}>
    <div class="text-center">
        <img class="mx-auto" alt="ios download QR code" src="/images/download/ios-qr-code.jpg">
        
        <a class="z-1 text-link font-bold p-2" target="_blank" href="{IOS_DOWNLOAD_URL}">
            Download on the App Store
        </a>
    </div>
</Popover>
