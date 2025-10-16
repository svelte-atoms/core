<script module lang="ts">
	export type TreeBodyProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		open?: boolean;
		disabled?: boolean;
		children?: Snippet<[{ tree?: TreeBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { TreeBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = TreeBond.get();

	const preset = getPreset('tree.body');

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
	}: TreeBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

<HtmlAtom
	class={['pl-4', toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass])]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{as}
	{base}
	{...bodyProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
