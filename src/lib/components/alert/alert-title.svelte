<script module lang="ts">
	export type AlertTitleProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ alert: AlertBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { AlertBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = AlertBond.get();

	const preset = getPreset('alert.title');

	let {
		as = preset?.as ?? ('h4' as E),
		base = preset?.base as B,
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AlertTitleProps<E, B> = $props();

	const titleProps = $derived({
		...bond?.title(),
		...restProps
	});
</script>

<HtmlAtom
	class={[
		'alert-title text-sm leading-tight font-medium',
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
	{...titleProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
