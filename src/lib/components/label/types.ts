import type { Snippet } from 'svelte';
import type { HtmlAtomProps, Base } from '$svelte-atoms/core/components/atom';

export interface LabelProps<E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base>
	extends HtmlAtomProps<E, B> {
	for?: string | null;
	children?: Snippet<[]>;
}
