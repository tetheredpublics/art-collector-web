<script>
	import { IOS_DOWNLOAD_URL } from '$lib/constants';
	import { MixpanelService } from '$lib/mixpanelService';
	import { isMobile } from '$lib/utils';
	import Popover from './Popover.svelte';

	let showPopover = false;

	function presentDownload() {
		MixpanelService.logTappedIOSDownloadButton();
		if (isMobile.iOS()) {
			window.location.replace(IOS_DOWNLOAD_URL);
		} else {
			togglePopover();
		}
	}

	function togglePopover() {
		showPopover = !showPopover;
	}
</script>

<button class="ios-download-button flex-none popover-button" on:click={presentDownload}>
	<img
		id="ios-download-button"
		class="ios-download-button h-10"
		alt="Download on the App Store"
		src="/images/download/app-store-badge.svg"
	/>
</button>

<Popover bind:visible={showPopover}>
	<div class="text-center">
		<img class="mx-auto" alt="ios download QR code" src="/images/download/ios-qr-code.jpg" />

		<a class="z-1 text-link font-bold p-2" target="_blank" href={IOS_DOWNLOAD_URL}>
			Download on the App Store
		</a>
	</div>
</Popover>
