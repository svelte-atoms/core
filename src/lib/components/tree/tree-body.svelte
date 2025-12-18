<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TreeBond } from './bond.svelte';
	import type { TreeBodyProps } from './types';
	import { animateTreeBody } from './motion.svelte';

	const bond = TreeBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = animateTreeBody(),
		enter = undefined,
		exit = undefined,
		initial = animateTreeBody({ duration: 0 }),
		...restProps
	}: TreeBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="tree.body"
	class={['border-border pl-4', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...bodyProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
