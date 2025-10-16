<script module lang="ts">
	export type DialogBodyProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<E, B>;
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { DialogBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const preset = getPreset('dialog.body');

	let {
		class: klass,
		as = preset?.as ?? ('div' as E),
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: DialogBodyProps<E, B> = $props();

	const bond = DialogBond.get();

	const bodyProps = $derived({
		...bond?.body({}),
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'px-4 py-2',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	{...bodyProps}
>
	{@render children?.({ dialog: bond })}
</HtmlAtom>
