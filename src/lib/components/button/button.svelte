<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ButtonProps } from './types';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',
		type = 'button',
		preset = 'button',
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
		'button text-primary-foreground bg-primary hover:bg-primary/95 active:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground w-fit cursor-pointer rounded-md px-3 py-2 transition-colors duration-200',
		'$preset',
		klass
	]}
	{...buttonProps}
>
	{@render children?.()}
</HtmlAtom>
