import type { Snippet } from 'svelte';
import type { Base, HtmlAtomProps } from '../atom';
import type { PopoverDialogBond } from './bond.svelte';
import type { PortalTarget, ZIndexInput } from '../portal';
import type { StateChangeCallback } from '$ixirjs/ui/types';

// Children snippets receive the fused bond.
type Slot = Snippet<[{ popoverDialog: PopoverDialogBond }]>;

// Root provides context + renders children in document flow; trigger renders in place,
// modal presentation self-portals from `<PopoverDialog.Dialog>`.
export interface PopoverDialogRootProps<
	E extends keyof HTMLElementTagNameMap = 'dialog',
	B extends Base = Base
> extends HtmlAtomProps<E, B, Slot> {
	open?: boolean;
	disabled?: boolean;
	onopenchange?: StateChangeCallback<boolean, PopoverDialogBond> | undefined;
	children?: Slot;
}

// Dialog owns the modal presentation: self-portals the backdrop around `<Dialog.Content>`.
export interface PopoverDialogContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, Slot> {
	type?: 'modal' | 'non-modal';
	'z-index'?: ZIndexInput;
	portal?: PortalTarget;
	children?: Slot;
	/** Native click handler for the rendered dialog element. */
	onclick?: ((event: MouseEvent) => void) | undefined;
}
