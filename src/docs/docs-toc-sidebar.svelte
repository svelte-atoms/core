<script lang="ts">
	type TocEntry = { id: string; text: string };

	type Props = {
		toc: TocEntry[];
		activeId?: string;
		open?: boolean;
		onclose?: () => void;
	};

	let { toc, activeId = '', open = false, onclose }: Props = $props();

	const activeText = $derived(
		toc.find((t) => t.id === activeId)?.text ?? toc[0]?.text ?? ''
	);
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

<!-- Mobile: slide-in drawer from the right -->
{#if open && toc.length > 0}
	<div
		class="fixed inset-0 z-40 bg-black/40 lg:hidden"
		role="button"
		tabindex="-1"
		onclick={onclose}
		onkeydown={(e) => e.key === 'Escape' && onclose?.()}
		aria-label="Close table of contents"
	></div>
	<div class="bg-background border-border fixed top-14 right-0 bottom-0 z-50 w-72 overflow-y-auto border-l shadow-xl lg:hidden">
		<div class="p-4 text-sm">
			<h4 class="text-foreground mb-3 text-xs font-semibold uppercase tracking-wider">On this page</h4>
			<nav class="space-y-0.5">
				{#each toc as entry (entry.id)}
					<a
						href="#{entry.id}"
						onclick={onclose}
						class={[
							'block py-1.5 text-sm transition-colors',
							activeId === entry.id
								? 'text-foreground font-medium'
								: 'text-muted-foreground hover:text-foreground'
						]}
					>{entry.text}</a>
				{/each}
			</nav>
		</div>
	</div>
{/if}
