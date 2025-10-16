<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { ComboboxBond } from './bond.svelte';
	import { Trigger } from '$svelte-atoms/core/components/dropdown/atoms';
	import { Root as InputRoot } from '$svelte-atoms/core/components/input/atoms';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue, cn } from '$svelte-atoms/core/utils';
	import type { Base } from '$svelte-atoms/core/components/atom';

	const bond = ComboboxBond.get();

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	const preset = getPreset('combobox.trigger');

	let {
		class: klass = '',
		as = preset?.as ?? 'button',
		base = preset?.base ?? InputRoot,
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
	{base}
	class={['h-8 w-40', toClassValue.apply(bond, [preset?.class]), toClassValue.apply(bond, [klass])]}
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
