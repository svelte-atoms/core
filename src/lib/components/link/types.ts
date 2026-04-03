import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface LinkProps<E extends keyof HTMLElementTagNameMap = 'a', B extends Base = Base>
	extends HtmlAtomProps<E, B> {}
