import type { Snippet } from 'svelte';
import type { Placement } from '@floating-ui/dom';
import type { Factory } from '$svelte-atoms/core/types';
import type { Override } from '$svelte-atoms/core/types';
import type { PopoverBond } from './bond.svelte';
import type { Base, HtmlAtomProps } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { PortalBond } from '../portal';

export interface PopoverRootProps {
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

export interface PopoverContentProps<
	T extends HtmlElementTagName,
	B extends Base = Base
> extends HtmlAtomProps<T, B> {}

export interface PopoverIndicatorProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {}

export interface PopoverArrowProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {}

export interface PopoverTriggerProps<
	T extends keyof HTMLElementTagNameMap,
	B extends Base = Base
> extends HtmlAtomProps<T, B> {
	children?: Snippet<[{ popover?: PopoverBond }]>;
}
