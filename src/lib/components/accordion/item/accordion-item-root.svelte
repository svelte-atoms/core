<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import {
		AccordionItemBond,
		AccordionItemBondState,
		type AccordionItemBondProps
	} from './bond.svelte';
	import type { AccordionItemRootProps } from './types';

	let {
		class: klass = '',
		value = nanoid(),
		data = undefined,
		disabled = false,
		factory = _factory,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AccordionItemRootProps<E, B> = $props();

	const accordionItemProps = defineState<AccordionItemBondProps>([
		defineProperty('data', () => data),
		defineProperty('disabled', () => disabled),
		defineProperty('value', () => value)
	]);
	const bond = factory(accordionItemProps).share();

	bond.state.mount();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof accordionItemProps) {
		const accordionItemState = new AccordionItemBondState(() => props);
		return new AccordionItemBond(accordionItemState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{bond}
	preset="accordion.item"
	class={['border-border', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...rootProps}
>
	{@render children?.({ accordionItem: bond })}
</HtmlAtom>
