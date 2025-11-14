<script lang="ts">
	let { snippet, ...restProps } = $props();
</script>

{@render snippet?.({ ...restProps })}
