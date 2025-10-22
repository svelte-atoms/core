<script>
	import { Input } from '../input';

	let { children, ...restProps } = $props();
</script>

<Input.Root {...restProps}>
	{@render children?.()}
</Input.Root>
