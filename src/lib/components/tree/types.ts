import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$ixirjs/ui/components/atom';
import type { Factory, StateChangeCallback } from '$ixirjs/ui/types';
import type { TreeBond } from './bond.svelte';

export type TreeRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
	class?: string;
	open?: boolean;
	value?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	disabled?: boolean;
	factory?: Factory<TreeBond>;
	onopenchange?: StateChangeCallback<boolean, TreeBond> | undefined;
	children?: Snippet<[{ tree: TreeBond }]>;
};

export type TreeHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
	class?: string;
	open?: boolean;
	disabled?: boolean;
	children?: Snippet<[{ tree: TreeBond }]>;
};

export type TreeBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
	open?: boolean;
	disabled?: boolean;
	children?: Snippet<[{ tree?: TreeBond }]>;
};

export type TreeIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> & {
	open?: boolean;
	disabled?: boolean;
	children?: Snippet<[{ tree?: TreeBond }]>;
};
