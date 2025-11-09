<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { Trigger } from '$svelte-atoms/core/components/popover/atoms';
	import type { Base } from '$svelte-atoms/core/components/atom';
	import { DropdownBond } from './bond.svelte';
	import type { DropdownTriggerProps } from './types';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('dropdown atom was not found');
	}

	let {
		class: klass = '',
		as = 'button' as T,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DropdownTriggerProps<T, B> = $props();
</script>

<Trigger
	{as}
	{bond}
	preset="dropdown.trigger"
	class={['border-border relative flex h-auto min-h-10 flex-wrap items-center', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...restProps}
>
	{@render children?.({ dropdown: bond })}
</Trigger>
