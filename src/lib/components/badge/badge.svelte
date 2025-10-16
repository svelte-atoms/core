<script lang="ts">
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { BadgeProps } from './types';

	const preset = getPreset('badge');

	let {
		class: klass = '',
		as = preset?.as ?? 'span',
		base = preset?.base as B,
		children = undefined,
		...restProps
	}: BadgeProps = $props();
</script>

<HtmlAtom
	class={[
		'bg-foreground/10 text-foreground inline-flex h-auto items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
		toClassValue.apply(null, [preset?.class]),
		toClassValue.apply(null, [klass])
	]}
	{as}
	{base}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
