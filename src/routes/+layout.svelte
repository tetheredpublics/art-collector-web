<script>
    import "../app.css";
	import CookieConsent from "../components/CookieConsent.svelte";
</script>

<header>
	<div class="bg-specialBackground w-screen p-4">
		<h1 class="text-lg font-black"><a href="/">Art Collector</a></h1>
	</div>
</header>
  
<slot />

<footer class="bg-black p-4">
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