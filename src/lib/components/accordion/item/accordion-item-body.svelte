<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { AccordionItemBond } from './bond.svelte';
	import type { AccordionItemBodyProps } from './types';

	const bond = AccordionItemBond.get();
	const isOpen = $derived(bond?.state.isOpen ?? false);

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		preset = 'accordion.item.body',
		...restProps
	}: AccordionItemBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

{#if isOpen}
	<HtmlAtom
		{preset}
		{bond}
		class={['border-border box-content', '$preset', klass]}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		{...bodyProps}
	>
		{@render children?.({ accordionItem: bond })}
	</HtmlAtom>
{/if}
