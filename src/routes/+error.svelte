<script>
	import { page } from '$app/stores';

    import AndroidDownloadButton from "../components/AndroidDownloadButton.svelte";
	import IosDownloadButton from "../components/IOSDownloadButton.svelte";
</script>

<main class="p-4 py-16 max-w-xl mx-auto min-h-[1000]">

    <img class="block size-32 bg-white rounded-xl border-2 border-black/25 mb-2" alt="Art Collector Logo" src="./images/logo@0.25x.png">
    <h1 class="text-2xl font-black text-gray-900 mb-2">{$page.status} {$page.error.message}</h1>
    <p class="text-base text-gray-600 mb-8">Looks like something went wrong...</p>
    <div class="flex space-x-2 justify-center md:justify-start pb-32">
        <IosDownloadButton/>
        <AndroidDownloadButton/>
    </div>
</main>