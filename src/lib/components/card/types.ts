import type { Snippet } from 'svelte';
import type { CardBond } from './bond.svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';

export interface CardRootProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends Omit<HtmlAtomProps<E, B>, 'children'> {
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
	extends HtmlAtomProps<E, B> {}

export interface CardBodyProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B> {}

export interface CardFooterProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface CardTitleProps<E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base>
	extends HtmlAtomProps<E, B> {}

export interface CardSubtitleProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface CardDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

export interface CardMediaProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {}

// Alias for CardBodyProps (used in card-body.svelte)
export type CardContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = CardBodyProps<E, B>;
