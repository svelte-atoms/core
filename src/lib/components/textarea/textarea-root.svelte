<script>
	import { Input } from '../input';

	let { class: klass = '', children, preset = undefined, ...restProps } = $props();

	const textareaProps = $derived({ preset: preset ?? 'textarea', ...restProps });
</script>

<Input.Root class={['h-auto', klass]} {...textareaProps}>
	{@render children?.()}
</Input.Root>
