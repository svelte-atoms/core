import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface StackRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {
	/** The value of the topmost (front) item — bindable, updates reactively */
	value?: string;
}

export interface StackItemProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B> {
	/** Unique identifier for this stack item */
	value: string;
}
