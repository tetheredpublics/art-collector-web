<script>
    // import website from '$lib/config/website';
   
    const siteTitle = "Art Collector App";

    export let title;
    export let description = "Step into art; Discover, collect, trade and even decide the fate of great art. Download today to join the game!";
    export let image = "./images/logo@0.5x.png"
   
    const pageTitle = `${siteTitle} | ${title}`;
</script>
    
<svelte:head>
    <title>{pageTitle}</title>
    <meta name="description" content={description} />

    <meta property="og:title" content="{pageTitle}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="{image}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="{siteTitle}" />
</svelte:head>