<script>
	import { Input } from '../input';

	let { class: klass = '', children, ...restProps } = $props();
</script>

<Input.Root preset="textarea" class={['h-auto', klass]} {...restProps}>
	{@render children?.()}
</Input.Root>
