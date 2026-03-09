<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ButtonProps } from './types';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { buttonVariants } from './variants';

	let {
		class: klass = '',
		type = 'button',
		preset = 'button',
		variant = 'default',
		size = 'md',
		children = undefined,
		...restProps
	}: ButtonProps & HTMLAttributes<HTMLButtonElement> = $props();

	const buttonProps = $derived({
		...restProps,
		type
	});
</script>

<HtmlAtom
	{preset}
	as="button"
	class={[
		'button border-border disabled:bg-muted disabled:text-muted-foreground w-fit cursor-pointer transition-colors duration-200',
		'$preset',
		klass
	]}
	variants={buttonVariants}
	{variant}
	{size}
	{...buttonProps}
>
	{@render children?.()}
</HtmlAtom>
