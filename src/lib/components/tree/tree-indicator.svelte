<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TreeBond } from './bond.svelte';
	import type { TreeIndicatorProps } from './types';

	const bond = TreeBond.get();

	let {
		open = $bindable(false),
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: TreeIndicatorProps<E, B> = $props();

	const atom = bond?.atom('indicator');

	const indicatorProps = $derived({
		preset: preset ?? atom?.preset,
		...atom?.spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	class={['aspect-square h-fit', '$preset', klass]}
	{...indicatorProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
