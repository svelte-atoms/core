<script lang="ts" generics="E extends HtmlElementTagName, B extends Base = Base">
	import { clickout } from '$svelte-atoms/core/attachments';
	import type { Base } from '../atom';
	import type { HtmlElementTagName } from '../element';
	import { PopoverBond, type PopoverContentProps } from '../popover';
	import { Content } from '../dropdown-menu/atoms';

    const bond = PopoverBond.get();

    if (!bond) {
        throw new Error('<ContextMenu.Content /> must be used within a <ContextMenu.Root />');
    }

	// Context menus size to their own `min-w-*` class, not the trigger: empty `minWidth` floor
	// drops the inherited dropdown default so the class wins. Opt back in per-instance with `minWidth`.
	let { onclickoutside, minWidth = '', ...restProps }: PopoverContentProps<E, B> = $props();

	function onclickoutHandler(ev: PointerEvent, bond: PopoverBond) {
		const trigger = bond.element<Element>('trigger');

		// Right-click on the trigger should not close the popover.
		if (
			trigger &&
			(trigger.contains(ev.target as Node) || trigger === ev.target) &&
			ev.button === 2
		) {
			return;
		}

		bond.state.close();
	}

	function contextMenuOutAttachement(node: HTMLElement) {
		const cleanup = clickout(
			(ev) => {
				if (onclickoutside) {
					onclickoutside(ev, bond);
					return;
				}

				onclickoutHandler(ev, bond);
			},
			{ type: 'pointerdown' }
		)(node);

		return cleanup;
	}
</script>

<Content
	{@attach contextMenuOutAttachement}
	{minWidth}
	onclickoutside={onclickoutside ?? onclickoutHandler}
	{...restProps}
/>
