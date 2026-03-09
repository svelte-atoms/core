<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import { setBannerContext } from './context';
	import type { BannerRootProps } from './types';

	let {
		class: klass = '',
		position = 'top',
		open = $bindable(true),
		dismissible = true,
		preset = 'banner',
		ondismiss = undefined,
		children,
		...restProps
	}: BannerRootProps & HTMLAttributes<HTMLDivElement> = $props();

	function dismiss() {
		open = false;
		ondismiss?.();
	}

	setBannerContext({ dismiss });
</script>

{#if open}
	<HtmlAtom
		{preset}
		as="div"
		class={[
			'banner-root z-50 w-full',
			position === 'top'    && 'fixed top-0 left-0 right-0',
			position === 'bottom' && 'fixed bottom-0 left-0 right-0',
			position === 'inline' && 'relative',
			'bg-foreground text-background',
			'$preset',
			klass
		]}
		role="banner"
		aria-live="polite"
		{...restProps}
	>
		<div class="mx-auto flex min-h-10 w-full max-w-screen-xl items-center justify-between gap-4 px-4 py-2">
			{@render children?.({ dismiss })}

			{#if dismissible}
				<button
					type="button"
					onclick={dismiss}
					class="banner-close text-background/70 hover:text-background ml-auto shrink-0 rounded p-1 transition-colors focus-visible:outline-none focus-visible:ring-2"
					aria-label="Dismiss banner"
				>
					<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" aria-hidden="true">
						<path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					</svg>
				</button>
			{/if}
		</div>
	</HtmlAtom>
{/if}
