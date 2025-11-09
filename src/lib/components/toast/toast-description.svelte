<script lang="ts" generics="T extends keyof HTMLElementTagNameMap">
	import type { HTMLAttributes } from 'svelte/elements';
	import { HtmlAtom } from '$svelte-atoms/core/components/atom';
	import type { ToastDescriptionProps } from './types';
	import { ToastBond } from './bond';
	export type { ToastDescriptionProps } from './types';

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
