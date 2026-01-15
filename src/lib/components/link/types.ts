import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom link properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LinkExtendProps {}

export interface LinkProps<E extends keyof HTMLElementTagNameMap = 'a', B extends Base = Base>
	extends HtmlAtomProps<E, B>, LinkExtendProps {}
