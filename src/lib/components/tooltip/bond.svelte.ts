import {
	PopoverBond,
	PopoverBondBase,
	type PopoverBondProps
} from '$ixirjs/ui/components/popover/bond.svelte';
import { defineBond, type BondOf } from '$ixirjs/ui/shared';

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type TooltipBondProps = PopoverBondProps;

// -----------------------------------------------------------------------------
// Bond spec and constructor facade
// -----------------------------------------------------------------------------

// TooltipBond — Popover re-branded as `tooltip`.
//
// `parts: [PopoverBond]` carries over popover's full atom set (trigger, overlay,
// content, tail, indicator, virtual-trigger) and its positioned + focus capabilities,
// and threads popover's context keys so `<Popover.*>` atom components still resolve via
// `PopoverBond.get()` / `OverlayBond.get()` when they sit under a Tooltip.Root.
//
// `base: PopoverBondBase` inherits popover's runtime behaviour (floating position tracking).
//
// The only thing that changes is `namespace` → `'tooltip'`, so every atom's preset key
// resolves as `tooltip.<slot>` (e.g. `tooltip.content`, `tooltip.trigger`) instead of
// `popover.<slot>`. Atoms read the namespace off the bond at runtime, so no atom subclasses
// are needed — the shared popover atoms pick up the tooltip preset namespace automatically.
const tooltipSpec = {
	parts: [PopoverBond],
	name: 'tooltip',
	base: PopoverBondBase,
	atoms: {}
};

export const TooltipBond = defineBond(tooltipSpec);

export type TooltipBond = BondOf<typeof TooltipBond>;
