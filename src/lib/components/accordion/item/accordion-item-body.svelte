<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AccordionItemBond } from './bond.svelte';
	import { enterAccordionItemBody, exitAccordionItemBody } from './motion.svelte';
	import type { AccordionItemBodyProps } from './types';

	const bond = AccordionItemBond.get();
	const isOpen = $derived(bond?.state.isOpen ?? false);

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		fallback = {
			enter: enterAccordionItemBody(),
			exit: exitAccordionItemBody()
		},
		preset = 'accordion.item.body',
		...restProps
	}: AccordionItemBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body().spread,
		...restProps
	});
</script>

<!-- TODO: refactor conditional rendering using snippet based -->
 
{#if isOpen}
	<HtmlAtom
		{preset}
		{bond}
		class={['border-border box-content h-0 opacity-0', '$preset', klass]}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		{fallback}
		{...bodyProps}
	>
		{@render children?.({ accordionItem: bond })}
	</HtmlAtom>
{/if}
