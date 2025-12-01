<script module lang="ts">
	export type PageContent = {
		title: string;
		href?: string;
		children?: PageContent[];
	};
</script>

<script lang="ts">
	import { Tree } from '$lib/components/tree';
	import { Scrollable } from '$lib/components/scrollable';

	let { data, pathname = '' } = $props();
</script>

{#snippet tree(item: PageContent)}
	{#if item.children && item.children.length > 0}
		<Tree.Root>
			<Tree.Header class="hover:text-foreground/80 py-2 font-medium">{item.title}</Tree.Header>
			<Tree.Body class="text-muted-foreground flex flex-col gap-1 pl-4 text-sm">
				{#each item.children as child (child)}
					{@render tree(child)}
				{/each}
			</Tree.Body>
		</Tree.Root>
	{:else if item.href}
		<a
			href={item.href}
			class="hover:text-foreground block py-1 transition-colors {pathname === item.href
				? 'text-foreground font-medium'
				: ''}"
		>
			{item.title}
		</a>
	{:else}
		<div class="py-1">{item.title}</div>
	{/if}
{/snippet}

<Scrollable.Root as="aside" class="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 lg:block" style="height: calc(100vh - 4rem);">
	<Scrollable.Container>
		<Scrollable.Content class="text-foreground flex flex-col gap-2 px-4 py-6">
			{#each data as item (item)}
				{@render tree(item)}
			{/each}
		</Scrollable.Content>
	</Scrollable.Container>

	<Scrollable.Track>
		<Scrollable.Thumb
			orientation="vertical"
			class="left-[50%] w-2 origin-center translate-x-[-50%] rounded-none transition-colors"
		/>
	</Scrollable.Track>
</Scrollable.Root>
