<script>
	import CollectionItem from "../../../components/collections/CollectionItem.svelte";
	import NewsItem from "../../../components/news/NewsItem.svelte";

    export let data;

    function pascalToSnakeCase(str) {
        // Use a regular expression to replace capital letters (except for the first one)
        // with an underscore followed by the lowercase version of the letter
        return str.split(/\.?(?=[A-Z])/).join('-').toLowerCase();
    }

    function pascalToCamelCase(str) {
        // Check if the string is empty
        if (!str) return '';

        // Convert the first character to lowercase and concatenate the rest of the string
        return str[0].toLowerCase() + str.slice(1);
    }

    const Colors = {
        "AppAmber": "#FBB800",
        "AppBackground": "#F5F5F0",
        "AppBeige": "#EADFD0",
        "AppBlue": "#0692E2",
        "AppDarkAmber": "#BD8A00",
        "AppDarkBlue": "#0570AD",
        "AppDarkGreen": "#009961",
        "AppGreen": "#00D084",
        "AppGrey": "#EDEDEA",
        "AppGreyBorder": "#BABABA",
        "AppGreyShadow": "#ADADAD",
        "AppLightBlue": "#E6F5FE",
        "AppLightRed": "#FAEAEA",
        "AppMagenta": "#C52178",
        "AppMidBlue": "#8ED1FC",
        "AppOrange": "#FF6900",
        "AppPeach": "#FECDA5",
        "AppPink": "#FFCEEC",
        "AppPurple": "#C06BE8",
        "AppRed": "#CF2D2D",
        "AppTeal": "#33A7B5",
        "AppWhite": "#FFFFFF",
        "AppYellow": "#EDD853"
    }

    // src/lib/timeAgo.js
    function timeAgo(dateParam) {
        const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
        const now = new Date();
        const seconds = Math.round((now - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);
        const months = Math.round(days / 30.44);
        const years = Math.round(days / 365.25);

        if (seconds < 45) {
            return 'just now';
        } else if (seconds < 90) {
            return 'a minute ago';
        } else if (minutes < 45) {
            return minutes + ' minutes ago';
        } else if (minutes < 90) {
            return 'an hour ago';
        } else if (hours < 24) {
            return hours + ' hours ago';
        } else if (hours < 42) {
            return 'a day ago';
        } else if (days < 30) {
            return days + ' days ago';
        } else if (days < 45) {
            return 'a month ago';
        } else if (months < 12) {
            return months + ' months ago';
        } else if (months < 18) {
            return 'a year ago';
        } else {
            return years + ' years ago';
        }
    }

    const iconMap = {
        "IconCollect": "collect",
        "IconDrop": "drop",
        "IconDestroy": "destroy",
    }

    const getIconName = (k) => iconMap[k] || "collect";

</script>
<!-- <p>{JSON.stringify(data)}</p> -->
<div class="p-4 md:p-8 xl:p-16 py-8 md:py-16 max-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 col-auto mx-auto">
{#each data.highlights as newsItem}
    <article class="w-full md:mb-8 mx-auto bg-white border-2 border-gray-400 rounded-lg overflow-hidden shadow-gray">
        <div 
            class="bg-contain bg-no-repeat bg-center flex items-center justify-items-center max-w-full max-h-96 md:h-96 bg-[#BABABA]"
            style="background-image: url({newsItem.item.thumb_url});"
        >
            <img 
                class="md:hidden max-w-full max-h-96 md:x-4 md:px-0 mx-auto"
                src={newsItem.item.thumb_url} 
                alt="{newsItem.item.title}, {newsItem.item.year}. {newsItem.item.artist}." 
                loading="lazy" 
            />
        </div>
        <div class="px-2 md:px-4 py-4 md:space-y-2">
            <div class="flex items-center space-x-2">
                <div class="size-8 block rounded-full border border-gray-500 overflow-hidden" style="background-color: {Colors[newsItem.avatar_color]};">
                    <img 
                        class="size-8 p-0.5"
                        src={newsItem.avatar_url} 
                        alt="{newsItem.username} Art Collector Avatar" 
                        loading="lazy" 
                    />
                </div>
                <div class="flex items-baseline space-x-2">
                    <h2 class="font-bold text-lg">{newsItem.username}</h2>
                    <label class="font-bold text-xs text-gray-600">{timeAgo(newsItem.time)}</label>
                </div>
                <div class="flex-grow"></div>
                <div class="flex items-center space-x-0.5">
                    <img 
                        class="size-6 p-0.5"
                        src="/icons/{getIconName(newsItem.action_icon)}.png" 
                        alt="icon {newsItem.action_icon}" 
                        loading="lazy" 
                    />
                    <p class="text-xs font-bold text-gray-800 leading-10">Collected</p>
                </div>
            </div>
            <div class="text-gray-800 text-sm py-2 px-1 space-y-2">
                <h3 class="pr-16"><em class="font-bold">{newsItem.item.title}</em></h3>
                <p class="year font-bold">{newsItem.item.year}</p>
                <p class="artist font-bold">{newsItem.item.artist}</p>
            </div>
        </div>
    </article>
{/each}
</div>