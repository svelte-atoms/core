<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CarouselBond } from './bond.svelte.ts';
	import type { CarouselPrevProps } from './types';

	const bond = CarouselBond.get();

	let {
		class: klass = '',
		preset = 'carousel.prev',
		children,
		...restProps
	}: CarouselPrevProps & HTMLButtonAttributes = $props();

	const disabled = $derived(!bond.state.canPrev);
</script>

<HtmlAtom
	{preset}
	as="button"
	type="button"
	{disabled}
	class={[
		'carousel-prev flex items-center justify-center rounded-full p-2 transition-opacity',
		'bg-background/80 hover:bg-background border-border border shadow-sm',
		'disabled:cursor-not-allowed disabled:opacity-30',
		'$preset',
		klass
	]}
	aria-label="Previous slide"
	onclick={() => bond.state.prev()}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
			<path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	{/if}
</HtmlAtom>
