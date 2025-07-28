<script>
	import ArtView from "../../../components/ArtView.svelte";

    export let data;

</script>
<div class="py-4 md:p-8 xl:p-16 py-8 md:py-16 max-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 col-auto mx-auto">
{#each data.highlights as newsItem}
    <div class="bg-white md:p-4 md:rounded-xl shadow-sm pb-6 border-[0.5px] md:border-appGreyBorder">
        <ArtView 
            item={newsItem.item}
            activity={{
                collector: {
                    username: newsItem.username,
                    avatar_color: newsItem.avatar_color,
                    avatar_url: newsItem.avatar_url,
                },
                time: newsItem.time,
                action_label: newsItem.activity.label,
                action_icon: newsItem.activity.icon,
            }}
            fixedHeightImages={true}
        />
    </div>
{/each}
</div>