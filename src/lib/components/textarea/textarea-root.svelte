<script>
	import { Input } from '../input';

	let { children, ...restProps } = $props();
</script>

<Input.Root preset="textarea" {...restProps}>
	{@render children?.()}
</Input.Root>
