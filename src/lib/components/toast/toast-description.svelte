<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { ToastBond } from './bond.svelte';
	import type { ToastDescriptionProps } from './types';

	let {
		class: klass = '',
		as = 'p' as E,
		preset = 'toast.description',
		children = undefined,
		...restProps
	}: ToastDescriptionProps<E, B> = $props();

	const bond = ToastBond.get();

	const descriptionProps = $derived({
		...(bond?.description().spread ?? {}),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	{preset}
	class={['$preset', klass]}
	{...descriptionProps}
>
	{@render children?.({ toast: bond })}
</HtmlAtom>
