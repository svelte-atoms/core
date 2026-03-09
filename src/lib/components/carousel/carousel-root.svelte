<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { CarouselBond, CarouselBondState, type CarouselBondProps } from './bond.svelte.ts';
	import type { CarouselRootProps } from './types';

	let {
		class: klass = '',
		orientation = 'horizontal',
		loop = false,
		autoplay = 0,
		current = $bindable(0),
		preset = 'carousel',
		children,
		...restProps
	}: CarouselRootProps & HTMLAttributes<HTMLDivElement> = $props();

	const bondProps = defineState<CarouselBondProps>(
		[
			defineProperty('orientation', () => orientation),
			defineProperty('loop', () => loop),
			defineProperty('autoplay', () => autoplay),
			defineProperty('current', () => current),
			defineProperty('onCurrentChange', () => (i: number) => { current = i; }),
			defineProperty('rest', () => restProps),
		],
		() => ({})
	);

	const bond = new CarouselBondState(() => bondProps);
	const b = new CarouselBond(bond).share();

	// Scroll track when current changes
	$effect(() => {
		b.scrollTo(bond.current);
	});

	// Autoplay
	$effect(() => {
		if (!autoplay) return;
		const timer = setInterval(() => bond.next(), autoplay);
		return () => clearInterval(timer);
	});

	// Keyboard navigation on the root
	function onKeyDown(ev: KeyboardEvent) {
		if (orientation === 'horizontal') {
			if (ev.key === 'ArrowLeft') { ev.preventDefault(); bond.prev(); }
			else if (ev.key === 'ArrowRight') { ev.preventDefault(); bond.next(); }
		} else {
			if (ev.key === 'ArrowUp') { ev.preventDefault(); bond.prev(); }
			else if (ev.key === 'ArrowDown') { ev.preventDefault(); bond.next(); }
		}
	}
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['carousel-root relative', '$preset', klass]}
	role="region"
	aria-label="Carousel"
	aria-roledescription="carousel"
	tabindex={0}
	onkeydown={onKeyDown}
	{...restProps}
>
	{@render children?.({ carousel: b })}
</HtmlAtom>
