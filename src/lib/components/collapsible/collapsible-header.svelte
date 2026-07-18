<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import type { CollapsibleHeaderProps } from './types';
	import { CollapsibleBond } from './bond.svelte';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: CollapsibleHeaderProps<E, B> = $props();

	const part = usePart(CollapsibleBond, 'header', () => restProps, {
		message: '<Collapsible.Header /> must be used within a <Collapsible.Root />',
		preset: () => preset
	});
</script>

<HtmlAtom
	bond={part.bond}
	class={['border-border flex cursor-pointer items-center gap-2', '$preset', klass]}
	{...part.props}
>
	{@render children?.({ collapsible: part.bond })}
</HtmlAtom>
