<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import type { CardContentProps } from './types';
	import { CardBond } from './bond.svelte';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: CardContentProps<E, B> = $props();

	const part = usePart(CardBond, 'content', () => restProps, {
		context: 'optional',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom {bond} class={['card-content border-border px-4 pb-4', '$preset', klass]} {...part.props}>
	{@render children?.()}
</HtmlAtom>
