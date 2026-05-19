<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { ToastBond } from './bond.svelte';
	import type { ToastTitleProps } from './types';

	let {
		class: klass = '',
		as = 'p' as E,
		preset = 'toast.title',
		children = undefined,
		...restProps
	}: ToastTitleProps<E, B> = $props();

	const bond = ToastBond.get();

	const titleProps = $derived({
		...(bond?.title().spread ?? {}),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	{preset}
	class={['$preset', klass]}
	{...titleProps}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
