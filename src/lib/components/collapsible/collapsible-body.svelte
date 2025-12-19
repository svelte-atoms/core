<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { CollapsibleBond } from './bond.svelte';
	import { animateCollapsibleBody } from './motion.svelte';
	import type { CollapsibleBodyProps } from './types';

	const bond = CollapsibleBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = animateCollapsibleBody(),
		enter = undefined,
		exit = undefined,
		initial = animateCollapsibleBody({ duration: 0 }),
		...restProps
	}: CollapsibleBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="collapsible.body"
	class={['border-border', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...bodyProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
