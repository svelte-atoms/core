import type { Snippet } from 'svelte';
import type { CardBond } from './bond.svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';

/**
 * Extend this interface to add custom card root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardExtendProps {}

/**
 * Extend this interface to add custom card header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardHeaderExtendProps {}

/**
 * Extend this interface to add custom card body/content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardBodyExtendProps {}

/**
 * Extend this interface to add custom card footer properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardFooterExtendProps {}

/**
 * Extend this interface to add custom card title properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardTitleExtendProps {}

/**
 * Extend this interface to add custom card subtitle properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardSubtitleExtendProps {}

/**
 * Extend this interface to add custom card description properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardDescriptionExtendProps {}

/**
 * Extend this interface to add custom card media properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CardMediaExtendProps {}

export interface CardRootProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends Omit<HtmlAtomProps<E, B>, 'children'>, CardExtendProps {
	disabled?: boolean;
	factory?: Factory<CardBond>;
	children?: Snippet<[{ card: CardBond }]>;
	onclick?: (event: MouseEvent) => void;
	onkeydown?: (event: KeyboardEvent) => void;
}

export interface CardHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, CardHeaderExtendProps {}

export interface CardBodyProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B>, CardBodyExtendProps {}

export interface CardFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, CardFooterExtendProps {}

export interface CardTitleProps<E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base>
	extends HtmlAtomProps<E, B>, CardTitleExtendProps {}

export interface CardSubtitleProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, CardSubtitleExtendProps {}

export interface CardDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, CardDescriptionExtendProps {}

export interface CardMediaProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, CardMediaExtendProps {}

// Alias for CardBodyProps (used in card-body.svelte)
export type CardContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = CardBodyProps<E, B>;
