<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TreeBond } from './bond.svelte';
	import type { TreeBodyProps } from './types';
	import { animateTreeBody } from './motion.svelte';

	const bond = TreeBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		fallback = {
			animate: animateTreeBody(),
			initial: animateTreeBody({ duration: 0 })
		},
		...restProps
	}: TreeBodyProps<E, B> = $props();

	const atom = bond?.atom('body');

	const bodyProps = $derived({
		preset: preset ?? atom?.preset,
		...atom?.spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	class={['pl-4', '$preset', klass]}
	{fallback}
	{...bodyProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
