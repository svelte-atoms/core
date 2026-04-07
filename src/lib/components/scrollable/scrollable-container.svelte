<script module lang="ts">
	export type { ScrollableContainerProps } from './types';
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends import('./bond.svelte').ScrollableBond = import('./bond.svelte').ScrollableBond">
	import type { ScrollableContainerProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { resizeObserver } from '$svelte-atoms/core/attachments/resize-observer.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import './scrollable-container.css';

	let {
		class: klass = '',
		children,
		onmount,
		ondestroy,
		animate,
		enter,
		exit,
		initial,
		...restProps
	}: ScrollableContainerProps<E, B> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableContainer must be used within a ScrollableRoot');
	}

	const containerProps = $derived({
		...bond.container().spread,
		...restProps
	});
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
	as="div"
	preset="scrollable.container"
	class={[
		'scrollable-container border-border h-full max-h-full w-full overflow-auto',
		'$preset',
		klass
	]}
	{enter}
	{exit}
	{initial}
	{animate}
	{onmount}
	{ondestroy}
	{...containerProps}
>
	{#if children}
		{@render children()}
	{/if}
</HtmlAtom>
