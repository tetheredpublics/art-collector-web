import Mixpanel from 'mixpanel';
import { json } from '@sveltejs/kit';
import { MIXPANEL_TOKEN } from '$env/static/private';

const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name, properties } = await request.json();

	if (!name || typeof name !== 'string') {
		return json({ error: 'Event name is required' }, { status: 400 });
	}

	try {
		await new Promise((resolve, reject) => {
			mixpanel.track(name, properties ?? {}, (trackError) => {
				if (trackError) {
					reject(trackError);
					return;
				}

				resolve();
			});
		});

		return json({ message: 'Event tracked successfully' }, { status: 200 });
	} catch {
		return json({ error: 'Failed to track event' }, { status: 500 });
	}
}
