<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { TreeBond } from './bond.svelte';
	import type { TreeBodyProps } from './types';
	import { animateTreeBody } from './motion.svelte';

	const bond = TreeBond.getOrThrow('<Tree.Body /> must be used within a <Tree.Root />');

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: TreeBodyProps<E, B> = $props();

	const defaults = {
		animate: animateTreeBody(),
		initial: animateTreeBody({ duration: 0 })
	};

	const atom = createAtomInstance('body', {
		bond,
		factory: (owner) => owner!.body()
	});

	const bodyProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom {bond} class={['overflow-hidden pl-4', '$preset', klass]} {defaults} {...bodyProps}>
	{@render children?.({ tree: bond })}
</HtmlAtom>
