<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h3', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { DrawerBond } from './bond.svelte';
	import type { SlideoverTitleProps } from './types';
	import { usePart } from '$ixirjs/ui/shared';

	type Element = HTMLElementTagNameMap[E];

	let {
		preset = undefined,
		as = 'h3' as E,
		children,
		...restProps
	}: SlideoverTitleProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(DrawerBond, 'title', () => restProps, {
		message: '<Drawer.Title /> must be used within a <Drawer.Root />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {as} {bond} {...part.props}>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
