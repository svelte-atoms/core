<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'label', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type ElementType, type Base } from '$svelte-atoms/core/components/atom';
	import type { LabelProps } from './types';

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
