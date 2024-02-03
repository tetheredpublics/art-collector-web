<script>
    import "../app.css";
	import CookieConsent from "../components/CookieConsent.svelte";
    import { isMobile } from "$lib/utils";

    let menuIsOpen = false

    function toggleMenu() {
        menuIsOpen = !menuIsOpen
    }

    function closeMenu() {
        menuIsOpen = false
    }

    function clickDownload() {
        let IOS_DOWNLOAD_URL = "https://apps.apple.com/app/apple-store/id6449506448?pt=122009505&ct=artcollector-web&mt=8"
        if (isMobile.iOS()) {
			window.location.replace(IOS_DOWNLOAD_URL);
		}
        closeMenu()
    }
</script>
<header class="flex justify-between w-full bg-background fixed md:relative">
	<div class="p-4">
		<h1 class="text-xl text-black font-black"><a href="/">Art Collector</a></h1>
	</div>
    <button class="p-4 md:hidden z-9999" on:click={toggleMenu}>
        <img class="size-6" alt="button" src="./icons/{menuIsOpen ? "close" : "menu"}.svg" />
    </button> 
    <nav class={`p-4 flex ${menuIsOpen ? "translate-x-0 z-9999 top-[60px] fixed w-screen h-screen flex-col text-center space-y-4 bg-background p-16" : "hidden md:block"}`}>  
        <a on:click={closeMenu} href="/" class="text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">Home</a>
        <a on:click={clickDownload} href="/download" class="text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">Download</a>
        <a target="_blank" href="https://www.instagram.com/artcollectorapp" class="md:hidden text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">Instagram</a>
        <a href="/privacy.html" class="md:hidden text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">Privacy</a>
        <a target="_blank" href="https://forms.gle/N3R8maka3Eg8Por27" class="md:hidden text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">Feedback</a>
    </nav>
</header>
<div class="h-[60px] block md:hidden"></div>


<slot />

<footer class="bg-black p-4 pb-32">
    <div class="flex justify-between pb-4">
        <copywright class="text-slate-300 text-xs py-2">© Art Collector 2023</copywright>
        <ul class="text-slate-300 text-xs flex py-2">
            <li><a class="p-2" target="_blank" href="https://www.instagram.com/artcollectorapp">Instagram</a></li>
            <li><a class="p-2" href="/privacy.html">Privacy</a></li>
            <li><a class="p-2" target="_blank" href="https://forms.gle/N3R8maka3Eg8Por27">Feedback</a></li>
        </ul>
    </div>
</footer>

<CookieConsent />