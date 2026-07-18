<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { PortalHost } from '$ixirjs/ui/components/portal/host';
	import type { SlideoverContentProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { animateDrawerContent, type DrawerSide } from './motion.svelte';
	import { usePart } from '$ixirjs/ui/shared';

	type Element = HTMLElementTagNameMap[E];

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: SlideoverContentProps<E, B> & HTMLAttributes<Element> & { side?: DrawerSide } = $props();

	const defaults = {
		animate: animateDrawerContent({}),
		initial: animateDrawerContent({ duration: 0 })
	};

	const part = usePart(DrawerBond, 'content', () => restProps, {
		message: '<Drawer.Content /> must be used within a <Drawer.Root />',
		preset: () => preset
	});
	const bond = part.bond;
	const isOpen = $derived(bond.props.open);
</script>

<HtmlAtom
	class={[
		'bg-card text-foreground border-border pointer-events-none absolute',
		isOpen && 'pointer-events-auto',
		'$preset',
		klass
	]}
	{bond}
	{defaults}
	{...part.props}
>
	<PortalHost>
		{@render children?.({ drawer: bond })}
	</PortalHost>
</HtmlAtom>
