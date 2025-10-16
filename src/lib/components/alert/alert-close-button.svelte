<script module lang="ts">
	export type AlertCloseButtonProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base
	> = HtmlAtomProps<E, B> & {
		children?: Snippet<[{ alert: AlertBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { AlertBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = HTMLElementTagNameMap[E];

	const bond = AlertBond.get();

	const preset = getPreset('alert.close-button');

	let {
		class: klass = '',
		as = preset?.as ?? ('button' as E),
		base = preset?.base as B,
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
		class={[
			'alert-close-button absolute top-2 right-2 rounded p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10',
			'focus:ring-2 focus:ring-offset-1 focus:outline-none',
			{
				'focus:ring-blue-500': bond?.state.variant === 'info',
				'focus:ring-green-500': bond?.state.variant === 'success',
				'focus:ring-yellow-500': bond?.state.variant === 'warning',
				'focus:ring-red-500': bond?.state.variant === 'error'
			},
			toClassValue.apply(bond, [preset?.class]),
			toClassValue.apply(bond, [klass])
		]}
		onmount={onmount?.bind(bond.state)}
		ondestroy={ondestroy?.bind(bond.state)}
		animate={animate?.bind(bond.state)}
		enter={enter?.bind(bond.state)}
		exit={exit?.bind(bond.state)}
		initial={initial?.bind(bond.state)}
		{as}
		{base}
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
