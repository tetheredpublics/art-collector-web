<script>
	import { page } from '$app/stores';

	const siteTitle = 'Art Collector App';

	export let title;
	export let description =
		'Step into art; Discover, collect, trade and even decide the fate of great art. Download today to join the game!';
	export let image = 'https://artcollectorapp.net/images/logo@0.5x.png';

	$: pageTitle = title ? `${siteTitle} | ${title}` : siteTitle;
	$: canonicalUrl = `${$page.url.origin}${$page.url.pathname}`;
	$: socialImage =
		image.startsWith('https://') || image.startsWith('http://')
			? image
			: new URL(image, $page.url.origin).href;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={socialImage} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:site_name" content={siteTitle} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={socialImage} />
</svelte:head>
