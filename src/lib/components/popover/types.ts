import type { Snippet } from 'svelte';
import type { Placement } from '@floating-ui/dom';
import type { Factory } from '$svelte-atoms/core/types';
import type { PopoverBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { PortalBond } from '../portal';

export type PopoverChildren = Snippet<[{ popover: PopoverBond }]>;

export interface PopoverRootProps {
	open?: boolean;
	disabled?: boolean;
	placements?: Placement[];
	placement?: Placement;
	offset?: number;
	portal?: string | PortalBond;
	extend?: Record<string, unknown>;
	factory?: Factory<PopoverBond>;
	children?: PopoverChildren;
}

export interface AnimateParams {
	x: number;
	y: number;
	xOffset: number;
	yOffset: number;
	open: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverContentProps<
	T extends HtmlElementTagName,
	B extends Base = Base
> extends HtmlAtomProps<T, B, PopoverChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, PopoverChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverArrowProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B, PopoverChildren> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PopoverTriggerProps<
	T extends keyof HTMLElementTagNameMap,
	B extends Base = Base
> extends HtmlAtomProps<T, B, PopoverChildren> {}
