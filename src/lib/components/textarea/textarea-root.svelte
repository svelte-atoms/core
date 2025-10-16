<script>
	import { cn } from '$svelte-atoms/core/utils';

	let { class: klass = '', children, ...restProps } = $props();
</script>

<div
	class={['border-stroke-0/50 bg-background-0 w-full rounded-lg border p-2', klass]}
	{...restProps}
>
	{@render children?.()}
</div>
