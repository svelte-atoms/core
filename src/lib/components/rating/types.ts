import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RatingExtendProps {}

export interface RatingProps extends HtmlAtomProps<'div'>, RatingExtendProps {
	/** Current rating value (bindable) */
	value?: number;
	/** Total number of stars/items — default 5 */
	count?: number;
	/** Allow half-step values — default false */
	allowHalf?: boolean;
	/** Allow clicking the active star to clear — default true */
	allowClear?: boolean;
	/** Readonly display — no interaction */
	readonly?: boolean;
	/** Disabled */
	disabled?: boolean;
	/** Custom icon snippet — receives { index, filled, half } */
	iconContent?: Snippet<[{ index: number; filled: boolean; half: boolean; active: boolean }]>;
	/** Called when value changes */
	onchange?: (value: number) => void;
}
