import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { PortalBond } from '$svelte-atoms/core/components/portal';
import type { DialogBond, DialogBondProps } from './bond.svelte';

/**
 * Extend this interface to add custom dialog root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogExtendProps {}

/**
 * Extend this interface to add custom dialog content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogContentExtendProps {}

/**
 * Extend this interface to add custom dialog header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogHeaderExtendProps {}

/**
 * Extend this interface to add custom dialog body properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogBodyExtendProps {}

/**
 * Extend this interface to add custom dialog footer properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogFooterExtendProps {}

/**
 * Extend this interface to add custom dialog title properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogTitleExtendProps {}

/**
 * Extend this interface to add custom dialog description properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogDescriptionExtendProps {}

/**
 * Extend this interface to add custom dialog close button properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DialogCloseButtonExtendProps {}

export interface DialogProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends Omit<HtmlAtomProps<E, B>, 'children'>,
		DialogExtendProps {
	open?: boolean;
	disabled?: boolean;
	portal?: string | PortalBond;
	factory?: (props: DialogBondProps) => DialogBond;
	children?: Snippet<[{ dialog: DialogBond }]>;
}

export interface DialogContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogContentExtendProps {}

export interface DialogHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogHeaderExtendProps {}

export interface DialogBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogBodyExtendProps {}

export interface DialogFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogFooterExtendProps {}

export interface DialogTitleProps<
	E extends keyof HTMLElementTagNameMap = 'h2',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogTitleExtendProps {}

export interface DialogDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogDescriptionExtendProps {}

export interface DialogCloseButtonProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DialogCloseButtonExtendProps {}
