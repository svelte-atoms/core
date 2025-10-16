<script lang="ts" module>
	export type AccordionItemBodyProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ accordionItem: AccordionItemBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { AccordionItemBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = AccordionItemBond.get();
	const isOpen = $derived(bond?.state.isOpen ?? false);

	const accordionItemBond = AccordionItemBond.get();

	const preset = getPreset('accordion.item.body');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AccordionItemBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body(),
		...restProps
	});
</script>

{#if isOpen}
	<HtmlAtom
		class={[
			'box-content',
			toClassValue.apply(bond, [preset?.class, { bond: accordionItemBond }]),
			toClassValue.apply(bond, [klass, { bond: accordionItemBond }])
		]}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		{as}
		{base}
		{...bodyProps}
	>
		{@render children?.({ accordionItem: bond })}
	</HtmlAtom>
{/if}
