<script module lang="ts">
	export type { ScrollableContainerProps } from './types';
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { ScrollableContainerProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { resizeObserver } from '$svelte-atoms/core/attachments/resize-observer.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
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
	}: ScrollableContainerProps<T> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableContainer must be used within a ScrollableRoot');
	}
</script>

<HtmlAtom
	{@attach (node) => {
		if (!bond) return;

		return resizeObserver(() => {
			bond.state.props.clientWidth = node.clientWidth;
			bond.state.props.clientHeight = node.clientHeight;
			bond.state.props.scrollWidth = node.scrollWidth;
			bond.state.props.scrollHeight = node.scrollHeight;
		})(node);
	}}
	{bond}
	preset="scrollable.container"
	class={[
		'scrollable-container border-border h-full max-h-full w-full overflow-auto',
		'$preset',
		klass
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...bond.container()}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>

<style>
	:global(.scrollable-container) {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
	}

	:global(.scrollable-container::-webkit-scrollbar) {
		display: none; /* WebKit */
	}

	:global(.scrollable-container[data-hide-scrollbar='true']) {
		--scrollbar-width: 0px;
	}

	:global(.scrollable-container[data-hide-scrollbar='false']) {
		--scrollbar-width: 16px;
		/* margin-right: calc(-1 * var(--scrollbar-width, 16px));
		margin-bottom: calc(-1 * var(--scrollbar-width, 16px));
		padding-right: var(--scrollbar-width, 16px);
		padding-bottom: var(--scrollbar-width, 16px); */
	}
</style>
