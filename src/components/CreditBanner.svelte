<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import AvatarView from './AvatarView.svelte';
    
    export let username = '';
    export let avatarUrl = '';
    export let avatarColor = '';
    export let timestamp = '';
    export let actionLabel = '';
    export let actionIcon = '';
    
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
        "bundle://IconCollect": "collect",
        "IconCollect": "collect",
        "bundle://IconDrop": "drop",
        "IconDrop": "drop",
        "bundle://IconDestroy": "destroy",
        "IconDestroy": "destroy",
    }

    const getIconName = (k: string) => iconMap[k as keyof typeof iconMap] || "collect";
</script>

<div class="flex items-center space-x-2 h-8 px-4 md:px-2">
    <button class="flex items-center space-x-2">
        <!-- Avatar -->
        <AvatarView 
            url={avatarUrl} 
            username={username} 
            size="small" 
            color={avatarColor}
        />
        
        <!-- Username and Timestamp -->
        <div class="flex items-baseline space-x-2">
            <span class="text-base font-bold text-black leading-none">
                {username}
            </span>
            <span class="text-xs font-bold text-black text-opacity-[.48] leading-none">
                {timeAgo(timestamp)}
            </span>
        </div>
    </button>
    
    <!-- Spacer -->
    <div class="flex-1"></div>
    
    <!-- Action Display -->
    {#if actionLabel}
        <div class="flex items-center space-x-0 bg-white border border-black/16 rounded-full px-2 py-1">
            {#if actionIcon}
                <img 
                    class="w-4 h-4"
                    src="/icons/{getIconName(actionIcon)}.png" 
                    alt="icon {actionIcon}" 
                />
            {/if}
            <span class="text-xs font-bold text-black/86 leading-none px-1">
                {actionLabel}
            </span>
        </div>
    {/if}
</div> 