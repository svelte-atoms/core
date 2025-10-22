<script module lang="ts">
	export type AlertActionsProps<
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

	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

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
	}: AlertActionsProps<E, B> & HTMLAttributes<Element> = $props();

	const actionsProps = $derived({
		...bond?.actions(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="alert.actions"
	class={['alert-actions mt-3 flex items-center gap-2', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...actionsProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
