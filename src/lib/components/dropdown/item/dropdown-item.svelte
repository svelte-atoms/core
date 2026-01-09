<script lang="ts" generics="D">
	import { nanoid } from 'nanoid';
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import {
		DropdownItemController,
		type DropdownItemProps as ControllerProps
	} from './controller.svelte';
	import type { DropdownItemProps } from './types';
	import { DropdownBond } from '../bond.svelte';
	import Item from '../../menu/item/menu-item.svelte';

	const dropdown = DropdownBond.get();

	if (!dropdown) {
		throw new Error('<DropdownItem> must be used within a <Dropdown>.');
	}

	let {
		class: klass = '',
		preset = 'dropdown.item',
		value = nanoid(),
		data = undefined,
		factory = _factory,
		children = undefined,
		onclick = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DropdownItemProps<D> = $props();

	let item: typeof Item = $state(undefined);
	const controller = $derived(item?.getController());
	const isHighlighted = $derived(controller?.isHighlighted ?? false);
	const isSelected = $derived(controller?.isSelected ?? false);

	// const item = factory().share();

	const rootProps = $derived({
		...controller?.elementProps(),
		...restProps
	});

	function _factory() {
		const existing = (dropdown?.state as any)?.item?.(value);

		if (existing) {
			return existing as DropdownItemController<D>;
		}

		const itemProps = defineState<ControllerProps<D>>([
			defineProperty('value', () => value),
			defineProperty('data', () => data),
			defineProperty('id', () => value)
		]);
		const controller = new DropdownItemController<D>(() => itemProps);

		controller.mount();

		return controller;
	}

	function handleClick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		ev.preventDefault();

		controller.toggle();

		if (controller.dropdown?.state) {
			controller.dropdown.state.query = '';
		}

		controller.close();
	}
</script>

<Item
	bind:this={item}
	{preset}
	class={[
		isHighlighted && 'bg-foreground/5',
		isSelected && 'bg-primary/5 hover:bg-primary/10 active:bg-primary/15',
		'$preset',
		klass
	]
		.filter(Boolean)
		.join(' ')}
	enter={enter?.bind(controller)}
	exit={exit?.bind(controller)}
	initial={initial?.bind(controller)}
	animate={animate?.bind(controller)}
	onmount={onmount?.bind(controller)}
	ondestroy={ondestroy?.bind(controller)}
	onclick={handleClick}
	{factory}
	{...rootProps}
>
	{@render children?.({ dropdownItem: controller })}
</Item>
