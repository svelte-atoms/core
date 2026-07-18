<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { SlideoverBackdropProps } from './types';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { DrawerBond } from './bond.svelte';

	type Element = HTMLElementTagNameMap[E];

	let {
		class: klass = '',
		preset = undefined,
		...restProps
	}: SlideoverBackdropProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(DrawerBond, 'backdrop', () => restProps, {
		message: '<Drawer.Backdrop /> must be used within a <Drawer.Root />',
		preset: () => preset
	});
</script>

<HtmlAtom
	bond={part.bond}
	class={['border-border absolute inset-0 bg-black/30', '$preset', klass]}
	{...part.props}
/>
