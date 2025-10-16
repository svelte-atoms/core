<script module lang="ts">
	import type { PopoverTriggerProps } from '$svelte-atoms/core/components/popover/popover-trigger.svelte';

	export type DropdownTriggerProps<
		T extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = PopoverTriggerProps<T, S> & {
		children?: Snippet<[{ dropdown?: DropdownBond }]>;
	};
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { DropdownBond } from './bond.svelte';
	import { Trigger } from '$svelte-atoms/core/components/popover/atoms';
	import { toClassValue, cn } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('dropdown atom was not found');
	}

	const preset = getPreset('dropdown.trigger');

	let {
		class: klass = '',
		as = preset?.as ?? 'button',
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DropdownTriggerProps<T, S> = $props();
</script>

<Trigger
	{as}
	{base}
	class={[
		'relative flex h-auto min-h-10 flex-wrap items-center',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
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
