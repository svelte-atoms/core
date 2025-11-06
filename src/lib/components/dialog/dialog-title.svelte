<script module lang="ts">
	export type DialogTitleProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DialogBond } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

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
