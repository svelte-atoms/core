<script lang="ts" module>
	export type AccordionItemIndicatorProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ accordionItem: AccordionItemBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { animate as motion } from 'motion';
	import { AccordionItemBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import IconArrowDown from '$svelte-atoms/core/icons/icon-arrow-down.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = AccordionItemBond.get();
	const isOpen = $derived(bond?.state?.isOpen ?? false);

	const preset = getPreset('accordion.item.indicator');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AccordionItemIndicatorProps<E, B> = $props();

	const indicatorProps = $derived({
		...bond?.indicator(),
		...restProps
	});

	function _animate(node: HTMLElement) {
		return motion(node, { rotate: 180 * +isOpen }, { duration: 0.3, ease: 'anticipate' });
	}
</script>

<HtmlAtom
	class={[
		'pointer-events-none flex items-center justify-center',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{as}
	{base}
	{...indicatorProps}
>
	{#if children}
		{@render children({ accordionItem: bond })}
	{:else}
		<Icon src={IconArrowDown} />
	{/if}
</HtmlAtom>
