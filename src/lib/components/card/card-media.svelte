<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { CardBond } from './bond.svelte';
	import type { CardMediaProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		as = 'div' as E,
		children = undefined,
		...restProps
	}: CardMediaProps<E, B> = $props();

	const part = usePart(CardBond, 'media', () => restProps, {
		context: 'optional',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom
	{as}
	{bond}
	class={['card-media border-border overflow-hidden', '$preset', klass]}
	{...part.props}
>
	{@render children?.()}
</HtmlAtom>
