<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'h2', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { DialogBond } from './bond.svelte';
	import type { DialogTitleProps } from './types';

	let {
		class: klass = '',
		as = 'h3' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DialogTitleProps<E, B> = $props();

	const bond = DialogBond.get();

	const titleProps = $derived({
		...bond?.title({}),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{bond}
	preset="dialog.title"
	class={['border-border', '$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...titleProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
