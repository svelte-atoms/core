<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { animate as runAnimation } from '$svelte-atoms/core/shared';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import { TreeBond } from './bond.svelte';
	import type { TreeIndicatorProps } from './types';

	const bond = TreeBond.getOrThrow('<Tree.Indicator /> must be used within a <Tree.Root />');

	const isOpen = $derived(bond.isOpen);

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

	const atom = createAtomInstance('indicator', {
		bond,
		factory: (owner) => owner!.indicator()
	});

	const indicatorProps = $derived(mergeAtomProps(atom, preset, restProps));

	function defaultAnimate(node: HTMLElement) {
		runAnimation(node, { rotate: 90 * +isOpen }, { duration: 0.18, ease: 'circOut' });
	}
</script>

<HtmlAtom {bond} class={['aspect-square h-fit', '$preset', klass]} {defaults} {...indicatorProps}>
	{@render children?.({ tree: bond })}
</HtmlAtom>
