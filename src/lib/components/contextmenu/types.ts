import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ContextMenuTriggerProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B> {}
