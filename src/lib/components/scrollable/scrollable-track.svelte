<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { ScrollableTrackProps } from './types';
	import { ScrollableBond } from './bond.svelte';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',

		orientation = undefined,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ScrollableTrackProps<T> = $props();

	const bond = ScrollableBond.get();

	if (!bond) {
		throw new Error('ScrollableTrack must be used within a ScrollableRoot');
	}

	const hasYScroll = $derived(bond.state.props.scrollHeight > bond.state.props.clientHeight);
	const hasXScroll = $derived(bond.state.props.scrollWidth > bond.state.props.clientWidth);

	const hasScroll = $derived(hasXScroll || hasYScroll);

	const isOpen = $derived(bond?.state?.props?.open ?? true);

	const isScrolling = $derived(bond?.state?.props?.isScrolling ?? false);

	const trackProps = $derived(bond.track(orientation));
</script>

{#if (isOpen || isScrolling) && hasScroll}
	<HtmlAtom
		{bond}
		preset="scrollable.track"
		class={[
			'scrollable-track bg-foreground/10 hover:bg-foreground/15 border-border absolute z-10 rounded transition-opacity',
			{ vertical: 'inset-y-0 right-0 w-2', horizontal: 'inset-x-0 bottom-0 h-2' }[orientation],
			'$preset',
			klass
		]}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		{...trackProps}
		{...restProps}
	>
		{@render children?.()}
	</HtmlAtom>
{/if}
