<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { BadgeProps } from './types';
	import { badgeVariants } from './variants';

	let {
		class: klass = '',
		as = 'span',
		variant = 'default',
		size = 'md',
		children = undefined,
		...restProps
	}: BadgeProps = $props();
</script>

<HtmlAtom
	preset="badge"
	class={[
		'inline-flex h-auto w-fit items-center rounded-full font-medium',
		'$preset',
		klass
	]}
	{as}
	variants={badgeVariants}
	{variant}
	{size}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
