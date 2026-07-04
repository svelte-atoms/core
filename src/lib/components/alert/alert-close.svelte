<script
	lang="ts"
	generics="E extends keyof HTMLElementTagNameMap = 'button', B extends Base = Base"
>
	import type { HTMLAttributes } from 'svelte/elements';
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import { AlertBond, AlertCloseAtom } from './bond.svelte';
	import type { AlertCloseButtonProps } from './types';
	import { Icon } from '../icon';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	let {
		class: klass = '',
		as = 'button' as E,
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertCloseButtonProps<E, B> & HTMLAttributes<Element> = $props();

	const atom = createAtomInstance<AlertCloseAtom, AlertBond>('close', {
		bond,
		factory: (owner) => new AlertCloseAtom(owner)
	});

	const defaults = $derived({
		type: as === 'button' ? 'button' : undefined,
		role: as === 'button' ? undefined : 'button',
		tabindex: as === 'button' ? undefined : 0
	});
	const closeButtonProps = $derived(mergeAtomProps(atom, preset, restProps));
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
	{...closeButtonProps}
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
