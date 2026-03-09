<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { SkeletonProps } from './types';

	let {
		class: klass = '',
		loading = true,
		preset = 'skeleton',
		shimmerContent = undefined,
		children = undefined,
		...restProps
	}: SkeletonProps & HTMLAttributes<HTMLSpanElement> = $props();
</script>

<!-- ─── Default part snippets ──────────────────────────────────────────── -->

{#snippet defaultShimmer()}
	<span
		class="skeleton-shimmer absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"
		aria-hidden="true"
	/>
{/snippet}

<!-- ─── Render ────────────────────────────────────────────────────────── -->

{#if loading}
	<HtmlAtom
		{preset}
		as="span"
		class={[
			'skeleton-root bg-muted relative block overflow-hidden rounded',
			'$preset',
			klass
		]}
		aria-busy="true"
		aria-live="polite"
		{...restProps}
	>
		{@render (shimmerContent ?? defaultShimmer)()}
	</HtmlAtom>
{:else if children}
	{@render children()}
{/if}
