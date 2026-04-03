import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface ListRootProps<E extends keyof HTMLElementTagNameMap = 'ul', B extends Base = Base>
	extends HtmlAtomProps<E, B> {}
