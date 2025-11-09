<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { animate as motion } from 'motion';
	import { Icon } from '$svelte-atoms/core/components/icon';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import IconArrowDown from '$svelte-atoms/core/icons/icon-arrow-down.svelte';
	import { CollapsibleBond } from './bond.svelte';
	import type { CollapsibleIndicatorProps } from './types';

	const bond = CollapsibleBond.get();
	const isOpen = $derived(bond?.state.props.open ?? false);

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: CollapsibleIndicatorProps<E, B> = $props();
	const indicatorProps = $derived({
		...bond?.indicator(),
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
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	{...indicatorProps}
>
	{#if children}
		{@render children?.({ collapsible: bond })}
	{:else}
		<Icon src={IconArrowDown} />
	{/if}
</HtmlAtom>
