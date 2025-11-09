<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import type { TabDescriptionProps } from '../types';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { TabBond } from './bond.svelte';

	const bond = TabBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		children,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TabDescriptionProps<E, B> = $props();

	const descriptionProps = $derived({
		...bond?.description(),
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="tab.description"
	class={['border-border', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{as}
	{...descriptionProps}
>
	{@render children?.({ tab: bond })}
</HtmlAtom>
