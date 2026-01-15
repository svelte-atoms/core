import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom menu list properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MenuListExtendProps {}

export interface MenuListProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B>, MenuListExtendProps {}
