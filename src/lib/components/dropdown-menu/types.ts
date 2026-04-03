import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface DropdownMenuListProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {}
