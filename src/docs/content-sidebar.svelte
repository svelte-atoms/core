<script module lang="ts">
	type PageContent = {
		title: string;
		children: PageContent[];
	};

	type Props = {
		data: PageContent[];
	};
</script>

<script lang="ts">
	import { Tree } from '$lib/components/tree';

	let { data } = $props();
</script>

{#snippet tree(item: PageContent)}
	<Tree.Root>
		<Tree.Header class="">{item.title}</Tree.Header>
		<Tree.Body class="text-foreground/50">
			{#each item.children as child (child)}
				{@render tree(child)}
			{/each}
		</Tree.Body>
	</Tree.Root>
{/snippet}

<div class="text-foreground flex flex-col gap-2 px-4 py-10">
	{#each data as item (item)}
		{@render tree(item)}
	{/each}
</div>
