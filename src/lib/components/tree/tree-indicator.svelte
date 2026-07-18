<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { animate as runAnimation, usePart } from '$ixirjs/ui/shared';
	import { TreeBond } from './bond.svelte';
	import type { TreeIndicatorProps } from './types';

	let {
		open = $bindable(false),
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: TreeIndicatorProps<E, B> = $props();

	const defaults = {
		animate: defaultAnimate
	};

	const part = usePart(TreeBond, 'indicator', () => restProps, {
		message: '<Tree.Indicator /> must be used within a <Tree.Root />',
		preset: () => preset
	});
	const isOpen = $derived(part.bond.isOpen);

	function defaultAnimate(node: HTMLElement) {
		runAnimation(node, { rotate: 90 * +isOpen }, { duration: 0.18, ease: 'circOut' });
	}
</script>

<HtmlAtom
	bond={part.bond}
	class={['aspect-square h-fit', '$preset', klass]}
	{defaults}
	{...part.props}
>
	{@render children?.({ tree: part.bond })}
</HtmlAtom>
