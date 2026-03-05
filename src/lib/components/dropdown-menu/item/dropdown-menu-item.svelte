<script
	lang="ts"
	generics="D, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DropdownMenuItemController, type DropdownMenuItemControllerProps } from './controller.svelte';
	import { DropdownMenuBond } from '../bond.svelte';
	import { List } from '../../list';
	import type { DropdownMenuItemProps } from './types';

	const menu = DropdownMenuBond.get();

	if (!menu) {
		throw new Error('<DropdownMenuItem> must be used within a <DropdownMenu>.');
	}

	const ID = $props.id();

	let {
		class: klass = '',
		id = ID,
		preset: presetKey = 'dropdown-menu.item',
		children = undefined,
		onclick = undefined,
		disabled = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		factory = _factory,
		...restProps
	}: DropdownMenuItemProps = $props();

	const controller = factory().share();

	const itemProps = $derived({
		...menu?.item?.(),
		...controller?.elementProps(),
		...restProps
	});

	$effect(() => {
		return () => {
			controller.destroy();
		};
	});

	function _factory() {
		const item = menu?.state?.item?.(id);

		if (item) {
			return item as DropdownMenuItemController;
		}

		const bondProps = defineState<DropdownMenuItemControllerProps>([
			defineProperty('id', () => id)
		]);
		const controller = new DropdownMenuItemController(() => bondProps);

		controller.mount();

		return controller;
	}

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		ev.preventDefault();

		controller?.menu?.state.close();
	}

	export function getController() {
		return controller;
	}
</script>

<List.Item
	bond={controller}
	preset={presetKey}
	class={[
		'border-border last:border-b-none hover:bg-foreground/5 active:bg-foreground/10 outline-primary cursor-pointer border-b',
		'$preset',
		klass
	]}
	onmount={onmount?.bind(controller) as any}
	ondestroy={ondestroy?.bind(controller) as any}
	enter={enter?.bind(controller) as any}
	exit={exit?.bind(controller) as any}
	initial={initial?.bind(controller) as any}
	animate={animate?.bind(controller) as any}
	aria-disabled={disabled ? true : undefined}
	tabIndex={disabled ? -1 : 0}
	onclick={handleClick}
	{...itemProps}
>
	{@render children?.({ menuItem: controller })}
</List.Item>
