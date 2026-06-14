<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { PortalBond } from './bond.svelte';
	import {
		HtmlAtom,
		type ElementType,
		type HtmlAtomProps,
		type Base
	} from '$svelte-atoms/core/components/atom';

	type Element = ElementType<E>;

	const bond = PortalBond.get();

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: HtmlAtomProps<E, B> & HTMLAttributes<Element> = $props();

	const atom = bond?.atom('inner');

	const bondProps = $derived({
		preset: preset ?? atom?.preset ?? 'portal.inner',
		...atom?.spread,
		...restProps
	});
</script>

<HtmlAtom
	{bond}
	class={['border-border relative size-full', '$preset', klass]}
	{...bondProps}
>
	{@render children?.()}
</HtmlAtom>
