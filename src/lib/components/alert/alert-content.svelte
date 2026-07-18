<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { AlertBond } from './bond.svelte';
	import type { AlertContentProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertContentProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(AlertBond, 'content', () => restProps, {
		context: 'optional',
		preset: () => preset
	});
	const bond = part.bond;
</script>

<HtmlAtom
	{bond}
	class={['alert-content border-border flex-1 space-y-1', '$preset', klass]}
	{...part.props}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
