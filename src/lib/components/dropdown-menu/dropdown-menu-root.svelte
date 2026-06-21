<script lang="ts">
	import {
		DropdownMenuBond,
		DropdownMenuBondState,
		type DropdownMenuBondProps
	} from './bond.svelte';
	import { Root } from '../popover/atoms';
	import type { PopoverRootProps } from '../popover';
	import type { PopoverBond } from '../popover/bond.svelte';

	let {
		open = $bindable(false),
		factory = defaultFactory,
		...restProps
	}: PopoverRootProps = $props();

	// DropdownMenuBond composes PopoverBond (`parts:`) so it shares its atoms/state/context and is a
	// valid bond for <Root> — which drives open state via the bindable and never calls bond-level
	// open/close/toggle. defineBond's type doesn't surface those PopoverBond convenience methods
	// (parts: compose atoms+capabilities, not methods), so the factory needs the cast below.
	function defaultFactory(props: DropdownMenuBondProps): PopoverBond {
		const menuBondState = new DropdownMenuBondState(props);
		// Runtime-valid PopoverBond (composes it); the cast bridges the composed-parts method gap.
		return new DropdownMenuBond(menuBondState) as unknown as PopoverBond;
	}
</script>

<Root bind:open {factory} {...restProps} />
