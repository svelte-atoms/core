<script lang="ts" generics="E extends HtmlElementTagName, B extends Base = Base">
	import { animate as motion } from 'motion';
	import { PortalBond, PortalsBond, Teleport } from '$svelte-atoms/core/components/portal';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { HtmlElementTagName, HtmlElementType } from '$svelte-atoms/core/components/element';
	import { DURATION } from '$svelte-atoms/core/shared';
	import { PopoverBond } from './bond.svelte';
	import type { AnimateParams, PopoverContentProps } from './types';

	type Element = HtmlElementType<E>;

	const bond = PopoverBond.get();
	const activePortalBond = (() => {
		const key = bond.state.props.portal;
		if (key instanceof PortalBond) {
			return key;
		}

		let portal: PortalBond | undefined | null = undefined;

		if (typeof key === 'string') {
			portal = PortalsBond.get()?.state.get(key);
			console.error('portal was not found');
		}

		return portal ?? PortalBond.get();
	})();

	if (!bond) {
		throw new Error('<PopoverOverlay /> must be used within a <Popover />');
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
	}: PopoverContentProps<E, B> = $props();

	const isOpen = $derived(bond.state.isOpen && !!bond.elements.trigger);
	const portalId = $derived(activePortalBond?.id);

	const position = $derived(bond.position);
	const placement = $derived(position?.placement);

	const x = $derived(position?.x ?? 0);
	const y = $derived(position?.y ?? 0);

	const dy = $derived(placement?.startsWith('top') ? -1 : placement?.startsWith('bottom') ? 1 : 0);
	const dx = $derived(placement?.startsWith('left') ? -1 : placement?.startsWith('right') ? 1 : 0);

	const offset = $derived(bond.state.props.offset);

	const xOffset = $derived(dx * offset);
	const yOffset = $derived(dy * offset);

	let isInitialized = false;

	function _containerInitial(this: typeof bond.state, node: Element) {
		const openAsNumber = +this.isOpen;

		const deltaArrow = position?.middlewareData?.arrow ? 1 : 0;
		const arrowClientWidth = bond?.elements.arrow?.clientWidth ?? 0;
		const arrowClientHeight = bond?.elements.arrow?.clientHeight ?? 0;

		const _x = x + xOffset * openAsNumber + deltaArrow * dx * arrowClientWidth;
		const _y = y + yOffset * openAsNumber + deltaArrow * dy * arrowClientHeight;

		node.style.transform = `translate3d(${_x}px, ${_y}px, 1px)`;

		isInitialized = true;
	}

	function _containerAnimate(this: typeof bond.state, node: Element, _?: AnimateParams) {
		if (!isInitialized) {
			return;
		}

		const openAsNumber = +this.isOpen;

		const deltaArrow = position?.middlewareData?.arrow ? 1 : 0;
		const arrowClientWidth = bond?.elements.arrow?.clientWidth ?? 0;
		const arrowClientHeight = bond?.elements.arrow?.clientHeight ?? 0;

		const _x = x + xOffset * openAsNumber + deltaArrow * dx * arrowClientWidth;
		const _y = y + yOffset * openAsNumber + deltaArrow * dy * arrowClientHeight;

		node.style.transform = `translate3d(${_x}px, ${_y}px, 1px)`;
	}

	function _animate(this: typeof bond.state, node: Element) {
		const isOpen = this.isOpen;

		motion(
			node,
			{
				opacity: +isOpen,
				y: (isOpen ? 0 : -1) * dy * 8
			},
			{ duration: DURATION.fast / 1000 }
		);
	}
</script>

<Teleport
	portal={portalId ?? 'root.l0'}
	as="div"
	class={[
		'pointer-events-auto absolute top-0 left-0 h-min w-fit',
		!isOpen && 'pointer-events-none'
	]}
	initial={_containerInitial?.bind(bond.state)}
	animate={_containerAnimate?.bind(bond.state)}
	{...bond.content({ onchange: _containerInitial })}
>
	<HtmlAtom
		{bond}
		preset="popover.content"
		class={[
			'popover-content bg-popover text-popover-foreground border-border rounded-md border p-2 opacity-0 shadow-lg',
			'$preset',
			klass
		]}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		{...restProps}
	>
		{@render children?.({ popover: bond })}
	</HtmlAtom>
</Teleport>
