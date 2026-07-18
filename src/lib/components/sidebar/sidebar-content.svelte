<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Base } from '$ixirjs/ui/components/atom';
	import { PortalHost } from '$ixirjs/ui/components/portal/host';
	import { usePart } from '$ixirjs/ui/shared';
	import { SidebarBond } from './bond.svelte';
	import { animateSidebarContent } from './motion.svelte';
	import type { SidebarRootProps } from './types';

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

	const part = usePart(SidebarBond, 'content', () => restProps, {
		message: '<Sidebar.Content /> must be used within a <Sidebar.Root />',
		preset: () => preset
	});
</script>

<PortalHost
	bond={part.bond}
	class={['bg-card max-h-screen overflow-visible', '$preset', klass]}
	{defaults}
	{...part.props}
>
	{@render children?.({ sidebar: part.bond })}
</PortalHost>
