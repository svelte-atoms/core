<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$ixirjs/ui/utils';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import {
		AccordionItemBond,
		AccordionItemBondState,
		type AccordionItemBondProps
	} from './bond.svelte';
	import type { AccordionItemRootProps } from './types';
	import { untrack } from 'svelte';

	let {
		class: klass = '',
		value = nanoid(),
		data = undefined,
		disabled = false,
		factory = _factory,
		children = undefined,
		preset = 'accordion.item',
		...restProps
	}: AccordionItemRootProps<E, B> = $props();

	const accordionItemProps = defineState<AccordionItemBondProps>([
		defineProperty('data', () => data),
		defineProperty('disabled', () => disabled),
		defineProperty('value', () => value)
	]);
	const bond = untrack(()=> factory(accordionItemProps)).share();

	bond.state.mount();

	const rootProps = $derived({
		...bond.root().spread,
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
	{preset}
	class={['border-border', '$preset', klass]}
	{...rootProps}
>
	{@render children?.({ accordionItem: bond })}
</HtmlAtom>
