import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base, SnippetProps } from '$ixirjs/ui/components/atom';
import type { PopoverRootProps } from '$ixirjs/ui/components/popover';
import type { StateChangeCallback } from '$ixirjs/ui/types';
import type { TooltipBond, TooltipBondProps } from './bond.svelte';

// Tooltip Snippet Props

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TooltipSnippetProps extends SnippetProps {}

export type TooltipChildren = Snippet<[TooltipSnippetProps]>;

export type TooltipRootProps = Omit<PopoverRootProps, 'factory' | 'onopenchange'> & {
	factory?: ((props: TooltipBondProps) => TooltipBond) | undefined;
	onopenchange?: StateChangeCallback<boolean, TooltipBond> | undefined;
};

export interface TooltipTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, TooltipChildren> {
	content?: string | Snippet<[TooltipSnippetProps]>;
	placement?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
}
