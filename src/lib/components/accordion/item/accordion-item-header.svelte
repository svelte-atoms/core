<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AccordionItemBond } from './bond.svelte';
	import type { AccordionItemHeaderProps } from './types';

	let {
		class: klass = '',
		as = 'button',
		children = undefined,
		onpointerdown = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AccordionItemHeaderProps = $props();

	const bond = AccordionItemBond.get();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<HtmlAtom
	{as}
	{bond}
	preset="accordion.item.header"
	class={[
		'border-border relative box-border flex w-full cursor-pointer items-center',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	tabindex={as !== 'button' ? 0 : undefined}
	{...headerProps}
>
	{@render children?.({
		accordionItem: bond
	})}
</HtmlAtom>
