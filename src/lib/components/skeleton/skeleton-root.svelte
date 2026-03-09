<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SkeletonRootProps } from './types';

	let {
		class: klass = '',
		loading = true,
		preset = 'skeleton',
		skeleton = undefined,
		children = undefined,
		...restProps
	}: SkeletonRootProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<HtmlAtom
	{preset}
	as="div"
	class={['skeleton-root', '$preset', klass]}
	aria-busy={loading}
	aria-live="polite"
	{...restProps}
>
	{#if loading}
		{@render skeleton?.()}
	{:else}
		{@render children?.()}
	{/if}
</HtmlAtom>
