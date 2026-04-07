<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends import('./bond.svelte').ScrollableBond = import('./bond.svelte').ScrollableBond">
	import type { ScrollableContentProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	const bond = ScrollableBond.get();

	let {
		class: klass = '',
		children,
		onmount,
		ondestroy,
		animate,
		enter,
		exit,
		initial,
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
	{enter}
	{exit}
	{initial}
	{animate}
	{onmount}
	{ondestroy}
	{...contentProps}
>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>
