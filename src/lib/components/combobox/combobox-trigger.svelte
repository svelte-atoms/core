<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { ComboboxBond } from './bond.svelte';
	import { Trigger } from '$svelte-atoms/core/components/dropdown/atoms';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const bond = ComboboxBond.get();

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		class: klass = '',
		as = 'button',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();
</script>

<Trigger
	{as}
	{bond}
	preset="dropdown.trigger"
	class={['h-8 w-40', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	onclick={(ev: Event) => {
		ev.preventDefault();

		bond?.state?.open();
	}}
	{...restProps}
>
	{@render children?.({ dropdown: bond })}
</Trigger>
