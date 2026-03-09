<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { getBannerContext } from './context';
	import type { BannerCloseProps } from './types';

	const ctx = getBannerContext();

	let {
		class: klass = '',
		preset = 'banner.close',
		children,
		...restProps
	}: BannerCloseProps & HTMLButtonAttributes = $props();
</script>

<HtmlAtom
	{preset}
	as="button"
	type="button"
	class={[
		'banner-close text-background/70 hover:text-background shrink-0 rounded p-1 transition-colors focus-visible:outline-none focus-visible:ring-2',
		'$preset',
		klass
	]}
	aria-label="Dismiss"
	onclick={() => ctx?.dismiss()}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
			<path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
		</svg>
	{/if}
</HtmlAtom>
