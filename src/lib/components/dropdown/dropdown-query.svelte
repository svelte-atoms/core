<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { onMount } from 'svelte';
	import { DropdownBond } from './bond.svelte';
	import { Input } from '$svelte-atoms/core/components/input';
	import { type Base } from '$svelte-atoms/core/components/atom';

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

<Input.Control
	bind:value={bond.state.query}
	{bond}
	preset="dropdown.query"
	class={['inline-flex h-auto w-auto flex-1 py-1', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...restProps}
/>
