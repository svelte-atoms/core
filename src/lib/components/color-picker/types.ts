import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';
import type { PopoverRootProps } from '$svelte-atoms/core/components/popover/types';
import type { ColorPickerBond } from './bond.svelte.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorPickerRootExtendProps {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorPickerSwatchExtendProps {}

export interface ColorPickerRootProps
	extends Omit<PopoverRootProps, 'children'>,
		ColorPickerRootExtendProps {
	/** Current color as a hex string, e.g. '#ff0000' */
	value?: string;
	/** Preset swatch colors */
	swatches?: string[];
	/** Children receive the color picker bond */
	children?: Snippet<[{ colorPicker: ColorPickerBond }]>;
	/** Called whenever the value changes */
	onchange?: (value: string) => void;
}

export interface ColorPickerHexInputProps extends HtmlAtomProps<'div'> {}

/** Shared props for all domain slider components */
export interface ColorPickerSlidersProps extends HtmlAtomProps<'div'> {}

export interface ColorPickerSwatchesProps extends HtmlAtomProps<'div'> {}

export interface ColorPickerPreviewProps extends HtmlAtomProps<'div'> {}
