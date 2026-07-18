<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { TreeBond } from './bond.svelte';
	import type { TreeBodyProps } from './types';
	import { animateTreeBody } from './motion.svelte';

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

	const part = usePart(TreeBond, 'body', () => restProps, {
		message: '<Tree.Body /> must be used within a <Tree.Root />',
		preset: () => preset
	});
</script>

<HtmlAtom
	bond={part.bond}
	class={['overflow-hidden pl-4', '$preset', klass]}
	{defaults}
	{...part.props}
>
	{@render children?.({ tree: part.bond })}
</HtmlAtom>
