<!-- Popover.svelte -->
<script>
	import { onMount } from 'svelte';

	export let visible = false;

	function portal(node) {
		if (typeof document === 'undefined') {
			return {};
		}

		document.body.appendChild(node);
		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			}
		};
	}

	function closePopover() {
		visible = false;
	}

	function handleClickOutside(event) {
		if (!(event.target instanceof Element)) {
			return;
		}

		if (!event.target.closest('.popover') && !event.target.closest('.popover-button')) {
			visible = false;
		}
	}

	onMount(() => {
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('click', handleClickOutside);
		};
	});
</script>

{#if visible}
	<div
		use:portal
		class="bg-black/50 fixed z-[999] flex justify-center items-center !mx-0 !top-0 !right-0 !bottom-0 !left-0"
	>
		<div
			class="popover border-2 border-slate-500 z-[5] bg-white p-2 relative container rounded-lg max-w-full md:max-w-sm"
		>
			<div class="text-right">
				<button class="hover:cursor-pointer" on:click={closePopover}>
					<img class="size-6" alt="close popover" src="/icons/close.svg" />
				</button>
			</div>
			<div class="px-5 pb-5">
				<slot />
			</div>
		</div>
	</div>
{/if}
