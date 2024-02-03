<script>
	import { MixpanelService } from '$lib/mixpannelService';
    import { onMount } from 'svelte';
	import { consentGiven, hasConsentResponse } from '../lib/stores';

    let storedConsent = true

    onMount(() => {
        // Check if the user has already made a choice
        let storedConsent = localStorage.getItem('cookieConsent');
        if (storedConsent === null) {
            hasConsentResponse.set(false);
        } else {
            hasConsentResponse.set(true);
            consentGiven.set(storedConsent === 'true');
        }
    });

    const handleCookieConsent = (/** @type {boolean} */ accept) => {
        console.log("consent")
        localStorage.setItem('cookieConsent', accept ? 'true' : 'false');
        if (accept) {
            consentGiven.set(true);
            MixpanelService.logTappedGiveConsent()
        } else {
            consentGiven.set(false);
        }
        hasConsentResponse.set(true)
    };
</script>

{#if !$hasConsentResponse}
<div class="fixed bottom-0 right-0 m-4 bg-background rounded-md py-2 px-2 text-left shadow-md z-50 border-2 border-[#ADADA9]">
    <div class="flex flex-wrap sm:container justify-end sm:mx-auto">
        <p class="text-xs md:max-w-sm p-2">
            We use cookies and similar technologies to enhance your experience on our site.
            This includes personalizing content, analyzing traffic, and improving our services.
            You have the option to opt-out of non-essential tracking.
            Learn more about our 
            <a target="_blank" href="/privacy.html" class="text-link font-bold">privacy practices</a>.
        </p>
        <div class="xs:flex w-full md:w-40 md:block p-2 space-y-4">
            <button on:click={() => handleCookieConsent(true)} 
                class="border-blue-900 hover:bg-link border-2 font-bold block shadow-blue w-full md:max-w-40 max-w-full bg-primary text-xs rounded-md text-white p-2">
                Accept All
            </button>
            <button on:click={() => handleCookieConsent(false)} 
                class="border-slate-900/50 text-slate-800/75 hover:bg-black/10 border-[1px] w-full md:max-w-40 max-w-full rounded-md border-dashed text-xs p-2">
                Opt-out
            </button>
        </div>
    </div>
</div>
{/if}
  