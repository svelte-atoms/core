<script lang="ts" generics="E extends keyof HTMLElementTagNameMap='div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverFooterProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';

	type Element = HTMLElementTagNameMap[E];

	let {
		preset = undefined,
		children = undefined,
		...restProps
	}: SlideoverFooterProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(DrawerBond, 'footer', () => restProps, {
		message: '<Drawer.Footer /> must be used within a <Drawer.Root />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {bond} {...part.props}>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
