<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { animate as motion } from 'motion';
	import { Icon } from '$ixirjs/ui/components/icon';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import IconArrowDown from '$ixirjs/ui/icons/icon-arrow-down.svelte';
	import { CollapsibleBond } from './bond.svelte';
	import type { CollapsibleIndicatorProps } from './types';

	const bond = CollapsibleBond.get();
	const isOpen = $derived(bond?.state.props.open ?? false);

	let {
		class: klass = '',
		children = undefined,
		...restProps
	}: CollapsibleIndicatorProps<E, B> = $props();
	const indicatorProps = $derived({
		...bond?.indicator().spread,
		...restProps
	});

	function _animate(node: HTMLElement) {
		motion(node, { rotate: 180 * +isOpen }, { duration: 0.3, ease: 'anticipate' });
	}
</script>

<HtmlAtom
	{bond}
	preset="collapsible.indicator"
	class={['border-border flex size-4 items-center justify-center', '$preset', klass]}
	{...indicatorProps}
>
	{#if children}
		{@render children?.({ collapsible: bond })}
	{:else}
		<Icon src={IconArrowDown} />
	{/if}
</HtmlAtom>
