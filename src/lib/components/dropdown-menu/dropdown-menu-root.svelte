<script lang="ts">
	import { DropdownMenuBond, DropdownMenuBondState, type DropdownMenuBondProps } from './bond.svelte';
	import { Root } from '../popover/atoms';

	let { open = $bindable(false), factory = _factory, children, ...restProps } = $props();

	function _factory(props: DropdownMenuBondProps) {
		const menuBondState = new DropdownMenuBondState(() => props);
		return new DropdownMenuBond(menuBondState);
	}
</script>

<Root bind:open {factory} {...restProps}>
	{@render children?.()}
</Root>
