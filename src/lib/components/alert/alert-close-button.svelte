<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import type { HTMLAttributes } from 'svelte/elements';
	import { AlertBond } from './bond.svelte';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import type { AlertCloseButtonProps } from './types';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	let {
		class: klass = '',
		as = 'button' as E,
		preset = 'alert.close-button',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: AlertCloseButtonProps<E, B> & HTMLAttributes<Element> = $props();

	const isDismissible = $derived(bond?.state.isDismissible ?? false);

	const closeButtonProps = $derived({
		...bond?.closeButton(),
		...restProps
	});
</script>

{#if isDismissible}
	<HtmlAtom
		{as}
		{bond}
		{preset}
		class={[
			'alert-close-button border-border flex items-center justify-center rounded p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10',
			'focus:ring-2 focus:ring-offset-1 focus:outline-none',
			'$preset',
			klass
		]}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		{...closeButtonProps}
	>
		{@render children?.({ alert: bond! })}
		{#if !children}
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		{/if}
	</HtmlAtom>
{/if}
