<script
	lang="ts"
	generics="D, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { MenuItemController, type MenuItemControllerProps } from './controller.svelte';
	import { MenuBond } from '../bond.svelte';
	import { List } from '../../list';
	import type { MenuItemProps } from './types';

	const menu = MenuBond.get();

	if (!menu) {
		throw new Error('<DropdownItem> must be used within a <Dropdown>.');
	}

	let {
		class: klass = '',
		preset: presetKey = 'menu.item',
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
	}: MenuItemProps = $props();

	const ID = $props.id();

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
		const item = menu?.state?.item?.(ID);

		if (item) {
			return item as MenuItemController;
		}

		const bondProps = defineState<MenuItemControllerProps>([defineProperty('id', () => ID)]);
		return new MenuItemController(() => bondProps);
	}

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		ev.preventDefault();

		controller?.menu?.state.close();
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
	onmount={onmount?.bind(controller.state)}
	ondestroy={ondestroy?.bind(controller.state)}
	enter={enter?.bind(controller.state)}
	exit={exit?.bind(controller.state)}
	initial={initial?.bind(controller.state)}
	animate={animate?.bind(controller.state)}
	aria-disabled={disabled ? true : undefined}
	tabIndex={disabled ? -1 : 0}
	onclick={handleClick}
	{...itemProps}
>
	{@render children?.({ menuItem: controller })}
</List.Item>
