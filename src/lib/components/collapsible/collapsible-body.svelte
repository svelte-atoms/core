<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { CollapsibleBond } from './bond.svelte';
	import { animateCollapsibleBody } from './motion.svelte';
	import type { CollapsibleBodyProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: CollapsibleBodyProps<E, B> = $props();

	const defaults = {
		animate: animateCollapsibleBody(),
		initial: animateCollapsibleBody({ duration: 0 })
	};

	const part = usePart(CollapsibleBond, 'body', () => restProps, {
		message: '<Collapsible.Body /> must be used within a <Collapsible.Root />',
		preset: () => preset
	});
</script>

<HtmlAtom bond={part.bond} class={['border-border', '$preset', klass]} {defaults} {...part.props}>
	{@render children?.({ collapsible: part.bond })}
</HtmlAtom>
