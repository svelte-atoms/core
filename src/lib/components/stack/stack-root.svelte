<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import './stack.css';

	type Element = ElementType<E>;

	const preset = getPreset('stack');

	let {
		class: klass = '',
		as = preset?.as,
		base = preset?.base as B,
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();
</script>

<HtmlAtom
	class={[
		'stack-root flex flex-1',
		toClassValue.apply(null, [preset?.class, {}]),
		toClassValue.apply(null, [klass, {}])
	]}
	{as}
	{base}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
