<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import { mergePresetProps } from '$ixirjs/ui/components/atom';
	import type { Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Trigger } from '../popover/atoms';
	import { PopoverVirtualTriggerAtom } from '../popover';
	import { ContextMenuBond } from './bond.svelte';
	import type { ContextMenuTriggerProps } from './types';
	import type { BondVirtualElement } from '$ixirjs/ui/shared/bond';

	type ElementType = HTMLElementTagNameMap[E];

	const bond = ContextMenuBond.getOrThrow(
		'<ContextMenu.Trigger /> must be used within a <ContextMenu.Root />'
	);

	const virtualTriggerAtom = createAtomInstance<
		PopoverVirtualTriggerAtom<ContextMenuBond>,
		ContextMenuBond,
		BondVirtualElement
	>('virtual-trigger', {
		bond,
		factory: (owner) => new PopoverVirtualTriggerAtom(owner as ContextMenuBond)
	});

	let {
		preset = undefined,
		onclick = undefined,
		oncontextmenu = undefined,
		class: klass = '',
		...restProps
	}: HTMLAttributes<ElementType> & ContextMenuTriggerProps<E, B> = $props();

	const triggerProps = $derived(mergePresetProps(preset, 'context-menu.trigger', restProps));

	function handleClick(event: MouseEvent) {
		onclick?.(event as MouseEvent & { currentTarget: EventTarget & ElementType });
		// ContextMenu opens only from the native contextmenu gesture, never from Popover's click trigger.
		if (!event.defaultPrevented) event.preventDefault();
	}

	function handleContextMenu(ev: MouseEvent & { currentTarget: EventTarget & ElementType }) {
		oncontextmenu?.(ev);
		if (ev.defaultPrevented) return;
		ev.preventDefault();

		const virtualElement = {
			getBoundingClientRect: () =>
				({
					width: 0,
					height: 0,
					x: ev.clientX,
					y: ev.clientY,
					top: ev.clientY,
					left: ev.clientX,
					right: ev.clientX,
					bottom: ev.clientY
				}) as DOMRect,
			contains: () => false
		} as BondVirtualElement;

		virtualTriggerAtom.element = virtualElement;

		bond.stageOpenChange({ event: ev, reason: 'context-menu' });
		bond.open();
	}
</script>

<Trigger
	class={['cursor-context-menu', klass]}
	onclick={handleClick}
	oncontextmenu={handleContextMenu}
	{...triggerProps}
/>
