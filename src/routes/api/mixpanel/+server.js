// src/routes/api/
import mixpanel from 'mixpanel-browser';
import { json } from '@sveltejs/kit';
import { MIXPANEL_TOKEN } from '$env/static/private';

// Initialize Mixpanel with your server-side token
mixpanel.init(MIXPANEL_TOKEN);


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const {name, properties} = await request.json();
    try {
        mixpanel.track(name, properties);
        return  json({
            status: 200,
            body:{ message: 'Event tracked successfully' }
        });
    } catch (error) {
        return json({
            status: 500,
            body: { error: 'Failed to track event' }
        });
    }
}

