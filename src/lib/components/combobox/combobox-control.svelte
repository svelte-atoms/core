<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { Input } from '$svelte-atoms/core/components/input';
	import { ComboboxBond } from './bond.svelte';
	import type { ComboboxControlProps } from './types';

	const bond = ComboboxBond.get() as ComboboxBond;

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		value = $bindable(),
		class: klass = '',
		children = undefined,
		...restProps
	}: ComboboxControlProps = $props();

	let isMounted = $state(false);

	onMount(() => {
		isMounted = true;
	});

	const isMultiselect = untrack(() => bond.state.props.multiple);

	$effect(() => {
		void bond.state.selections;

		if (isMultiselect) {
			value = '';
		} else {
			value = untrack(() => bond.state.props.label);
		}
	});

	const comboboxProps = $derived({
		...bond.control().spread,
		...restProps
	});
</script>

<Input.Control
	bind:value={
		() => value,
		(v) => {
			value = v;
		}
	}
	preset="combobox.control"
	class={['border-border flex-1 py-1', '$preset', klass]}
	{...comboboxProps}
/>
