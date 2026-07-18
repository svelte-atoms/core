<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverDescriptionProps } from './types';
	import { DrawerBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';

	type Element = HTMLElementTagNameMap[E];

	let {
		preset = undefined,
		as = 'p' as E,
		children,
		...restProps
	}: SlideoverDescriptionProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(DrawerBond, 'description', () => restProps, {
		message: '<Drawer.Description /> must be used within a <Drawer.Root />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {as} {bond} {...part.props}>
	{@render children?.({ drawer: bond })}
</HtmlAtom>
