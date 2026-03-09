<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SkeletonBlockProps } from './types';

	let {
		class: klass = '',
		preset = 'skeleton.block',
		shimmerContent = undefined,
		...restProps
	}: SkeletonBlockProps & HTMLAttributes<HTMLSpanElement> = $props();
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultShimmer()}
	<span
		class="skeleton-shimmer absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
		aria-hidden="true"
	/>
{/snippet}

<!-- ─── Render ────────────────────────────────────────────────────────── -->

<HtmlAtom
	{preset}
	as="span"
	class={[
		'skeleton-block bg-muted relative block overflow-hidden rounded',
		'$preset',
		klass
	]}
	{...restProps}
>
	{@render (shimmerContent ?? defaultShimmer)()}
</HtmlAtom>
