<script module lang="ts">
	export type ScrollableContentProps<T extends keyof HTMLElementTagNameMap> = Override<
		HtmlAtomProps<T>,
		{
			children?: Snippet;
		}
	>;
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { Snippet } from 'svelte';
	import { ScrollableBond } from './bond.svelte';
	import type { Override } from '$svelte-atoms/core/types';
	import { HtmlAtom, type HtmlAtomProps } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	const bond = ScrollableBond.get();

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ScrollableContentProps<T> = $props();

	if (!bond) {
		throw new Error('ScrollableContent must be used within a ScrollableRoot');
	}
</script>

<HtmlAtom
	{bond}
	preset="scrollable.content"
	class={['scrollable-content border-border h-full max-h-full', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...bond.content()}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>
