<script lang="ts">
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { BadgeProps } from './types';

	let { class: klass = '', as = 'span', children = undefined, ...restProps }: BadgeProps = $props();
</script>

<HtmlAtom
	preset="badge"
	class={[
		'bg-foreground/10 text-foreground inline-flex h-auto items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
		'$preset',
		klass
	]}
	{as}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
