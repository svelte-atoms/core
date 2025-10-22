<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$svelte-atoms/core/components/input';
	import { ComboboxBond } from './bond.svelte';

	const bond = ComboboxBond.get() as ComboboxBond<{}>;

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	} = $props();

	let isMounted = $state(false);

	onMount(() => {
		isMounted = true;
	});

	const isMultiple = $derived(bond?.state.props?.multiple ?? false);
	const selectedText = $derived(
		isMounted || isMultiple ? (bond.state.selectedItems.at(0)?.text ?? '') : ''
	);

	const value = $derived(
		bond?.state.props?.query ?? (bond?.state.props?.text || selectedText || '')
	);
</script>

<Input.Value
	{value}
	preset="combobox.input"
	class={['flex-1 py-1', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...bond.input()}
	{...restProps}
/>
