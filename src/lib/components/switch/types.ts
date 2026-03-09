import type { Snippet } from 'svelte';
import type { HtmlAtomProps } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom switch properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SwitchExtendProps {}

export interface SwitchProps extends HtmlAtomProps<'button'>, SwitchExtendProps {
	/**
	 * Whether the switch is on
	 */
	checked?: boolean;
	/**
	 * Whether the switch is disabled
	 */
	disabled?: boolean;
	/**
	 * The id attribute (forwarded to the hidden input)
	 */
	id?: string;
	/**
	 * The name attribute (forwarded to the hidden input)
	 */
	name?: string;
	/**
	 * The value attribute (forwarded to the hidden input)
	 */
	value?: string;
	/**
	 * Child content (label)
	 */
	children?: Snippet<[]>;
	/**
	 * Click handler
	 */
	onclick?: (ev?: MouseEvent) => void;
	/**
	 * Change handler
	 */
	onchange?: (ev?: Event, options?: { checked: boolean }) => void;
}
