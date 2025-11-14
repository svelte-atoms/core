<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { HtmlAtom } from '../atom';

	let {
		class: klass = '',
		preset = 'calendar.event',
		element = $bindable(undefined),
		children,
		...restProps
	} = $props();
</script>

<HtmlAtom {preset} class={cn('calendar-event', klass)} {...restProps}>
	{@render children?.()}
</HtmlAtom>
