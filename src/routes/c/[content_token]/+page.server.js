export async function load({ params, fetch }) {
    const { content_token } = params;

    // let baseUrl = "http://api.artcollectorapp.net"
    let testUrl = "http://localhost:8000"
    
    try {
        const response = await fetch(
            `${testUrl}/api/1/collector/1/shortlink/${content_token}?verbose=true`,
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-api-key": "E63pwKnNyXBy0yGv08zpZSgGTA4xlTV7bIzVSU7LSpY",
                },
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API data:', data);
        
        // Transform API data into unified UIContent model
        const uiContent = transformToUIContent(data);
        console.log('Transformed UI content:', uiContent);
        
        return {
            content: uiContent
        };
    } catch (error) {
        console.error('Error fetching shortlink data:', error);
        return {
            error: 'Failed to load content',
            content: null
        };
    }
}

/**
 * Transforms API response into unified UIContent model
 * @param {Object} apiData - Raw API response data
 * @returns {Object} - Unified content model
 */
function transformToUIContent(apiData) {
    console.log('Transforming API data:', apiData);
    const { collector, subject } = apiData;
    
    // Transform collector data
    const uiCollector = {
        username: collector.username,
        avatar_url: collector.avatar_url,
        avatar_color: collector.avatar_color
    };
    
    // Transform collectable/item data
    let uiCollectable = null;
    let uiActivity = null;
    
    if (subject?.type === 'collectable' && subject?.collectable) {
        const collectable = subject.collectable;
        uiCollectable = {
            title: collectable.title,
            artist: collectable.artist,
            year: collectable.year,
            medium: collectable.medium,
            image_url: collectable.image_url,
            collection: collectable.collection,
        };
    } else if (subject?.type === 'news' && subject?.news) {
        const news = subject.news;
        const newsItem = news.item;
        
        uiCollectable = {
            title: newsItem.title,
            artist: newsItem.artist,
            year: newsItem.year,
            medium: newsItem.medium,
            image_url: newsItem.image_url,
            collection: newsItem.collection,
        };
        
        // Create activity for news type
        uiActivity = {
            collector: {
                username: news.username,
                avatar_url: news.avatar_url,
                avatar_color: news.avatar_color
            },
            time: news.time,
            action_icon: news.activity.icon,
            action_label: news.activity.label,
            activity: news.activity
        };
    }
    
    const result = {
        collector: uiCollector,
        item: uiCollectable,
        activity: uiActivity
    };
    
    console.log('Transformation result:', result);
    return result;
} 