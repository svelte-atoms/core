import type { Snippet } from 'svelte';
import type { Placement } from '@floating-ui/dom';
import type { Factory } from '$svelte-atoms/core/types';
import type { Override } from '$svelte-atoms/core/types';
import type { PopoverBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { PortalBond } from '../portal';

/**
 * Extend this interface to add custom popover root properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverRootExtendProps {}

/**
 * Extend this interface to add custom popover content properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverContentExtendProps {}

/**
 * Extend this interface to add custom popover arrow properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverArrowExtendProps {}

/**
 * Extend this interface to add custom popover trigger properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverTriggerExtendProps {}

export interface PopoverRootProps extends PopoverRootExtendProps {
	open?: boolean;
	disabled?: boolean;
	placements?: Placement[];
	placement?: Placement;
	offset?: number;
	portal?: string | PortalBond;
	extend?: Record<string, unknown>;
	factory?: Factory<PopoverBond>;
	children?: Snippet<[{ popover: PopoverBond }]>;
}

export interface AnimateParams {
	x: number;
	y: number;
	xOffset: number;
	yOffset: number;
	open: boolean;
}

export interface PopoverContentProps<T extends HtmlElementTagName, B extends Base = Base>
	extends Override<
			HtmlAtomProps<T, B>,
			{
				children?: Snippet<[{ popover?: PopoverBond }]>;
			}
		>,
		PopoverContentExtendProps {}

export interface PopoverArrowProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		PopoverArrowExtendProps {}

export interface PopoverTriggerProps<T extends keyof HTMLElementTagNameMap, B extends Base = Base>
	extends Omit<HtmlAtomProps<T, B>, 'children'>,
		PopoverTriggerExtendProps {
	children?: Snippet<[{ popover?: PopoverBond }]>;
}
