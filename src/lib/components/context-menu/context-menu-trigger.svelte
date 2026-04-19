<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
    import type { Base } from '$svelte-atoms/core/components/atom';
	import type { HTMLAttributes } from 'svelte/elements';
    import { Trigger } from '../popover/atoms';
    import { DropdownBond } from '../dropdown/bond.svelte';
	import type { ContextMenuTriggerProps } from './types';

    type ElementType = HTMLElementTagNameMap[E];

    const bond = DropdownBond.get();

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

        if (bond) {
            bond.elements.virtualTrigger = virtualElement as HTMLElement;
        }

        bond?.state.open();
    }
</script>

<Trigger preset={preset} onclick={onclick} oncontextmenu={handleContextMenu} {...restProps} />