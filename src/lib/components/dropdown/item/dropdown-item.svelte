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
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';

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
	} = $props();

	const bond = factory().share();

	const unmount = bond.mount();
	$effect(() => unmount);

	const rootProps = $derived({
		...bond?.root?.(),
		...restProps
	});

	function _factory() {
		const item = dropdown?.state.item(value);

		if (item) {
			return item as DropdownItemBond;
		}

		const bondProps = defineState<DropdownItemBondProps<D>>([
			defineProperty('value', () => value),
			defineProperty('data', () => data)
		]);
		const bondState = new DropdownItemBondState(() => bondProps);
		return new DropdownItemBond(bondState);
	}

	function handleClick(ev: MouseEvent) {
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
	{bond}
	{preset}
	class={[
		bond.state.isHighlighted && 'bg-foreground/10',
		bond.state.isSelected && 'bg-accent/10 hover:bg-accent/15 active:bg-accent/20',
		'$preset',
		klass
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={handleClick}
	{...rootProps}
>
	{@render children?.({ dropdownItem: bond })}
</Item>
