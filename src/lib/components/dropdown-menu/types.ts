import type { HtmlAtomProps, Base } from '$ixirjs/ui/components/atom';
import type { PopoverRootProps } from '$ixirjs/ui/components/popover';
import type { StateChangeCallback } from '$ixirjs/ui/types';
import type { DropdownMenuBond, DropdownMenuBondProps } from './bond.svelte';

export type DropdownMenuRootProps = Omit<PopoverRootProps, 'factory' | 'onopenchange'> & {
	factory?: ((props: DropdownMenuBondProps) => DropdownMenuBond) | undefined;
	onopenchange?: StateChangeCallback<boolean, DropdownMenuBond> | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownMenuContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {}
