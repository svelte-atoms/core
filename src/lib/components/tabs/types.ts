import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { TabsBond } from './bond.svelte';
import type { TabBond } from './tab/bond.svelte';

export interface TabsRootProps<
	D extends string = string,
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	value?: D;
	factory?: Factory<TabsBond>;
	children?: Snippet<[{ tabs: TabsBond }]>;
	onchange?: (value: D) => void;
}

export interface TabHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	children?: Snippet<[{ tab?: TabBond<unknown> }]>;
	onpointerdown?: (ev: PointerEvent, context: { tab?: TabBond<unknown> }) => void;
}

export interface TabBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	children?: Snippet<[{ tab?: TabBond<unknown> }]>;
}

export interface TabDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	children?: Snippet<[{ tab?: TabBond<unknown> }]>;
}

export interface TabsHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	children?: Snippet<[{ tabs?: TabsBond }]>;
}

export interface TabsBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	children?: Snippet<[{ tabs?: TabsBond }]>;
}

export interface TabsContentProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {
	children?: Snippet<[{ tabs?: TabsBond }]>;
}

/**
 * @deprecated Use TabsRootExtendProps instead
 */
export type TabsExtendProps = TabsRootProps;
