<script lang="ts" module>
	export type CollapsibleHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> &
		TreeBondProps & {
			children?: Snippet<[{ tree?: TreeBond }]>;
		};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { TreeBond, type TreeBondProps } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = TreeBond.get();

	const preset = getPreset('tree.indicator');

	let {
		open = $bindable(false),
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
	}: CollapsibleHeaderProps<E, B> = $props();

	const indicatorProps = $derived({
		...bond?.indicator(),
		...restProps
	});
</script>

<HtmlAtom
	class={[
		'aspect-square h-fit',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{as}
	{base}
	{...indicatorProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
