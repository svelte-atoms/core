<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CarouselBond } from './bond.svelte.ts';
	import type { CarouselItemProps } from './types';

	const bond = CarouselBond.get();

	let {
		class: klass = '',
		preset = 'carousel.item',
		children,
		...restProps
	}: CarouselItemProps & HTMLAttributes<HTMLDivElement> = $props();

	let el: HTMLElement | undefined = $state();

	// Register item count when mounted
	$effect(() => {
		if (!el) return;
		bond.state.count = (bond.elements.track?.children.length ?? 0);
	});

	const isHorizontal = $derived(bond.state.orientation === 'horizontal');
</script>

<HtmlAtom
	bind:el
	{preset}
	as="div"
	class={[
		'carousel-item shrink-0',
		isHorizontal ? 'w-full' : 'h-full',
		'$preset',
		klass
	]}
	role="group"
	aria-roledescription="slide"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
