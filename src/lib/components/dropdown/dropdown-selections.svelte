<script lang="ts">
	import { HtmlAtom as Atom } from '../atom';
	import Value from './dropdown-value.svelte';
	import { DropdownBond } from './bond.svelte';
	import type { DropdownSelectionsProps } from './types';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('DropdownValue must be used within a Dropdown');
	}

	const selectedItems = $derived(bond.state.selectedItems);
	const isMultiple = $derived(bond.state.props.multiple);

	let {
		class: klass = '',
		children,
		value: Selection = Value,
		...restProps
	}: DropdownSelectionsProps = $props();
</script>

{#if isMultiple && selectedItems.length}
	<Atom class={['flex items-center gap-2', klass]} {...restProps}>
		{#if children}
			{@render children?.({ items: selectedItems, item: selectedItems[0] })}
		{:else}
			{#each selectedItems as item (item.id)}
				<Selection {item}>
					{item.text}
				</Selection>
			{/each}
		{/if}
	</Atom>
{:else if children && selectedItems[0]}
	{@render children?.({ items: selectedItems, item: selectedItems[0] })}
{:else if selectedItems[0]}
	{@const item = selectedItems[0]}
	{item.text}
{/if}
