<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends import('./bond.svelte').ScrollableBond = import('./bond.svelte').ScrollableBond">
	import type { ScrollableContentProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { HtmlAtom } from '$ixirjs/ui/components/atom';

	const bond = ScrollableBond.get();

	let {
		class: klass = '',
		children,
		...restProps
	}: ScrollableContentProps<E, B> = $props();

	if (!bond) {
		throw new Error('ScrollableContent must be used within a ScrollableRoot');
	}

	const contentProps = $derived({
		...bond.content().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	as="div"
	preset="scrollable.content"
	class={['scrollable-content border-border h-full max-h-full', '$preset', klass]}
	{...contentProps}
>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>
