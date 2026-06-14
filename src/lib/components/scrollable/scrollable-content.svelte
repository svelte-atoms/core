<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { ScrollableContentProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';

	const bond = ScrollableBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children,
		...restProps
	}: ScrollableContentProps<E, B> = $props();

	if (!bond) {
		throw new Error('ScrollableContent must be used within a ScrollableRoot');
	}

	const atom = bond.atom('content');

	const contentProps = $derived({
		preset: preset ?? atom.preset,
		...atom.spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	as="div"
	class={['scrollable-content border-border h-full max-h-full', '$preset', klass]}
	{...contentProps}
>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>
