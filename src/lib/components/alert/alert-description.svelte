<script module lang="ts">
	export type AlertDescriptionProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ alert: AlertBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { AlertBond } from './bond.svelte';

	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = AlertBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AlertDescriptionProps<E, B> = $props();

	const descriptionProps = $derived({
		...bond?.description(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="alert.description"
	class={['alert-description border-border mt-1 text-sm leading-relaxed', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{as}
	{...descriptionProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
