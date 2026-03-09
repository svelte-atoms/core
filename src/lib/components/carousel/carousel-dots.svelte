<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { CarouselBond } from './bond.svelte.ts';
	import type { CarouselDotsProps } from './types';

	const bond = CarouselBond.get();

	let {
		class: klass = '',
		preset = 'carousel.dots',
		dotContent = undefined,
		...restProps
	}: CarouselDotsProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

{#snippet defaultDot({ index, active }: { index: number; active: boolean })}
	<span class={[
		'carousel-dot h-2 w-2 rounded-full transition-all',
		active ? 'bg-foreground scale-125' : 'bg-foreground/30 hover:bg-foreground/60'
	].join(' ')}></span>
{/snippet}

<HtmlAtom
	{preset}
	as="div"
	class={['carousel-dots flex items-center justify-center gap-2', '$preset', klass]}
	role="tablist"
	aria-label="Slides"
	{...restProps}
>
	{#each { length: bond.state.count } as _, i}
		<button
			type="button"
			role="tab"
			aria-selected={bond.state.current === i}
			aria-label="Slide {i + 1}"
			onclick={() => bond.state.goTo(i)}
			class="cursor-pointer p-1 focus-visible:outline-none focus-visible:ring-2"
		>
			{@render (dotContent ?? defaultDot)({ index: i, active: bond.state.current === i })}
		</button>
	{/each}
</HtmlAtom>
