import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';
import type { CarouselBond } from './bond.svelte.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CarouselRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CarouselItemExtendProps {}

export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselRootProps extends HtmlAtomProps<'div'>, CarouselRootExtendProps {
	/**
	 * Scroll orientation
	 * @default 'horizontal'
	 */
	orientation?: CarouselOrientation;
	/**
	 * Loop around from last to first and vice versa
	 * @default false
	 */
	loop?: boolean;
	/**
	 * Auto-play interval in ms. 0 = disabled.
	 * @default 0
	 */
	autoplay?: number;
	/**
	 * Currently active slide index (bindable)
	 */
	current?: number;
	children?: Snippet<[{ carousel: CarouselBond }]>;
}

export interface CarouselTrackProps extends HtmlAtomProps<'div'> {
	children?: Snippet<[]>;
}

export interface CarouselItemProps extends HtmlAtomProps<'div'>, CarouselItemExtendProps {
	children?: Snippet<[]>;
}

export interface CarouselPrevProps extends HtmlAtomProps<'button'> {
	children?: Snippet<[]>;
}

export interface CarouselNextProps extends HtmlAtomProps<'button'> {
	children?: Snippet<[]>;
}

export interface CarouselDotsProps extends HtmlAtomProps<'div'> {
	dotContent?: Snippet<[{ index: number; active: boolean }]>;
}
