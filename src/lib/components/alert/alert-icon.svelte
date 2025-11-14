<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { type Base, HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { AlertBond } from './bond.svelte';
	import type { AlertIconProps } from './types';

	const bond = AlertBond.get();

	let {
		class: klass = '',
		base = Icon,
		preset = 'alert.icon',
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
	{preset}
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
