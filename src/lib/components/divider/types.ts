import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom divider properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DividerExtendProps {}

export interface DividerProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B>,
		DividerExtendProps {
	vertical?: boolean;
	transparent?: boolean;
}
