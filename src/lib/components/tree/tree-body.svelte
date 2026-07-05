<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { TreeBond } from './bond.svelte';
	import type { TreeBodyProps } from './types';
	import { animateTreeBody } from './motion.svelte';

	const bond = TreeBond.get();

	let {
		class: klass = '',
		children = undefined,
		fallback = {
			animate: animateTreeBody(),
			initial: animateTreeBody({ duration: 0 })
		},
		...restProps
	}: TreeBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="tree.body"
	class={['border-border pl-4', '$preset', klass]}
	{fallback}
	{...bodyProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
