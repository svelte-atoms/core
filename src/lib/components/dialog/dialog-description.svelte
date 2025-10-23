<script module lang="ts">
	export type DialogDescriptionProps<
		T extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<T, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { DialogBond } from './bond.svelte';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	let {
		class: klass = '',
		as = 'p' as E,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DialogDescriptionProps<E, B> = $props();

	const bond = DialogBond.get();

	const descriptionProps = $derived({
		...bond?.description({}),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	preset="dialog.description"
	class={['$preset', klass]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...descriptionProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
