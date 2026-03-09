<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getResizableContext } from './context';
	import type { ResizablePanelProps } from './types';

	let {
		class: klass = '',
		defaultSize = 50,
		minSize = 10,
		maxSize = 90,
		preset = 'resizable.panel',
		children,
		...restProps
	}: ResizablePanelProps & HTMLAttributes<HTMLDivElement> = $props();

	const ctx = getResizableContext();
	const id = Symbol();
	ctx.registerPanel(id, defaultSize, minSize, maxSize);

	const size = $derived(ctx.getPanelSize(id));
	const isHorizontal = $derived(ctx.direction === 'horizontal');
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['resizable-panel min-h-0 min-w-0 overflow-auto', '$preset', klass]}
	style="{isHorizontal ? 'width' : 'height'}: {size}%; flex-shrink: 0; flex-grow: 0;"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
