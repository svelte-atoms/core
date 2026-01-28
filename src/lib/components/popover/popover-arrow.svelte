<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { animate as motion } from 'motion';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { PopoverBond } from './bond.svelte';
	import type { PopoverArrowProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = PopoverBond.get();

	if (!bond) {
		throw new Error('');
	}

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = _animate,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: PopoverArrowProps<E, B> & HTMLAttributes<Element> = $props();

	const position = $derived(bond.state.position);
	const middlewareArrowData = $derived(position?.middlewareData?.arrow);
	const side = $derived(position?.placement?.split('-')[0] ?? 'top');

	const arrowProps = $derived({
		...bond.arrow(),
		...restProps
	});

	// Rotation based on placement side
	const rotation = $derived.by(() => {
		switch (side) {
			case 'top':
				return 180;
			case 'bottom':
				return 0;
			case 'left':
				return 90;
			case 'right':
				return -90;
			default:
				return 0;
		}
	});

	function _animate(node: HTMLElement) {
		if (!middlewareArrowData) {
			return;
		}

		const { x, y } = middlewareArrowData;

		const isMainAxis = side === 'top' || side === 'bottom';

		const crossAxisStyle = isMainAxis
			? {
					left: 0
				}
			: {
					top: 0
				};

		motion(
			node,
			{
				x: x ?? 0,
				y: y ?? 0,
				opacity: 1,
				...crossAxisStyle
			},
			{ duration: 0 }
		);
	}
</script>

<HtmlAtom
	{bond}
	preset="popover.arrow"
	class={['text-border border-border pointer-events-none absolute opacity-0', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	style="{side}: 100%;"
	{...arrowProps}
>
	{#if children}
		{@render children({ popover: bond })}
	{:else}
		<svg
			width="16"
			height="8"
			viewBox="0 0 16 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style="transform: rotate({rotation}deg);"
		>
			<path d="M0 8C2 8 6 4 8 0C10 4 14 8 16 8H0Z" fill="currentColor" />
		</svg>
	{/if}
</HtmlAtom>
