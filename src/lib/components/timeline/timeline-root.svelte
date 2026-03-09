<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { setTimelineContext } from './context';
	import type { TimelineRootProps } from './types';

	let {
		class: klass = '',
		orientation = 'vertical',
		align = 'left',
		preset = 'timeline',
		children,
		...restProps
	}: TimelineRootProps & HTMLAttributes<HTMLOListElement> = $props();

	setTimelineContext({ orientation, align });
</script>

<HtmlAtom
	{preset}
	as="ol"
	class={[
		'timeline-root',
		orientation === 'vertical'   ? 'flex flex-col' : 'flex flex-row',
		'$preset',
		klass
	]}
	aria-label="Timeline"
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
