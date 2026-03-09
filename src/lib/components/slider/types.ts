import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom slider properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SliderExtendProps {}

export interface SliderProps extends HtmlAtomProps<'div'>, SliderExtendProps {
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
	 * Child content
	 */
	children?: Snippet<[]>;
	/**
	 * Change handler
	 */
	onchange?: (ev?: Event, options?: { value: number }) => void;
	/**
	 * Input handler (fires continuously while dragging)
	 */
	oninput?: (ev?: Event, options?: { value: number }) => void;
}
