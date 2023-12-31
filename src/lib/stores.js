import { writable } from 'svelte/store';

// const initialConsent = localStorage.getItem('cookieConsent') === 'true';
export const consentGiven = writable(false);
export const hasConsentResponse = writable(true);