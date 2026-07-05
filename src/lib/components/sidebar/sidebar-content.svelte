<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import { PortalHost } from '$ixirjs/ui/components/portal/host';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { SidebarBond } from './bond.svelte';
	import { animateSidebarContent } from './motion.svelte';
	import type { SidebarRootProps } from './types';

	const bond = SidebarBond.getOrThrow('<Sidebar.Content /> must be used within a <Sidebar.Root />');

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: SidebarRootProps<E, B> = $props();

	const defaults = {
		animate: animateSidebarContent({ '0': '0px', '1': 'auto' }),
		initial: animateSidebarContent({ '0': '0px', '1': 'auto', duration: 0 })
	};

	const atom = createAtomInstance('content', {
		bond,
		factory: (owner) => owner!.content()
	});

	const contentProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<PortalHost
	{bond}
	class={['bg-card max-h-screen overflow-visible', '$preset', klass]}
	{defaults}
	{...contentProps}
>
	{@render children?.({ sidebar: bond })}
</PortalHost>
