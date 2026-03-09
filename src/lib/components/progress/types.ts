import type { Component, Snippet } from 'svelte';
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
	 * Whether to show the percentage label
	 * @default false
	 */
	showLabel?: boolean;
	/**
	 * Custom label snippet — receives `{ value, percent }`.
	 * Renders inside/alongside the progress indicator.
	 */
	labelContent?: Component | Snippet<[{ value: number | null; percent: number | null }]>;
	/**
	 * Custom fill/indicator snippet — replaces the default fill bar (linear) or arc (circular).
	 * Receives `{ value, percent }`.
	 */
	fillContent?: Component | Snippet<[{ value: number | null; percent: number | null }]>;
	/**
	 * Child content
	 */
	children?: Snippet<[]>;
}
