import { type Component, type Snippet } from 'svelte';
import { type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom radio properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RadioExtendProps {}

/**
 * Extend this interface to add custom radio group properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RadioGroupExtendProps {}

export interface RadioProps<T = string> extends HtmlAtomProps<'label'>, RadioExtendProps {
	/**
	 * The value of the radio button
	 */
	value?: T;
	/**
	 * The currently selected value (for standalone radios)
	 */
	group?: T;
	/**
	 * The id attribute of the radio input
	 */
	id?: string;
	/**
	 * The name attribute of the radio input
	 */
	name?: string;
	/**
	 * Whether the radio button is disabled
	 */
	disabled?: boolean;
	/**
	 * Whether the radio button is required
	 */
	required?: boolean;
	/**
	 * Whether the radio button is readonly
	 */
	readonly?: boolean;
	/**
	 * Custom content to display when the radio is checked
	 */
	checkedContent?: Component | Snippet;
	/**
	 * Child content (label text)
	 */
	children?: Snippet<[]>;
	/**
	 * Change event handler
	 */
	onchange?: (ev: Event, options?: { checked: boolean; value: boolean; type: 'boolean' }) => void;
	/**
	 * Input event handler
	 */
	oninput?: (ev: Event, options?: { checked: boolean; value: boolean; type: 'boolean' }) => void;
}

export interface RadioGroupProps<T = string> extends HtmlAtomProps<'div'>, RadioGroupExtendProps {
	/**
	 * The currently selected value
	 */
	value?: T;
	/**
	 * Whether all radio buttons in the group are disabled
	 */
	disabled?: boolean;
	/**
	 * Whether all radio buttons in the group are required
	 */
	required?: boolean;
	/**
	 * Whether all radio buttons in the group are readonly
	 */
	readonly?: boolean;
	/**
	 * The name attribute shared by all radio buttons in the group
	 */
	name?: string;
	/**
	 * Child content (radio buttons)
	 */
	children?: Snippet<[]>;
	/**
	 * Input event handler triggered when the selected value changes
	 */
	oninput?: (ev: CustomEvent, options?: { value: T }) => void;
}
