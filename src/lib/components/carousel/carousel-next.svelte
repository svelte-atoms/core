<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CarouselBond } from './bond.svelte.ts';
	import type { CarouselNextProps } from './types';

	const bond = CarouselBond.get();

	let {
		class: klass = '',
		preset = 'carousel.next',
		children,
		...restProps
	}: CarouselNextProps & HTMLButtonAttributes = $props();

	const disabled = $derived(!bond.state.canNext);
</script>

<HtmlAtom
	{preset}
	as="button"
	type="button"
	{disabled}
	class={[
		'carousel-next flex items-center justify-center rounded-full p-2 transition-opacity',
		'bg-background/80 hover:bg-background border-border border shadow-sm',
		'disabled:cursor-not-allowed disabled:opacity-30',
		'$preset',
		klass
	]}
	aria-label="Next slide"
	onclick={() => bond.state.next()}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
			<path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	{/if}
</HtmlAtom>
