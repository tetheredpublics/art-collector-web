import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const BACKEND_API_URL =
	env.BACKEND_API_URL ?? 'https://tethered-publics-backend-7twz4.ondigitalocean.app';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return fetchStats().catch(() => {
		throw error(404, 'Not found');
	});
}

async function fetchStats() {
	const response = await fetch(`${BACKEND_API_URL}/api/web/collector/stats`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		throw new Error(message);
	}
	const appstats = await response.json();
	return { appstats: appstats };
}
