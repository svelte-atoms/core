<script lang="ts">
	import { Drawer } from '$lib/components/drawer';

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
</script>

<!-- Desktop: always-visible sticky aside -->
{#if toc.length > 0}
	<aside class="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto docs-scroll xl:block">
		<div class="py-6 text-sm">
			<h4 class="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">
				On this page
			</h4>
			<nav class="space-y-0.5">
				{#each toc as entry (entry.id)}
					<a
						href="#{entry.id}"
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
{#if toc.length > 0}
	<Drawer.Root bind:open {onclose} class="lg:hidden">
		{#snippet children({ drawer })}
			<Drawer.Backdrop {drawer} />
			<Drawer.Content {drawer} side="right" class="bg-background border-border w-72 border-l p-0 shadow-xl">
				<Drawer.Body {drawer} class="h-full overflow-y-auto p-4">
					<h4 class="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">On this page</h4>
					<nav class="space-y-0.5">
						{#each toc as entry (entry.id)}
							<a
								href="#{entry.id}"
								onclick={handleClose}
								class={[
									'block py-1.5 text-sm transition-colors',
									activeId === entry.id
										? 'text-foreground font-medium'
										: 'text-muted-foreground hover:text-foreground'
								]}
							>{entry.text}</a>
						{/each}
					</nav>
				</Drawer.Body>
			</Drawer.Content>
		{/snippet}
	</Drawer.Root>
{/if}
