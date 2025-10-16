<script module lang="ts">
	export type DrawerBodyProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			as?: E;
			children?: Snippet<[{ drawer?: DrawerBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { Override } from '$svelte-atoms/core/types';
	import { DrawerBond } from './bond.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	type Element = HTMLElementTagNameMap[E];

	const preset = getPreset('drawer.body');

	let {
		class: klass = '',
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DrawerBodyProps<E, B> & HTMLAttributes<Element> = $props();

	const bond = DrawerBond.get();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{base}
	class={[toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass])]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...bodyProps}
>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
