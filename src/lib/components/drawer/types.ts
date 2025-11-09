import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Override, Factory } from '$svelte-atoms/core/types';
import type { TransitionFunction } from '$svelte-atoms/core/components/element';
import type { PortalBond } from '$svelte-atoms/core/components/portal';
import type { DrawerBond } from './bond.svelte';

/**
 * Extend this interface to add custom drawer/slideover root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerContentExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerHeaderExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover body properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerBodyExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover footer properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerFooterExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover title properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerTitleExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover description properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerDescriptionExtendProps {}

/**
 * Extend this interface to add custom drawer/slideover backdrop properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DrawerBackdropExtendProps {}

export interface SlideoverRootProps<E extends keyof HTMLElementTagNameMap, B extends Base = Base>
	extends Override<
			HtmlAtomProps<E, B>,
			{
				children?: Snippet<[{ drawer: DrawerBond }]>;
				initial?: (node: HTMLElement, bond: DrawerBond) => void;
				enter?: (node: HTMLElement, bond: DrawerBond) => TransitionFunction<'dialog'>;
				exit?: (node: HTMLElement, bond: DrawerBond) => TransitionFunction<'dialog'>;
			}
		>,
		DrawerExtendProps {
	open?: boolean;
	disabled?: boolean;
	portal?: string | PortalBond;
	onclose?: (event: Event, bond: DrawerBond) => void;
	factory?: Factory<DrawerBond>;
}

export interface SlideoverContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DrawerContentExtendProps {}

export interface SlideoverHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ drawer?: DrawerBond }]> }>,
		DrawerHeaderExtendProps {}

export interface DrawerBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ drawer?: DrawerBond }]> }>,
		DrawerBodyExtendProps {}

export interface SlideoverFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends Override<HtmlAtomProps<E, B>, { children?: Snippet<[{ drawer?: DrawerBond }]> }>,
		DrawerFooterExtendProps {}

export interface SlideoverTitleProps<
	E extends keyof HTMLElementTagNameMap = 'h2',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DrawerTitleExtendProps {}

export interface SlideoverDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DrawerDescriptionExtendProps {}

export interface SlideoverBackdropProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		DrawerBackdropExtendProps {}
