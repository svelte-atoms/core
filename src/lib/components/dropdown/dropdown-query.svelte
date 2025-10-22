<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', S extends Shell = Shell">
	import { onMount, type Component } from 'svelte';
	import { DropdownBond } from './bond.svelte';
	import { Input } from '$svelte-atoms/core/components/input';
	import { toClassValue, cn } from '$svelte-atoms/core/utils';

	const bond = DropdownBond.get() as DropdownBond;

	if (!bond) {
		throw new Error('Combobox atom was not found');
	}

	let {
		class: klass = '',
		children = undefined,
		onpointerdown,
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
	bind:value={bond.state.query}
	preset="dropdown.query"
	class={['inline-flex w-min flex-1 py-1', '$preset', klass]}
	{bond}
	onpointerdown={(ev) => {
		ev.stopPropagation();

		bond.state.open();
	}}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...restProps}
/>
