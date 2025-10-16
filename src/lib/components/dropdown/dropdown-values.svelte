<script lang="ts">
	import { DropdownBond } from './bond.svelte';

	const bond = DropdownBond.get();

	if (!bond) {
		throw new Error('DropdownValue must be used within a Dropdown');
	}

	const selectedItems = $derived(bond.state.selectedItems);

	let { class: klass = '', children, ...restProps } = $props();
</script>

<!-- <Render class={cn('dropdown-value inline-flex gap-2 items-center flex-wrap', klass)} {...restProps}>
</Render> -->
{@render children?.({ items: selectedItems })}
