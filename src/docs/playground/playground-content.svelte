<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: klass = '', children, ...restProps } = $props();
</script>

<div
	class={cn('grid grid-cols-1 grid-rows-1 place-items-center gap-0 lg:grid-cols-2', klass)}
	{...restProps}
>
	{@render children?.()}
</div>
