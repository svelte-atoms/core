<script module lang="ts">
	export type CollapsibleHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = Override<
		HtmlAtomProps<E, B>,
		{
			children?: Snippet<[{ collapsible?: CollapsibleBond }]>;
		}
	>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { animate as motion } from 'motion';
	import { CollapsibleBond } from './bond.svelte';
	import { Icon } from '$svelte-atoms/core/components/icon';

	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import IconArrowDown from '$svelte-atoms/core/icons/icon-arrow-down.svelte';

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
	}: CollapsibleHeaderProps<E, B> = $props();

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
