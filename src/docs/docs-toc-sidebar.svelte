<script lang="ts">
	import { animateDrawerContentFromRight, Drawer } from '$lib/components/drawer';
	import { DURATION } from '$svelte-atoms/core';

	type TocEntry = { id: string; text: string };

	type Props = {
		toc: TocEntry[];
		activeId?: string;
		open?: boolean;
		onclose?: () => void;
	};

	let { toc, activeId = '', open = $bindable(false), onclose }: Props = $props();

	function handleClose() {
		open = false;
		onclose?.();
	}

	    function handleAnchorClick(event: MouseEvent, id: string) {
        event.preventDefault();
        handleClose();

        // Let the drawer close animation complete before scrolling
        setTimeout(() => {
            const target = document.getElementById(id);
            target?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
</script>

<!-- Desktop: always-visible sticky aside -->
{#if toc.length > 0}
	<aside class="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto docs-scroll xl:block">
		<div class="py-6 text-sm">
			<h4 class="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">
				On this page
			</h4>
			<nav class="space-y-0.5">
				{#each toc as entry (entry.id)}
					<a
						href="#{entry.id}"
						tabindex="-1"
						onclick={(e) => handleAnchorClick(e, entry.id)}
						class={[
							'block py-1 pr-2 text-sm transition-colors',
							activeId === entry.id
								? 'text-foreground font-medium'
								: 'text-muted-foreground/60 hover:text-foreground'
						]}
					>{entry.text}</a>
				{/each}
			</nav>
		</div>
	</aside>
{/if}

<!-- Mobile: Drawer from right -->
<Drawer.Root bind:open {onclose} class="lg:hidden z-50">
	{#snippet children({ drawer })}
		<Drawer.Backdrop class={['duration-75 bg-black/0 transition-[backdrop-filter]', drawer.state.props.open ? 'backdrop-grayscale-100' : '']} />
		<Drawer.Content side="right" class="bg-background border-border w-72 border-l p-0 shadow-xl" animate={animateDrawerContentFromRight({duration: DURATION.smooth/1000})}>
		<Drawer.Header as="h4" class="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">On this page</Drawer.Header>
		<Drawer.Body as="nav" class="h-full overflow-y-auto p-4 gap-0.5">
			{#each toc as entry (entry.id)}
				<a
					href="#{entry.id}"
					onclick={(e) => handleAnchorClick(e, entry.id)}
					class={[
						'block py-1.5 text-sm transition-colors',
						activeId === entry.id
							? 'text-foreground font-medium'
							: 'text-muted-foreground hover:text-foreground'
					]}
				>{entry.text}</a>
			{/each}
		</Drawer.Body>
		</Drawer.Content>
	{/snippet}
</Drawer.Root>
