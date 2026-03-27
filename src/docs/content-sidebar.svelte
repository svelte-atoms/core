<script module lang="ts">
	export type PageContent = {
		title: string;
		href?: string;
		disabled?: boolean;
		children?: PageContent[];
	};
</script>

<script lang="ts">
	import { Tree } from '$lib/components/tree';
	import { Scrollable } from '$lib/components/scrollable';

	let { data, pathname = '', mobile = false } = $props();
</script>

{#snippet tree(item: PageContent)}
	{#if item.children && item.children.length > 0}
		<Tree.Root open>
			<Tree.Header class="text-muted-foreground hover:text-foreground/80 py-2 text-xs font-medium uppercase tracking-widest text-right" disabled={item.disabled}
				>{item.title}</Tree.Header
			>
			<Tree.Body class="text-muted-foreground flex flex-col gap-1 pr-4 text-sm text-right">
				{#each item.children as child, i (i)}
					{@render tree(child)}
				{/each}
			</Tree.Body>
		</Tree.Root>
	{:else if item.href}
		<a
			href={item.disabled ? undefined : item.href}
			class={[
				'hover:text-foreground block py-1 text-right transition-colors',
				pathname.startsWith(item.href) ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground',
				item.disabled ? 'pointer-events-none opacity-50' : ''
			]}
			aria-disabled={item.disabled}
		>
			{item.title}
		</a>
	{:else}
		<div class="py-1">{item.title}</div>
	{/if}
{/snippet}

<Scrollable.Root
	as="aside"
	class={mobile
		? 'h-full w-full docs-scroll'
		: 'sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 docs-scroll lg:block'}
>
	<Scrollable.Container>
		<Scrollable.Content class={["text-foreground flex flex-col gap-2 px-4 items-end", mobile ? '' : 'py-6']}>
			{#each data as item, i (i)}
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
