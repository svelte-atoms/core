<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Pagination from './atoms';

	const { Story } = defineMeta({
		title: 'ATOMS/Pagination'
	});
</script>

<script>
	let page = $state(1);
</script>

<Story name="Default">
	{#snippet children()}
		<Pagination.Root bind:page total={10} onchange={(p) => console.log('page:', p)}>
			{#snippet children({ pages, isFirst, isLast, prev, next, goto, page: current })}
				<Pagination.Prev disabled={isFirst} onclick={prev} />

				{#each pages as p}
					{#if p === 'ellipsis'}
						<Pagination.Ellipsis />
					{:else}
						<Pagination.Item {page} active={p === current} onclick={() => goto(p)} />
					{/if}
				{/each}

				<Pagination.Next disabled={isLast} onclick={next} />
			{/snippet}
		</Pagination.Root>
		<p class="text-muted-foreground mt-2 text-sm">Current page: {page}</p>
	{/snippet}
</Story>

<Story name="Few Pages">
	{#snippet children()}
		<Pagination.Root page={2} total={4}>
			{#snippet children({ pages, isFirst, isLast, prev, next, goto, page: current })}
				<Pagination.Prev disabled={isFirst} onclick={prev} />
				{#each pages as p}
					{#if p === 'ellipsis'}
						<Pagination.Ellipsis />
					{:else}
						<Pagination.Item {page} active={p === current} onclick={() => goto(p)} />
					{/if}
				{/each}
				<Pagination.Next disabled={isLast} onclick={next} />
			{/snippet}
		</Pagination.Root>
	{/snippet}
</Story>

<Story name="With Labels">
	{#snippet children()}
		<Pagination.Root page={5} total={20}>
			{#snippet children({ pages, isFirst, isLast, prev, next, goto, page: current })}
				<Pagination.Prev disabled={isFirst} onclick={prev}>Previous</Pagination.Prev>
				{#each pages as p}
					{#if p === 'ellipsis'}
						<Pagination.Ellipsis />
					{:else}
						<Pagination.Item {page} active={p === current} onclick={() => goto(p)} />
					{/if}
				{/each}
				<Pagination.Next disabled={isLast} onclick={next}>Next</Pagination.Next>
			{/snippet}
		</Pagination.Root>
	{/snippet}
</Story>

<Story name="Custom Prev/Next">
	{#snippet children()}
		<Pagination.Root page={3} total={8}>
			{#snippet children({ pages, isFirst, isLast, prev, next, goto, page: current })}
				<Pagination.Prev disabled={isFirst} onclick={prev}>
					{#snippet indicatorContent()}
						<span class="text-xs">←</span>
					{/snippet}
				</Pagination.Prev>
				{#each pages as p}
					{#if p === 'ellipsis'}
						<Pagination.Ellipsis />
					{:else}
						<Pagination.Item {page} active={p === current} onclick={() => goto(p)} />
					{/if}
				{/each}
				<Pagination.Next disabled={isLast} onclick={next}>
					{#snippet indicatorContent()}
						<span class="text-xs">→</span>
					{/snippet}
				</Pagination.Next>
			{/snippet}
		</Pagination.Root>
	{/snippet}
</Story>
