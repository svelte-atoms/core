<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { SidebarBond } from './bond.svelte';
	import { animateSidebarContent } from './motion.svelte';
	import type { SidebarRootProps } from './types';

	const bond = SidebarBond.get();

	let {
		class: klass = '',
		children = undefined,
		fallback = {
			animate: animateSidebarContent({ '0': '0px', '1': 'auto' }),
			initial: animateSidebarContent({ '0': '0px', '1': 'auto', duration: 0 })
		},
		...restProps
	}: SidebarRootProps<E, B> = $props();

	const contentProps = $derived({
		...bond?.content().spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	preset="sidebar.content"
	class={['bg-card border-border', '$preset', klass]}
	{fallback}
	{...contentProps}
>
	{@render children?.({ sidebar: bond })}
</HtmlAtom>
