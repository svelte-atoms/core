<script lang="ts">
	import { cn } from '$svelte-atoms/core/utils';
	import { Icon, type IconProps } from '$svelte-atoms/core/components/icon';

	let { class: klass = '', children = undefined, ...restProps }: IconProps = $props();
</script>

<Icon
	class={[
		'flex aspect-square h-full items-center justify-center bg-transparent text-sm leading-0',
		klass
	]}
	{...restProps}
>
	{@render children?.()}
</Icon>
