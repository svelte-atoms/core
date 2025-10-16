<script lang="ts">
	let { children, ...restProps } = $props();
</script>

<div {...restProps}>
	{@render children?.()}
</div>
