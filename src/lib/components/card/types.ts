import type { Snippet } from 'svelte';
import type { CardBond } from './bond.svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';

export type CardRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
	disabled?: boolean;
	factory?: Factory<CardBond>;
	children?: Snippet<[{ card: CardBond }]>;
	onclick?: (event: MouseEvent) => void;
	onkeydown?: (event: KeyboardEvent) => void;
};
