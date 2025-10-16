<script module lang="ts">
	export type AlertContentProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ alert: AlertBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { AlertBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	const preset = getPreset('alert.content');

	let {
		as = preset?.as ?? ('div' as E),
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
	}: AlertContentProps<E, B> & HTMLAttributes<Element> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});
</script>

<HtmlAtom
	class={[
		'alert-content flex-1 space-y-1',
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
	{...contentProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
