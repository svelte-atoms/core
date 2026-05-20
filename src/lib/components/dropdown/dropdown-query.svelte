<script lang="ts">
	import { DropdownBond } from './bond.svelte';
	import { Input } from '$svelte-atoms/core/components/input';
	import type { DropdownQueryProps } from './types';

	const bond = DropdownBond.get() as DropdownBond;

	if (!bond) {
		throw new Error('Dropdown atom was not found');
	}

	let {
		value = $bindable(),
		class: klass = '',
		children = undefined,
		...restProps
	}: DropdownQueryProps = $props();
</script>

<Input.Control
	bind:value={
		() => value,
		(v) => {
			value = v;
		}
	}
	{bond}
	preset="dropdown.query"
	class={['inline-flex h-auto w-auto flex-1 py-1', '$preset', klass]}
	{...restProps}
/>
