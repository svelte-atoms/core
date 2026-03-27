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
		<Drawer.Content side="right" class="bg-background border-border w-80 border-l p-0 shadow-xl flex flex-col" animate={animateDrawerContentFromRight({duration: DURATION.smooth/1000})}>
			<Drawer.Header class="border-b border-border px-6 py-4 flex items-center justify-between">
				<h4 class="text-foreground text-lg font-semibold">On this page</h4>
				<button 
					class="text-muted-foreground hover:text-foreground transition-colors"
					onclick={() => (open = false)}
					aria-label="Close table of contents"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</Drawer.Header>
			<Drawer.Body as="nav" class="flex-1 overflow-y-auto px-6 py-4">
				<div class="space-y-1">
					{#each toc as entry (entry.id)}
						<a
							href="#{entry.id}"
							onclick={(e) => handleAnchorClick(e, entry.id)}
							class={[
								'flex items-center py-2 px-3 rounded-md text-sm transition-all duration-200',
								activeId === entry.id
									? 'text-foreground bg-primary/10 font-medium border-l-2 border-primary pl-2.5'
									: 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
							]}
						>
							{#if activeId === entry.id}
								<div class="w-2 h-2 rounded-full bg-primary mr-2"></div>
							{/if}
							<span>{entry.text}</span>
						</a>
					{/each}
				</div>
			</Drawer.Body>
		</Drawer.Content>
	{/snippet}
</Drawer.Root>
