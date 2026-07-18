<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { CardBond } from './bond.svelte';
	import type { CardTitleProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		as = 'h3' as E,
		children = undefined,
		...restProps
	}: CardTitleProps<E, B> = $props();

	const part = usePart(CardBond, 'title', () => restProps, {
		context: 'optional',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom
	{as}
	{bond}
	class={[
		'card-title border-border text-lg leading-none font-semibold tracking-tight',
		'$preset',
		klass
	]}
	{...part.props}
>
	{@render children?.()}
</HtmlAtom>
