import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';
import type { LayerRelation, PortalBond, ZIndexInput } from '$ixirjs/ui/components/portal';
import type { StateChangeCallback } from '$ixirjs/ui/types';
import type { DialogBond, DialogBondProps } from './bond.svelte';

export interface DialogSnippetProps extends SnippetProps {
	dialog: DialogBond;
}

export type DialogChildren = Snippet<[DialogSnippetProps]>;

export interface DialogProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {
	open?: boolean;
	disabled?: boolean;
	'z-index'?: ZIndexInput;
	/** Position relative to a named portal elevation anchor. */
	order?: LayerRelation;
	/** Modal (default) traps focus and blocks the background; non-modal preserves background access. */
	type?: 'modal' | 'non-modal' | undefined;
	portal?: string | PortalBond;
	factory?: (props: DialogBondProps) => DialogBond;
	onopenchange?: StateChangeCallback<boolean, DialogBond> | undefined;
	/** Native click handler for the rendered dialog element. */
	onclick?: ((event: MouseEvent) => void) | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogTitleProps<
	E extends keyof HTMLElementTagNameMap = 'h2',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {}

export interface DialogCloseButtonProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
> extends HtmlAtomProps<E, B, DialogChildren> {
	// Explicit so the close button can preserve native handlers before built-in activation.
	onclick?: ((event: MouseEvent) => void) | undefined;
	onkeydown?: ((event: KeyboardEvent) => void) | undefined;
}
