import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

/**
 * Extend this interface to add custom stack properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StackExtendProps {}

export interface StackProps<E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base>
	extends HtmlAtomProps<E, B>,
		StackExtendProps {
	direction?: 'row' | 'column';
	gap?: number | string;
	align?: 'start' | 'center' | 'end' | 'stretch';
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}
