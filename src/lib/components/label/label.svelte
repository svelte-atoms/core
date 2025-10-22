<script module lang="ts">
	import type { Snippet } from 'svelte';

	export type LabelProps<
		E extends keyof HTMLElementTagNameMap = 'label',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		for?: string | null;
		children?: Snippet<[]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import type { HTMLAttributes } from 'svelte/elements';

	type Element = ElementType<E>;

	let {
		class: klass = '',
		as = 'label' as E,
		for: labelfor = null,
		children,
		...restProps
	}: LabelProps<E, B> & HTMLAttributes<Element> = $props();
</script>

<HtmlAtom
	{as}
	preset="label"
	class={['font-medium', '$preset', klass]}
	for={labelfor}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
