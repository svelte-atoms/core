<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { animate as motion } from 'motion';
	import { Icon } from '$ixirjs/ui/components/icon';
	import IconArrowDown from '$ixirjs/ui/icons/icon-arrow-down.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { AccordionItemBond } from './bond.svelte';
	import type { AccordionItemIndicatorProps } from './types';

	const bond = AccordionItemBond.get();
	const isOpen = $derived(bond?.state?.isOpen ?? false);

	let {
		class: klass = '',
		children = undefined,
		preset = 'accordion.item.indicator',
		...restProps
	}: AccordionItemIndicatorProps<E, B> = $props();

	const indicatorProps = $derived({
		...bond?.indicator().spread,
		...restProps
	});

	function _animate(node: HTMLElement) {
		return motion(node, { rotate: 180 * +isOpen }, { duration: 0.3, ease: 'anticipate' });
	}
</script>

<HtmlAtom
	{preset}
	class={['border-border pointer-events-none flex items-center justify-center', '$preset', klass]}
	{...indicatorProps}
>
	{#if children}
		{@render children({ accordionItem: bond })}
	{:else}
		<Icon src={IconArrowDown} />
	{/if}
</HtmlAtom>
