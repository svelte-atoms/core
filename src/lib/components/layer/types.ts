import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';
import type { Factory } from '$svelte-atoms/core/types';
import type { LayerBond } from './bond.svelte';

/**
 * Extend this interface to add custom layer properties in your application.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LayerExtendProps {}

export interface LayerRootProps<
	E extends keyof HTMLElementTagNameMap = 'div',
	B extends Base = Base
> extends HtmlAtomProps<E, B>,
		LayerExtendProps {
	factory?: Factory<LayerBond>;
}
