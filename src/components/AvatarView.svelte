<script lang="ts">
    export let url = '';
    export let username = '';
    export let size: 'small' | 'medium' | 'large' = 'medium';
    export let color = '';
    
    const sizeClasses = {
        small: 'w-8 h-8 text-sm',
        medium: 'w-12 h-12 text-base',
        large: 'w-16 h-16 text-lg'
    };
    
    $: sizeClass = sizeClasses[size];

    let Colors: { [key: string]: string } = {
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
    } as const;

    $: backgroundColor = Colors[color]
</script>

<div class="rounded-full overflow-hidden bg-gray-200 flex-shrink-0 {sizeClass}" style="background-color: {backgroundColor};">
    {#if url}
        <img src={url} alt="{username}" class="w-full h-full object-cover" />
    {:else}
        <div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {username}
        </div>
    {/if}
</div> 