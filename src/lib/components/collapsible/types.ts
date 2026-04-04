import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$svelte-atoms/core/components/atom';
import type { Factory, Override } from '$svelte-atoms/core/types';
import type { CollapsibleBond } from './bond.svelte';

/**
 * Extend this interface to add custom collapsible root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollapsibleRootExtendProps {}

/**
 * Extend this interface to add custom collapsible header properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollapsibleHeaderExtendProps {}

/**
 * Extend this interface to add custom collapsible body properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollapsibleBodyExtendProps {}

/**
 * Extend this interface to add custom collapsible indicator properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CollapsibleIndicatorExtendProps {}

// ============================================================================
// Collapsible Snippet Props (Extensible)
// ============================================================================

export interface CollapsibleSnippetProps extends SnippetProps {
	collapsible: CollapsibleBond;
}

export type CollapsibleChildren = Snippet<[CollapsibleSnippetProps]>;

export type CollapsibleRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, CollapsibleChildren> &
	CollapsibleRootExtendProps & {
		open?: boolean;
		value?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
		disabled?: boolean;
		factory?: Factory<CollapsibleBond>;
	};

export type CollapsibleHeaderProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, CollapsibleChildren> & CollapsibleHeaderExtendProps;

export type CollapsibleBodyProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, CollapsibleChildren> & CollapsibleBodyExtendProps;

export type CollapsibleIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B, CollapsibleChildren> & CollapsibleIndicatorExtendProps;

/**
 * @deprecated Use CollapsibleRootExtendProps instead
 */
export type CollapsibleExtendProps = CollapsibleRootExtendProps;
