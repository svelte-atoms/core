<script lang="ts">
	import type { PageContent } from './content-sidebar.svelte';
	import ContentSidebar from './content-sidebar.svelte';
	import { Drawer } from '$lib/components/drawer';

	type Props = {
		data: PageContent[];
		pathname: string;
		open?: boolean;
		onclose?: () => void;
	};

	let { data, pathname, open = $bindable(false), onclose }: Props = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}
</script>

<!-- Desktop: always-visible sticky sidebar -->
<ContentSidebar {data} {pathname} />

<!-- Mobile: internal Drawer component -->
<Drawer.Root bind:open {onclose} class="lg:hidden">
	{#snippet children({ drawer })}
		<Drawer.Backdrop {drawer} class="bg-black/40" />
		<Drawer.Content
			{drawer}
			side="left"
			class="bg-background border-border w-72 border-r p-0 shadow-xl"
		>
			<Drawer.Body {drawer} class="p-0 overflow-y-auto h-full">
				<ContentSidebar {data} {pathname} mobile={true} />
			</Drawer.Body>
		</Drawer.Content>
	{/snippet}
</Drawer.Root>
