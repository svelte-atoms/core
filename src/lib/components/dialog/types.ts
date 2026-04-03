import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { PortalBond } from '$svelte-atoms/core/components/portal';
import type { DialogBond, DialogBondProps } from './bond.svelte';

export interface DialogProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends Omit<HtmlAtomProps<E, B>, 'children'> {
	open?: boolean;
	disabled?: boolean;
	/** Controls backdrop click behaviour. 'modal' closes on backdrop click (default); 'non-modal' keeps it open. */
	type?: 'modal' | 'non-modal' | undefined;
	portal?: string | PortalBond;
	factory?: (props: DialogBondProps) => DialogBond;
	children?: Snippet<[{ dialog: DialogBond }]>;
	trigger?: Snippet<[{ dialog: DialogBond }]>;
}

export interface DialogContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface DialogHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface DialogBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface DialogFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface DialogTitleProps<
	E extends keyof HTMLElementTagNameMap = 'h2',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface DialogDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface DialogCloseButtonProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}
