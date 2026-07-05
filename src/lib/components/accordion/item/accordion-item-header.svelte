<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { AccordionItemBond } from './bond.svelte';
	import type { AccordionItemHeaderProps } from './types';

	let {
		class: klass = '',
		as = 'button',
		children = undefined,
		preset = 'accordion.item.header',
		...restProps
	}: AccordionItemHeaderProps = $props();

	const bond = AccordionItemBond.get();

	const headerProps = $derived({
		...bond?.header().spread,
		...restProps
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<HtmlAtom
	{as}
	{bond}
	{preset}
	class={[
		'border-border relative box-border flex w-full cursor-pointer items-center',
		'$preset',
		klass
	]}
	tabindex={as !== 'button' ? 0 : undefined}
	{...headerProps}
>
	{@render children?.({
		accordionItem: bond
	})}
</HtmlAtom>
