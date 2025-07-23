<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import AvatarView from './AvatarView.svelte';
    
    export let username = '';
    export let avatarUrl = '';
    export let avatarColor = '';
    export let timestamp = '';
    export let actionLabel = '';
    export let actionIcon = '';
    
    const dispatch = createEventDispatcher();
    
    function handleProfileClick() {
        dispatch('profileClick', { username });
    }
    
    function formatTimeAgo(dateString: string) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const now = new Date();
        
        // Check if date is valid
        if (isNaN(date.getTime())) return '';
        
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        
        // Calculate months more accurately
        const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
        if (months < 12) return `${months}mo ago`;
        
        const years = Math.floor(months / 12);
        return `${years}y ago`;
    }
    
    const iconMap = {
        "IconCollect": "collect",
        "IconDrop": "drop",
        "IconDestroy": "destroy",
    }

    const getIconName = (k: string) => iconMap[k as keyof typeof iconMap] || "collect";
</script>

<div class="flex items-center space-x-2 h-8">
    <!-- Avatar and Username Section (Clickable) -->
    <button 
        class="flex items-center space-x-2"
        on:click={handleProfileClick}
    >
        <!-- Avatar -->
        <AvatarView url={avatarUrl} {username} size="small" />
        
        <!-- Username and Timestamp -->
        <div class="flex items-baseline space-x-2">
            <span class="text-base font-bold text-black leading-none">
                {username}
            </span>
            <span class="text-xs font-bold text-black/48 leading-none">
                {formatTimeAgo(timestamp)}
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