<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { CollapsibleBond } from './bond.svelte';
	import { animateCollapsibleBody } from './motion.svelte';
	import type { CollapsibleBodyProps } from './types';

	const bond = CollapsibleBond.get();

	let {
		class: klass = '',
		children = undefined,
		fallback = {
			animate: animateCollapsibleBody(),
			initial: animateCollapsibleBody({ duration: 0 })
		},
		...restProps
	}: CollapsibleBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...bond?.body().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="collapsible.body"
	class={['border-border', '$preset', klass]}
	{fallback}
	{...bodyProps}
>
	{@render children?.({ collapsible: bond })}
</HtmlAtom>
