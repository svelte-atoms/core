<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { BannerActionsProps } from './types';

	let {
		class: klass = '',
		preset = 'banner.actions',
		children,
		...restProps
	}: BannerActionsProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['banner-actions flex shrink-0 items-center gap-2', '$preset', klass]}
	{...restProps}
>
	{@render children?.()}
</HtmlAtom>
