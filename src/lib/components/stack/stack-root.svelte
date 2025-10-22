<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';

	import './stack.css';

	type Element = ElementType<E>;

	let {
		class: klass = '',
		children,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();
</script>

<HtmlAtom preset="stack.root" class={['stack-root flex flex-1', '$preset', klass]} {...restProps}>
	{@render children?.()}
</HtmlAtom>
