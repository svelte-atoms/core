import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

export interface SliderChangeDetails {
	value: number;
	percent: number;
	min: number;
	max: number;
	step: number;
	type: 'number';
}

export interface SliderProps extends HtmlAtomProps<'div'> {
	/**
	 * Current value
	 */
	value?: number;
	/**
	 * Minimum value
	 * @default 0
	 */
	min?: number;
	/**
	 * Maximum value
	 * @default 100
	 */
	max?: number;
	/**
	 * Step increment
	 * @default 1
	 */
	step?: number;
	/**
	 * Whether the slider is disabled
	 */
	disabled?: boolean;
	/**
	 * The id forwarded to the hidden input
	 */
	id?: string;
	/**
	 * The name forwarded to the hidden input
	 */
	name?: string;
	/**
	 * Orientation of the slider
	 * @default 'horizontal'
	 */
	orientation?: 'horizontal' | 'vertical';
	/**
	 * Custom thumb — replaces the default circular thumb.
	 * Receives `{ value, percent }`.
	 */
	thumbContent?: Snippet<[{ value: number; percent: number }]>;
	/**
	 * Custom track — replaces the default track + fill bar.
	 * Receives `{ value, percent, min, max }`.
	 */
	trackContent?: Snippet<[{ value: number; percent: number; min: number; max: number }]>;
	/**
	 * Child content (e.g. label rendered after the slider root)
	 */
	children?: Snippet<[]>;
	/**
	 * Change handler (fires on release)
	 */
	onchange?: (ev?: Event, options?: SliderChangeDetails) => void;
	/**
	 * Input handler (fires continuously while dragging)
	 */
	oninput?: (ev?: Event, options?: SliderChangeDetails) => void;
}
