<script module lang="ts">
	export type CollapsibleHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ collapsible?: CollapsibleBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { CollapsibleBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = CollapsibleBond.get();

	const preset = getPreset('collapsible.header');

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
	}: CollapsibleHeaderProps<E, B> = $props();

	const collapsibleProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<HtmlAtom
	class={[
		'flex cursor-pointer items-center gap-2',
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
	{...collapsibleProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
