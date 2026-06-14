import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

interface ProgressSharedProps {
	// Current value (0–max); null = indeterminate (default: null).
	value?: number | null;
	// Maximum value (default: 100).
	max?: number;
}

export interface ProgressLinearProps extends HtmlAtomProps<'div'>, ProgressSharedProps {}

export interface ProgressCircularProps extends HtmlAtomProps<'div'>, ProgressSharedProps {}
