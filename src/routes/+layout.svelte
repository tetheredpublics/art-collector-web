<script>
    import "../app.css";
	import CookieConsent from "../components/CookieConsent.svelte";
    import { isMobile } from "$lib/utils";
	import SupportButton from "../components/SupportButton.svelte";
    import InfoCard from "../components/InfoCard.svelte";
    import IosDownloadButton from "../components/IOSDownloadButton.svelte";
    import AndroidDownloadButton from "../components/AndroidDownloadButton.svelte";
    import { onMount, onDestroy } from 'svelte';


    let menuIsOpen = false

    let scrollY = 0;
    let isScrolled = false;

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

    const handleScroll = () => {
        scrollY = window.scrollY;
        isScrolled = scrollY > 0;
    };

    // Attach the scroll event listener when the component mounts
    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
        }
    });

    // Clean up the event listener when the component is destroyed
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
        }
    });
</script>

<style>
    .scrolled {
        position: fixed;
    }
</style>

<header id="art-collector-header" 
    class="flex justify-between w-full bg-white main-header absolute border-b-4 border-gray-300"
    class:scrolled={isScrolled}
>
	<div class="p-4">
		<h1 class="text-xl text-black font-black"><a href="/">Art Collector</a></h1>
	</div>
    <button class="p-4 md:hidden z-9999" on:click={toggleMenu}>
        <img class="size-6" alt="button" src="/icons/{menuIsOpen ? "close" : "menu"}.svg" />
    </button> 
    <nav class={`p-4 flex ${menuIsOpen ? "translate-x-0 z-9999 top-[60px] fixed w-screen h-screen flex-col text-center space-y-4 bg-background p-16" : "hidden md:block"}`}>  
        <a on:click={closeMenu} href="/" class="text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">
            Home
        </a>
        
        <a target="_blank" href="https://ko-fi.com/artcollectorapp" class="text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">
            Support Me
        </a>
        <a on:click={clickDownload} href="/download" class="border-darkBlue hover:bg-darkBlue border-2 font-bold shadow-blue w-full md:max-w-40 max-w-full bg-primary text-xs rounded-md text-white py-2 px-4">
            Download
        </a>
        <a target="_blank" href="https://www.instagram.com/artcollectorapp" class="md:hidden text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">
            Instagram
        </a>
        <a href="/privacy.html" class="md:hidden text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">
            Privacy
        </a>
        <a target="_blank" href="https://forms.gle/N3R8maka3Eg8Por27" class="md:hidden text-black/[.64] hover:text-black px-3 py-2 text-sm font-bold">
            Feedback
        </a>
    </nav>
</header>
<div class="h-[60px] block"></div>


<slot />

<footer class="bg-black p-4">
    <div class="flex justify-between">
        <copywright class="text-slate-300 text-xs py-2">© Art Collector 2023</copywright>
        <div class="text-right">

            <ul class="text-slate-300 text-xs flex py-2">
                <li><a class="p-2" target="_blank" href="https://www.instagram.com/artcollectorapp">Instagram</a></li>
                <li><a class="p-2" href="/privacy.html">Privacy</a></li>
                <li><a class="p-2" target="_blank" href="https://forms.gle/N3R8maka3Eg8Por27">Feedback</a></li>
            </ul>
        </div>
    </div>
    <InfoCard
        title="Your Ticket to an Artistic Adventure"
        body="Become an early adopter of Art Collector and get the chance to claim the best pieces before anyone else. Join us now, and transform your steps into a canvas of discovery!"
        imageSrc="/images/ticket2@0.25x.png"
        imageAlt="ticket to artistic adventure"
    >
        <p class="text-sm/loose font-semibold text-white opacity-80 pb-8 md:pb-12">
            Download today - The first 500 users win an award!
        </p>
        <div class="flex space-x-2 justify-center">
            <IosDownloadButton />
            <AndroidDownloadButton />
        </div>
    </InfoCard>
    <SupportButton />
</footer>

<CookieConsent />