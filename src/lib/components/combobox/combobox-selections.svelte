<script lang="ts">
	import { ComboboxBond } from './bond.svelte';
	import { Selections } from '../dropdown/atoms';
	import type { ComboboxSelectionsProps } from './types';

	const bond = ComboboxBond.get();

	if (!bond) {
		throw new Error('ComboboxSelections must be used within a Combobox');
	}

	let { children, ...restProps }: ComboboxSelectionsProps = $props();

	let selections = $derived(bond.state.allSelections);

	$inspect(selections);
</script>

<Selections getSelections={() => selections} {...restProps} />
