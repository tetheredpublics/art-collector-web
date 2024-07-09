

/** @type {import('../../$types').PageServerLoad} */
export async function load({ params }) {
    return fetchHighlights()
        .catch(error => {
            console.log("whats happening")
            console.log(error);
            throw error(404, 'Not found')
        });
}


async function fetchHighlights() {
    let baseUrl = "https://tethered-publics-backend-7twz4.ondigitalocean.app";
    // let baseUrl = "http://localhost:8000";
    const response = await fetch(
        `${baseUrl}/api/1/collector/1/news/highlights`, 
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
    const highlights = await response.json();
    return { highlights: highlights };
}