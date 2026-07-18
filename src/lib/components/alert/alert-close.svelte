<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { AlertBond } from './bond.svelte';
	import type { AlertCloseButtonProps } from './types';
	import { Icon } from '../icon';

	type Element = HTMLElementTagNameMap[E];

	let {
		class: klass = '',
		as = 'button' as E,
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertCloseButtonProps<E, B> & HTMLAttributes<Element> = $props();

	const part = usePart(AlertBond, 'closeButton', () => restProps, {
		context: 'optional',
		preset: () => preset
	});
	const bond = part.bond;

	const defaults = $derived({
		type: as === 'button' ? 'button' : undefined,
		role: as === 'button' ? undefined : 'button',
		tabindex: as === 'button' ? undefined : 0
	});
</script>

<HtmlAtom
	{as}
	{bond}
	{defaults}
	class={[
		'alert-close-button border-border flex size-6 items-center justify-center rounded p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10',
		'$preset',
		klass
	]}
	{...part.props}
>
	{#if children}
		{@render children({ alert: bond! })}
	{:else}
		<Icon class="h-full">
			<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</Icon>
	{/if}
</HtmlAtom>
