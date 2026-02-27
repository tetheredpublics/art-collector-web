import Mixpanel from 'mixpanel';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const mixpanel = env.MIXPANEL_TOKEN ? Mixpanel.init(env.MIXPANEL_TOKEN) : null;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name, properties } = await request.json();

	if (!name || typeof name !== 'string') {
		return json({ error: 'Event name is required' }, { status: 400 });
	}

	if (!mixpanel) {
		return json({ message: 'Mixpanel is not configured' }, { status: 202 });
	}

	try {
		await new Promise((resolve, reject) => {
			/**
			 * @param {Error | null | undefined} trackError
			 */
			const onTrack = (trackError) => {
				if (trackError) {
					reject(trackError);
					return;
				}

				resolve(true);
			};

			mixpanel.track(name, properties ?? {}, onTrack);
		});

		return json({ message: 'Event tracked successfully' }, { status: 200 });
	} catch {
		return json({ error: 'Failed to track event' }, { status: 500 });
	}
}
