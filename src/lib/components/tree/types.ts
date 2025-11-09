import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { TreeBond, TreeBondProps } from './bond.svelte';

/**
 * tree root properties
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TreeRootExtendProps {}

export type TreeRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TreeRootExtendProps & {
		class?: string;
		open?: boolean;
		value?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
		disabled?: boolean;
		factory?: Factory<TreeBond>;
		children?: Snippet<[{ tree: TreeBond }]>;
	};

/**
 * tree header properties
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TreeHeaderExtendProps {}

export type TreeHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TreeHeaderExtendProps & {
		class?: string;
		open?: boolean;
		disabled?: boolean;
		children?: Snippet<[{ tree: TreeBond }]>;
	};

/**
 * tree body properties
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TreeBodyExtendProps {}

export type TreeBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TreeBodyExtendProps & {
		open?: boolean;
		disabled?: boolean;
		children?: Snippet<[{ tree?: TreeBond }]>;
	};

/**
 * tree indicator properties
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TreeIndicatorExtendProps {}

export type TreeIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B> &
	TreeBondProps &
	TreeIndicatorExtendProps & {
		children?: Snippet<[{ tree?: TreeBond }]>;
	};

/**
 * @deprecated Use TreeRootExtendProps instead
 */
export type TreeExtendProps = TreeRootExtendProps;
