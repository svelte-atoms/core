<script module lang="ts">
	export type AlertIconProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ alert: AlertBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { AlertBond } from './bond.svelte';

	import { Icon } from '$svelte-atoms/core/components/icon';
	import { type HtmlAtomProps, type Base, HtmlAtom } from '$svelte-atoms/core/components/atom';

	const bond = AlertBond.get();

	let {
		class: klass = '',
		base = Icon,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AlertIconProps<E, B> = $props();

	const iconProps = $derived({
		...bond?.icon(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	{base}
	preset="alert.icon"
	class={[
		'alert-icon border-border inline-flex aspect-square h-5 items-center justify-center rounded-full text-sm font-medium',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...iconProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
