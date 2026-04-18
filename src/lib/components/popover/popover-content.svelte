<script lang="ts" generics="E extends HtmlElementTagName, B extends Base = Base">
	import { PortalBond, PortalsBond, Teleport } from '$svelte-atoms/core/components/portal';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName } from '$svelte-atoms/core/components/element';
	import { PopoverBond } from './bond.svelte';
	import { animatePopoverContent } from './motion';
	import { ZLayer } from '../portal/zlayer.svelte';
	import type { PopoverContentProps } from './types';
	import Floating from './strategies/floating.svelte';

	const bond = PopoverBond.get();

	if (!bond) {
		throw new Error('<PopoverOverlay /> must be used within a <Popover />');
	}

	const positionStrategy = $derived(bond?.state.props.positionStrategy ?? 'absolute');

	const parentLayer = (() => {
		try {
			return ZLayer.get();
		} catch {
			return undefined;
		}
	})();

	const layer = new ZLayer('popover', () => parentLayer?.get() ?? 0).share();
	
	const activePortalBond = $derived.by(() => {
		const key = bond.state.props.portal;
		if (key instanceof PortalBond) {
			return key;
		}

		if (typeof key === 'string') {
			return PortalsBond.get()?.state.get(key);
		}

		return PortalBond.get();
	});

	let {
		class: klass = '',
		children = undefined,
		animate = animatePopoverContent(),
		...restProps
	}: PopoverContentProps<E, B> = $props();

	const isOpen = $derived(bond.state.isOpen && !!bond.elements.trigger);
	const portalId = $derived(activePortalBond?.id);

	/**
	 * Calculate the final position and opacity for the popover content
	 */
	function calculatePosition() {
		const position = bond.state.position;
		
		if (!position) {
			return null;
		}

		const { placement, x = 0, y = 0, middlewareData } = position;
		const offset = bond.state.props.offset;
		const openState = +isOpen;

		// Calculate direction multipliers based on placement
		const directionY = placement?.startsWith('top') ? -1 : placement?.startsWith('bottom') ? 1 : 0;
		const directionX = placement?.startsWith('left') ? -1 : placement?.startsWith('right') ? 1 : 0;

		// Calculate arrow dimensions and delta
		const arrowWidth = bond?.elements.arrow?.clientWidth ?? 0;
		const arrowHeight = bond?.elements.arrow?.clientHeight ?? 0;
		const arrowDelta = middlewareData?.arrow ? 1 : 0;

		// Calculate final position with offset and arrow adjustment
		const finalX = x + (directionX * offset * openState) + (arrowDelta * directionX * arrowWidth);
		const finalY = y + (directionY * offset * openState) + (arrowDelta * directionY * arrowHeight);

		return {
			transform: `translate3d(${finalX}px, ${finalY}px, 1px)`,
			opacity: openState.toString()
		};
	}

	function containerInitial(this: typeof bond.state, node: HTMLElement) {
		const styles = calculatePosition();
		
		// Hide content until position is calculated to avoid ghosting
		if (!styles) {
			node.style.opacity = '0';
			return;
		}

		node.style.transform = styles.transform;
		node.style.opacity = styles.opacity;
	}

	function containerAnimate(this: typeof bond.state, node: HTMLElement) {
		void bond.state.props.open; // Ensure reactivity to open state changes

		const styles = calculatePosition();
		
		if (!styles) {
			return;
		}

		node.style.transform = styles.transform;
		node.style.opacity = '1';
	}
</script>

<Floating />

<Teleport
	portal={portalId ?? 'root.l0'}
	as="div"
	class="top-0 left-0 h-min w-fit outline-none pointer-events-none"
	style="z-index: {layer.get()}; position: {positionStrategy};"
	initial={containerInitial?.bind(bond.state)}
	animate={containerAnimate?.bind(bond.state)}
	{...bond.content().spread}
>	
	<HtmlAtom
		{bond}
		preset="popover.content"
		class={[
			'popover-content bg-popover text-popover-foreground border-border rounded-md border p-2 opacity-0 shadow-lg outline-none',
			// isOpen && 'pointer-events-auto',
			'$preset',
			klass
		]}
		animate={animate?.bind(bond.state)}
		{...restProps}
	>
		{@render children?.({ popover: bond })}
	</HtmlAtom>
</Teleport>
