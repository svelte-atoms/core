<script lang="ts">
	let { children, ...restProps } = $props();
</script>

<section {...restProps}>
	{@render children?.()}
</section>
