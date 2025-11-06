import type { Snippet } from 'svelte';
import type { Placement } from '@floating-ui/dom';
import type { Factory } from '$svelte-atoms/core/types';
import type { PopoverBond } from './bond.svelte';
import type { Override } from '$svelte-atoms/core/types';
import type { Base, HtmlAtomProps } from '../atom';
import type { HtmlElementTagName } from '../element';
import type { PortalBond } from '../portal';

export type PopoverRootProps = {
	open?: boolean;
	disabled?: boolean;
	placements?: Placement[];
	placement?: Placement;
	offset?: number;
	portal?: string | PortalBond;
	extend?: Record<string, unknown>;
	factory?: Factory<PopoverBond>;
	children?: Snippet<[{ popover: PopoverBond }]>;
};

export type AnimateParams = {
	x: number;
	y: number;
	xOffset: number;
	yOffset: number;
	open: boolean;
};

export type PopoverContentProps<T extends HtmlElementTagName, B extends Base = Base> = Override<
	HtmlAtomProps<T, B>,
	{
		children?: Snippet<[{ popover?: PopoverBond }]>;
	}
>;

export type PopoverArrowProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> = HtmlAtomProps<E, B>;

export type PopoverTriggerProps<
	T extends keyof HTMLElementTagNameMap,
	B extends Base = Base
> = HtmlAtomProps<T, B> & {
	children?: Snippet<[{ popover?: PopoverBond }]>;
};
