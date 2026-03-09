import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';
import type { PopoverRootProps } from '$svelte-atoms/core/components/popover/types';
import type { ColorPickerBond } from './bond.svelte.ts';

/**
 * Extend this interface to add custom color picker root properties.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorPickerRootExtendProps {}

/**
 * Extend this interface to add custom color picker swatch properties.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorPickerSwatchExtendProps {}

export interface ColorPickerRootProps
	extends Omit<PopoverRootProps, 'children'>,
		ColorPickerRootExtendProps {
	/**
	 * The current color value as a hex string (e.g. '#ff0000')
	 */
	value?: string;
	/**
	 * Preset swatches to display
	 */
	swatches?: string[];
	/**
	 * Children — receives the color picker bond
	 */
	children?: Snippet<[{ colorPicker: ColorPickerBond }]>;
	/**
	 * Called when the color value changes
	 */
	onchange?: (value: string) => void;
}

export interface ColorPickerSwatchProps
	extends HtmlAtomProps<'button'>,
		ColorPickerSwatchExtendProps {
	/**
	 * The hex color this swatch represents
	 */
	color?: string;
	/**
	 * Whether this swatch is currently selected
	 */
	selected?: boolean;
	/**
	 * Click handler
	 */
	onclick?: (ev?: MouseEvent) => void;
}

export interface ColorPickerHexInputProps extends HtmlAtomProps<'div'> {
	children?: Snippet<[]>;
}

export interface ColorPickerSlidersProps extends HtmlAtomProps<'div'> {
	/**
	 * Color domain for the sliders
	 * - 'hsl' — Hue / Saturation / Lightness (default)
	 * - 'hsv' — Hue / Saturation / Value
	 * - 'rgb' — Red / Green / Blue
	 * - 'hwb' — Hue / Whiteness / Blackness
	 * @default 'hsl'
	 */
	domain?: 'hsl' | 'hsv' | 'rgb' | 'hwb';
	children?: Snippet<[]>;
}

export interface ColorPickerSwatchesProps extends HtmlAtomProps<'div'> {
	children?: Snippet<[]>;
}

export interface ColorPickerPreviewProps extends HtmlAtomProps<'div'> {}
