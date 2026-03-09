<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CarouselBond } from './bond.svelte.ts';
	import type { CarouselTrackProps } from './types';

	const bond = CarouselBond.get();

	let {
		class: klass = '',
		preset = 'carousel.track',
		children,
		...restProps
	}: CarouselTrackProps & HTMLAttributes<HTMLDivElement> = $props();

	let el: HTMLElement | undefined = $state();

	$effect(() => {
		if (el) bond.elements.track = el;
	});

	const isHorizontal = $derived(bond.state.orientation === 'horizontal');
</script>

<HtmlAtom
	bind:el
	{preset}
	as="div"
	class={[
		'carousel-track flex overflow-hidden',
		isHorizontal ? 'flex-row' : 'flex-col',
		'$preset',
		klass
	]}
	aria-live="polite"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
