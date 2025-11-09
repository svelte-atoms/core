import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { TabsBond } from './bond.svelte';
import type { TabBond } from './tab/bond.svelte';

/**
 * Extend this interface to add custom tabs root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabsRootExtendProps {}

/**
 * Extend this interface to add custom tab header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabHeaderExtendProps {}

/**
 * Extend this interface to add custom tab body properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabBodyExtendProps {}

/**
 * Extend this interface to add custom tab description properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TabDescriptionExtendProps {}

export type TabsRootProps<
	D extends string = string,
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = Omit<HtmlAtomProps<E, B>, 'children'> &
	TabsRootExtendProps & {
		value?: D;
		factory?: Factory<TabsBond>;
		children?: Snippet<[{ tabs: TabsBond }]>;
		onchange?: (value: D) => void;
	};

export type TabHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'button',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TabHeaderExtendProps & {
		children?: Snippet<[{ tab?: TabBond<unknown> }]>;
		onpointerdown?: (ev: PointerEvent, context: { tab?: TabBond<unknown> }) => void;
	};

export type TabBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TabBodyExtendProps & {
		children?: Snippet<[{ tab?: TabBond<unknown> }]>;
	};

export type TabDescriptionProps<
	E extends keyof HTMLElementTagNameMap = 'p',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TabDescriptionExtendProps & {
		children?: Snippet<[{ tab?: TabBond<unknown> }]>;
	};

/**
 * @deprecated Use TabsRootExtendProps instead
 */
export type TabsExtendProps = TabsRootExtendProps;
