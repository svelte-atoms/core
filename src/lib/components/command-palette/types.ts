import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';
import type { DialogProps } from '$svelte-atoms/core/components/dialog/types';
import type { CommandPaletteBond } from './bond.svelte.ts';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommandPaletteRootExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommandPaletteItemExtendProps {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CommandPaletteGroupExtendProps {}

export interface CommandPaletteRootProps
	extends Omit<DialogProps, 'children'>,
		CommandPaletteRootExtendProps {
	/** Controlled search query (bindable) */
	query?: string;
	/** Placeholder for search input */
	placeholder?: string;
	/** Called when query changes */
	onsearch?: (query: string) => void;
	children?: Snippet<[{ commandPalette: CommandPaletteBond }]>;
}

export interface CommandPaletteInputProps extends HtmlAtomProps<'div'> {}

export interface CommandPaletteListProps extends HtmlAtomProps<'div'> {
	children?: Snippet<[]>;
}

export interface CommandPaletteGroupProps
	extends HtmlAtomProps<'div'>,
		CommandPaletteGroupExtendProps {
	/** Group heading label */
	label?: string;
	children?: Snippet<[]>;
}

export interface CommandPaletteItemProps
	extends HtmlAtomProps<'button'>,
		CommandPaletteItemExtendProps {
	/** Value used for keyboard navigation and selection */
	value?: string;
	/** Whether the item is disabled */
	disabled?: boolean;
	/** Left icon/content snippet */
	iconContent?: Snippet<[]>;
	/** Right shortcut/content snippet */
	suffixContent?: Snippet<[]>;
	/** Called when this item is selected */
	onselect?: () => void;
	children?: Snippet<[]>;
}

export interface CommandPaletteEmptyProps extends HtmlAtomProps<'div'> {
	children?: Snippet<[]>;
}
