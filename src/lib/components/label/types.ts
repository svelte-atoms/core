import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom label properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LabelExtendProps {}

export interface LabelProps<E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base>
	extends HtmlAtomProps<E, B>, LabelExtendProps {
	for?: string | null;
	children?: Snippet<[]>;
}
