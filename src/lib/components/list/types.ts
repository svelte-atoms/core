import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom list properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListExtendProps {}

export interface ListRootProps<E extends keyof HTMLElementTagNameMap = 'ul', B extends Base = Base>
	extends HtmlAtomProps<E, B>, ListExtendProps {}
