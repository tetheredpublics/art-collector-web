<script>
    import "../app.css";
</script>

<header>
	<div class="bg-specialBackground w-screen p-4">
		<h1 class="text-lg font-black"><a href="/">Art Collector</a></h1>
	</div>
</header>
  
<slot />

<footer class="bg-black p-4">
    <div class="flex justify-between pb-8">
        <div class="text-slate-100 text-xs">© Art Collector 2023</div>
        <ul class="text-slate-200 text-xs flex space-x-4">
            <li><a class="p-2" href="/privacy.html">Privacy</a></li>
            <li><a class="p-2" target="_blank" href="https://forms.gle/N3R8maka3Eg8Por27">Feedback</a></li>
        </ul>
    </div>
</footer>