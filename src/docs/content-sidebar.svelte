<script module lang="ts">
	export type PageContent = {
		title: string;
		href?: string;
		children?: PageContent[];
	};
</script>

<script lang="ts">
	import { Tree } from '$lib/components/tree';

	let { data, pathname = '' } = $props();
</script>

{#snippet tree(item: PageContent)}
	{#if item.children && item.children.length > 0}
		<Tree.Root>
			<Tree.Header class="py-2 font-medium hover:text-foreground/80">{item.title}</Tree.Header>
			<Tree.Body class="flex flex-col gap-1 pl-4 text-sm text-muted-foreground">
				{#each item.children as child (child)}
					{@render tree(child)}
				{/each}
			</Tree.Body>
		</Tree.Root>
	{:else if item.href}
		<a
			href={item.href}
			class="block py-1 transition-colors hover:text-foreground {pathname === item.href
				? 'font-medium text-foreground'
				: ''}"
		>
			{item.title}
		</a>
	{:else}
		<div class="py-1">{item.title}</div>
	{/if}
{/snippet}

<div class="flex flex-col gap-2 px-4 py-6 text-foreground">
	{#each data as item (item)}
		{@render tree(item)}
	{/each}
</div>
