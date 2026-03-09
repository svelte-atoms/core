import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom progress properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProgressExtendProps {}

export interface ProgressProps extends HtmlAtomProps<'div'>, ProgressExtendProps {
	/**
	 * Current value (0–max). Set to `null` for indeterminate state.
	 * @default null
	 */
	value?: number | null;
	/**
	 * Maximum value
	 * @default 100
	 */
	max?: number;
	/**
	 * Visual variant
	 * @default 'linear'
	 */
	variant?: 'linear' | 'circular';
	/**
	 * Show the default percentage label
	 * @default false
	 */
	showLabel?: boolean;
	/**
	 * Custom label — replaces the default percentage text.
	 * Receives `{ value, percent }`.
	 */
	labelContent?: Snippet<[{ value: number | null; percent: number | null }]>;
	/**
	 * Custom fill — replaces the default fill bar (linear) or arc (circular).
	 * Receives `{ value, percent }`.
	 */
	fillContent?: Snippet<[{ value: number | null; percent: number | null }]>;
	/**
	 * Child content (rendered after the progress root)
	 */
	children?: Snippet<[]>;
}
