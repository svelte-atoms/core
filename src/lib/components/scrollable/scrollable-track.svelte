<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends import('./bond.svelte').ScrollableBond = import('./bond.svelte').ScrollableBond">
	import type { ScrollableTrackProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',
		orientation = 'vertical',
		children,
		onmount,
		ondestroy,
		animate,
		enter,
		exit,
		initial,
		...restProps
	}: ScrollableTrackProps<E, B> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableTrack must be used within a ScrollableRoot');
	}

	const hasYScroll = $derived(bond.state.props.scrollHeight > bond.state.props.clientHeight);
	const hasXScroll = $derived(bond.state.props.scrollWidth > bond.state.props.clientWidth);
	const hasScroll = $derived(hasXScroll || hasYScroll);
	const isOpen = $derived(bond?.state?.props?.open ?? true);
	const isScrolling = $derived(bond?.state?.props?.isScrolling ?? false);

	const trackProps = $derived({
		...(orientation === 'horizontal' ? bond.trackX().spread : bond.trackY().spread),
		...restProps
	});
</script>

{#if (isOpen || isScrolling) && hasScroll}
	<HtmlAtom
		{bond}
		as="div"
		preset="scrollable.track"
		class={[
			'scrollable-track bg-foreground/10 hover:bg-foreground/15 border-border absolute z-10 rounded transition-opacity',
			{ vertical: 'inset-y-0 right-0 w-2', horizontal: 'inset-x-0 bottom-0 h-2' }[orientation],
			'$preset',
			klass
		]}
		{enter}
		{exit}
		{initial}
		{animate}
		{onmount}
		{ondestroy}
		{...trackProps}
	>
		{@render children?.()}
	</HtmlAtom>
{/if}
