import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const BACKEND_API_URL =
	env.BACKEND_API_URL ?? 'https://tethered-publics-backend-7twz4.ondigitalocean.app';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return fetchLeaderboard().catch(() => {
		throw error(502, 'Failed to load leaderboard');
	});
}

async function fetchLeaderboard() {
	const response = await fetch(`${BACKEND_API_URL}/api/1/collector/4/leaderboard`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(env.API_KEY ? { 'x-api-key': env.API_KEY } : {})
		}
	});

	if (!response.ok) {
		throw new Error(`Leaderboard fetch failed: ${response.status}`);
	}

	const leaderboard = await response.json();
	return { leaderboard };
}
