<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AlertBond } from './bond.svelte';
	import type { AlertContentProps } from './types';

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
	}: AlertContentProps<E, B> & HTMLAttributes<Element> = $props();

	const contentProps = $derived({
		...bond?.content(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="alert.content"
	class={['alert-content border-border flex-1 space-y-1', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...contentProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
