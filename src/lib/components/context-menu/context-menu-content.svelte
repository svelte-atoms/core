<script lang="ts" generics="E extends HtmlElementTagName, B extends Base = Base">
	import { clickout } from '$svelte-atoms/core/attachments';
	import type { Base } from '../atom';
	import type { HtmlElementTagName } from '../element';
	import { PopoverBond, type PopoverContentProps } from '../popover';
	import { Content } from '../popover/atoms';

    const bond = PopoverBond.get();

    if (!bond) {
        throw new Error('<ContextMenu.Content /> must be used within a <ContextMenu.Root />');
    }

	let { onclickoutside, ...restProps }: PopoverContentProps<E, B> = $props();

	function onclickoutHandler(ev: PointerEvent, bond: PopoverBond) {
		const trigger = bond.element('trigger');

		// button is right button do not close the popover
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
	onclickoutside={onclickoutside ?? onclickoutHandler}
	{...restProps}
/>
