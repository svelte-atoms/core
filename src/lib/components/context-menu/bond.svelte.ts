import {
	DropdownMenuBond,
	DropdownMenuBondBase,
	type DropdownMenuBondProps
} from '$ixirjs/ui/components/dropdown-menu/bond.svelte';
import { defineBond, type BondOf } from '$ixirjs/ui/shared';
import { manualTrigger } from '$ixirjs/ui/components/portal/host';

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type ContextMenuBondProps = DropdownMenuBondProps;

// -----------------------------------------------------------------------------
// Bond implementation
// -----------------------------------------------------------------------------

export class ContextMenuBondBase<
	Props extends ContextMenuBondProps = ContextMenuBondProps
> extends DropdownMenuBondBase<Props> {
	constructor(props: Props) {
		super(props, 'context-menu');
	}
}

// -----------------------------------------------------------------------------
// Bond spec and constructor facade
// -----------------------------------------------------------------------------

const contextMenuSpec = {
	parts: [DropdownMenuBond],
	name: 'context-menu',
	base: ContextMenuBondBase,
	atoms: {},
	capabilities: () => [manualTrigger({ ariaHasPopup: 'menu' })]
};

export const ContextMenuBond = defineBond(contextMenuSpec);

export type ContextMenuBond = BondOf<typeof ContextMenuBond>;
