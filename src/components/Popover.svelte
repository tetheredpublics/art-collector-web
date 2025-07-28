<!-- Popover.svelte -->
<script>
    import { onDestroy } from 'svelte';
    import {  portal} from "svelte-portal";

    export let visible = false;

    function closePopover() {
        visible = false
    }

    // @ts-ignore
    function handleClickOutside(event) {
        if (!event.target.closest('.popover') && !event.target.closest('.popover-button')) {
            visible = false;
        }
    }

    // Add event listener for handling clicks outside
    if (typeof window !== 'undefined') {
        window.addEventListener('click', handleClickOutside);
    }

    // Cleanup the event listener
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('click', handleClickOutside);
        }
    });
</script>

{#if visible}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div use:portal={"body"} class="bg-black/50 fixed z-[999] flex justify-center items-center !mx-0 !top-0 !right-0 !bottom-0 !left-0">
    <div class="popover border-2 border-slate-500 z-[5] bg-white p-2 relative container rounded-lg max-w-full md:max-w-sm">
        <div class="text-right">
            <button class="hover:cursor-pointer" on:click={closePopover}>
                <img class="size-6" alt="close popover" src="/icons/close.svg"/>
            </button>
        </div>
        <div class="px-5 pb-5">
            <slot></slot>
        </div>
    </div>
</div>
{/if}