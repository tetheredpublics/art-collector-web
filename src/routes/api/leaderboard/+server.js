import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const BACKEND_API_URL =
	env.BACKEND_API_URL ?? 'https://tethered-publics-backend-7twz4.ondigitalocean.app';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const response = await fetch(`${BACKEND_API_URL}/api/1/collector/4/leaderboard`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(env.API_KEY ? { 'x-api-key': env.API_KEY } : {})
			}
		});

		if (!response.ok) {
			return json({ error: 'Upstream request failed' }, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch {
		return json({ error: 'Failed to fetch leaderboard' }, { status: 502 });
	}
}
