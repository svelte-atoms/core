<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Base } from '$svelte-atoms/core/components/atom';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ReferenceElement } from '@floating-ui/dom';
	import { Trigger } from '../popover/atoms';
	import { DropdownBond } from '../dropdown/bond.svelte';
	import type { ContextMenuTriggerProps } from './types';

	type ElementType = HTMLElementTagNameMap[E];

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('<ContextMenu.Trigger /> must be used within a <ContextMenu.Root />');
	}

	const dropdownBond = bond;

	let {
		preset = 'context-menu.trigger',
		onclick = null,
		oncontextmenu = undefined,
		...restProps
	}: HTMLAttributes<ElementType> & ContextMenuTriggerProps<E, B> = $props();

	function handleContextMenu(ev: MouseEvent) {
		ev.preventDefault();

		const event = new MouseEvent('contextmenu', ev) as MouseEvent & {
			currentTarget: MouseEvent & ElementType;
		};
		oncontextmenu?.(event);

		if (event.defaultPrevented) return;

		const virtualElement = {
			getBoundingClientRect: () => ({
				width: 0,
				height: 0,
				x: ev.clientX,
				y: ev.clientY,
				top: ev.clientY,
				left: ev.clientX,
				right: ev.clientX,
				bottom: ev.clientY
			})
		};

		dropdownBond.state.virtualTrigger = virtualElement as ReferenceElement;

		dropdownBond.state.open();
	}
</script>

<Trigger {preset} onclick={onclick ?? undefined} oncontextmenu={handleContextMenu} {...restProps} />
