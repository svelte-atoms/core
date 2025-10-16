<script module>
	export type AccordionItemRootProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ accordionItem: AccordionItemBond }]>;
		value?: string;
		data?: any;
		disabled?: boolean;
		factory?: Factory<AccordionItemBond>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { nanoid } from 'nanoid';
	import {
		AccordionItemBond,
		AccordionItemBondState,
		type AccordionItemBondProps
	} from './bond.svelte';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import type { Factory } from '$svelte-atoms/core/types';

	const preset = getPreset('accordion.item');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
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
	class={[toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass])]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{as}
	{base}
	{...rootProps}
>
	{@render children?.({ accordionItem: bond })}
</HtmlAtom>
