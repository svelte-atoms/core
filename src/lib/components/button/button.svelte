<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { ButtonProps } from './types';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';

	const preset = getPreset('button');

	let {
		class: klass = '',
		type = 'button',
		base = preset?.base as B,
		children = undefined,
		...restProps
	}: ButtonProps & HTMLAttributes<HTMLButtonElement> = $props();

	const buttonProps = $derived({
		...restProps,
		type
	});
</script>

<HtmlAtom
	as="button"
	class={[
		'button text-foreground bg-foreground/10 hover:bg-foreground/15 active:bg-foreground/20 w-fit cursor-pointer rounded-md px-3 py-2 transition-colors duration-200',
		toClassValue.apply(null, [preset?.class]),
		toClassValue.apply(null, [klass])
	]}
	{base}
	{...buttonProps}
>
	{@render children?.()}
</HtmlAtom>
