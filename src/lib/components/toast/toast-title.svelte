<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { ToastBond } from './bond.svelte';
	import type { ToastTitleProps } from './types';

	let {
		as = 'p' as E,
		preset = undefined,
		children = undefined,
		...restProps
	}: ToastTitleProps<E, B> = $props();

	const bond = ToastBond.get();

	const atom = bond?.title();

	const titleProps = $derived({
		preset: preset ?? atom?.preset,
		...(atom?.spread ?? {}),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	{...titleProps}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
