<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { PortalBond } from './bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';

	type Element = ElementType<E>;

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(PortalBond, 'inner', () => restProps, {
		message: '<Portal.Inner /> must be used within a <Portal.Outer />',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<!--
	Teleport sink and floating-ui boundary. `relative size-full` makes it the offsetParent the
	teleported `absolute` overlays anchor against; no overflow clip keeps containment soft.
-->
<HtmlAtom {bond} class={['relative size-full', '$preset', klass]} {...part.props}>
	{@render children?.()}
</HtmlAtom>
