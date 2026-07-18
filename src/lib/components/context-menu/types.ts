import type { HtmlAtomProps, Base } from '$ixirjs/ui/components/atom';
import type {
	PopoverContentProps,
	PopoverIndicatorProps,
	PopoverRootProps,
	PopoverTailProps
} from '$ixirjs/ui/components/popover';
import type { DropdownMenuItemProps } from '$ixirjs/ui/components/dropdown-menu/item/types';
import type { DividerProps } from '$ixirjs/ui/components/divider';
import type { ListGroupProps, ListTitleProps } from '$ixirjs/ui/components/list';
import type { StateChangeCallback } from '$ixirjs/ui/types';
import type { ContextMenuBond, ContextMenuBondProps } from './bond.svelte';

export type ContextMenuRootProps = Omit<PopoverRootProps, 'factory' | 'onopenchange'> & {
	factory?: ((props: ContextMenuBondProps) => ContextMenuBond) | undefined;
	onopenchange?: StateChangeCallback<boolean, ContextMenuBond> | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextMenuTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {}

export type ContextMenuContentProps<
	E extends keyof HTMLElementTagNameMap = 'ul',
	B extends Base = Base
> = PopoverContentProps<E, B>;

export type ContextMenuTailProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = PopoverTailProps<E, B>;

export type ContextMenuDividerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = DividerProps<E, B>;

export type ContextMenuGroupProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = ListGroupProps<E, B>;

export type ContextMenuIndicatorProps = Pick<
	PopoverIndicatorProps,
	'class' | 'preset' | 'children'
>;

export type ContextMenuItemProps<
	E extends keyof HTMLElementTagNameMap = 'li',
	B extends Base = Base
> = DropdownMenuItemProps<E, B>;

export type ContextMenuTitleProps<
	E extends keyof HTMLElementTagNameMap = 'h3',
	B extends Base = Base
> = ListTitleProps<E, B>;
