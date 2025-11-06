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
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = CollapsibleBond.get();

	let {
		class: klass = '',
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
	{bond}
	preset="collapsible.header"
	class={['border-border flex cursor-pointer items-center gap-2', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...collapsibleProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
