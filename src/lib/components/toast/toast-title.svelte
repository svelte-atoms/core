<script module lang="ts">
	export type ToastTitleProps<T extends keyof HTMLElementTagNameMap> = HtmlAtomProps<T> & {
		as?: T;
		class?: string;
		children?: Snippet<[{ toast: ToastBond }]>;
	};
</script>

<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { ToastBond } from './bond';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps } from '$svelte-atoms/core/components/atom';

	const bond = ToastBond.get();

	let {
		as = 'div' as T,
		class: klass = '',
		base = undefined,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: ToastTitleProps<T> & HTMLAttributes<HTMLElementTagNameMap[T]> = $props();
</script>

<HtmlAtom
	{as}
	{base}
	class={[toClassValue.apply(bond, [klass])]}
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
