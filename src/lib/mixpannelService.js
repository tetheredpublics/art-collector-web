import { consentGiven } from './stores';
import { get } from 'svelte/store';

/**
 * @param {string} name
 * @param {object} properties
 */
async function trackEvent(name, properties) {
    const consent = get(consentGiven);
    if (!consent) {
        console.log("Consent not given, skipping API call");
        return
    }
    try {
        const response = await fetch('/api/mixpanel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, properties })
        });
        if (!response.ok) {
            console.error('Failed to send event to server');
        }
    } catch (error) {
        console.error('Error sending event to server:', error);
    }
}

async function logTappedIOSDownloadButton() {
    await trackEvent("tapped_download_button", {"platform_requested": "iOS"})
}

async function logTappedAndroidDownloadButton() {
    await trackEvent("tapped_download_button", {"platform_requested": "Android"})
}

async function logTappedGiveConsent() {
    await trackEvent("tapped_give_consent", {})
}


export const MixpanelService = {
    logTappedIOSDownloadButton,
    logTappedAndroidDownloadButton,
    logTappedGiveConsent
};
