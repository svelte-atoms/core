import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom stack properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StackExtendProps {}

export interface StackRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, StackExtendProps {
	/** The value of the topmost (front) item — bindable, updates reactively */
	value?: string;
}

export interface StackItemProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
>
	extends HtmlAtomProps<E, B>, StackExtendProps {
	/** Unique identifier for this stack item */
	value: string;
}
