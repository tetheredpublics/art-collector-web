


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return fetchStats()
        .catch(error => {
            console.log("whats happening")
            console.log(error);
            throw error(404, 'Not found')
        });
}


async function fetchStats() {
    let baseUrl = "https://tethered-publics-backend-7twz4.ondigitalocean.app";
    const response = await fetch(
        `${baseUrl}/api/web/collector/stats`, 
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const appstats = await response.json();
    return { appstats: appstats };
}