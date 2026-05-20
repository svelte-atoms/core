<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h2', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond } from './bond.svelte';
	import type { DialogTitleProps } from './types';

	let {
		class: klass = '',
		as = 'h3' as E,
		children = undefined,
		...restProps
	}: DialogTitleProps<E, B> = $props();

	const bond = DialogBond.get();

	const titleProps = $derived({
		...bond?.title().spread,
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="dialog.title"
	class={['border-border', '$preset', klass]}
	{...titleProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
