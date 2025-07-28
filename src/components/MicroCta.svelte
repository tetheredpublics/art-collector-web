<script lang="ts">
    export let friend: string
</script>
<div class="bg-appGrey rounded-lg p-4 mx-3 my-4 md:mx-0 flex items-center justify-between max-w-full space-x-4">
    <img 
        class="w-[32px] h-[32-px]"
        src="/icons/shoe-print.png" 
        alt="icon walk" 
    />
    <p class="text-black text-opacity-[.84] text-sm leading-[22px]">
        Join <strong class="text-bold text-black">{friend}</strong> and collect great art from around the world. Your first piece is free – walk to unlock the next.
    </p>
</div>