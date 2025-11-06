<script module lang="ts">
	export type ToastDescriptionProps<T extends keyof HTMLElementTagNameMap> = HtmlAtomProps<T> & {
		as?: T;
		children?: Snippet<[{ toast?: ToastBond }]>;
	};
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { ToastBond } from './bond';
	import { HtmlAtom, type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

	const bond = ToastBond.get();

	let {
		as = 'p' as T,
		class: klass = '',
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ToastDescriptionProps<T> & HTMLAttributes<HTMLElementTagNameMap[T]> = $props();
</script>

<HtmlAtom
	{as}
	{bond}
	preset="toast.description"
	class={['border-border', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...bond?.title(restProps)}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
