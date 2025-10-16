<script
	lang="ts"
	generics="D, E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base"
>
	import { nanoid } from 'nanoid';
	import {
		DropdownItemBond,
		DropdownItemBondState,
		type DropdownItemBondProps
	} from './bond.svelte';
	import { DropdownBond } from '../bond.svelte';
	import { Item } from '$svelte-atoms/core/components/menu/atoms';
	import { getPreset } from '$svelte-atoms/core/context';
	import { defineProperty, defineState, toClassValue } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const dropdown = DropdownBond.get();

	if (!dropdown) {
		throw new Error('<DropdownItem> must be used within a <Dropdown>.');
	}

	const preset = getPreset('dropdown.item');

	let {
		class: klass = '',
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
	} = $props();

	const bond = factory().share();

	const unmount = bond.mount();
	$effect(() => unmount);

	function _factory() {
		const item = dropdown?.state.item(value);

		if (item) {
			return item;
		}

		const bondProps = defineState<DropdownItemBondProps<D>>([
			defineProperty('value', () => value),
			defineProperty('data', () => data)
		]);
		const bondState = new DropdownItemBondState(() => bondProps);
		return new DropdownItemBond(bondState).share();
	}

	function _onclick(ev: MouseEvent) {
		onclick?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		ev.preventDefault();

		bond.state.toggle();

		if (bond.state.dropdown) {
			bond.state.dropdown.query = '';
		}

		bond.state.close();
	}
</script>

<Item
	{@attach (node) => (bond.elements.root = node)}
	class={[
		bond.state.isHighlighted && 'bg-foreground/10',
		bond.state.isSelected && 'bg-accent/10',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={_onclick}
	{...restProps}
>
	{@render children?.({ dropdownItem: bond })}
</Item>
