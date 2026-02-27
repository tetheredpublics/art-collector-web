<script lang="ts">
	import { ANDROID_WAITLIST_URL } from '$lib/constants';

	export let href: string = ANDROID_WAITLIST_URL;
	export let compact: boolean = true;

	let label: string = 'Join Android Waitlist';
	let labelCompact: string = 'Join Waitlist';
</script>

<a
	{href}
	target="_blank"
	class="border border-[#a6a6a6] inline-flex items-center h-[40px] justify-center px-2 bg-black text-white rounded-md font-medium text-sm"
>
	<img src="/icons/android-logo.svg" alt="Android" class="w-[28px] h-[28px]" />
	<span class="px-2">{compact ? labelCompact : label}</span>
</a>
