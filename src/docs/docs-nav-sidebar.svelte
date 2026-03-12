<script lang="ts">
	import type { PageContent } from './content-sidebar.svelte';
	import ContentSidebar from './content-sidebar.svelte';

	type Props = {
		data: PageContent[];
		pathname: string;
		open?: boolean;
		onclose?: () => void;
	};

	let { data, pathname, open = false, onclose }: Props = $props();
</script>

<!-- Desktop: always-visible sticky sidebar -->
<ContentSidebar {data} {pathname} />

<!-- Mobile: slide-in drawer from the left -->
{#if open}
	<div
		class="fixed inset-0 z-40 bg-black/40 lg:hidden"
		role="button"
		tabindex="-1"
		onclick={onclose}
		onkeydown={(e) => e.key === 'Escape' && onclose?.()}
		aria-label="Close navigation"
	></div>
	<div class="bg-background border-border fixed top-14 bottom-0 left-0 z-50 w-72 overflow-y-auto border-r shadow-xl lg:hidden">
		<ContentSidebar {data} {pathname} mobile={true} />
	</div>
{/if}
