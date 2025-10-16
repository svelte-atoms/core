<script module lang="ts">
	export type SlideoverBackdropProps<
		E extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		as?: E;
		class?: string;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { HTMLAttributes } from 'svelte/elements';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { DrawerBond } from './bond.svelte';

	type Element = HTMLElementTagNameMap[E];

	const bond = DrawerBond.get();
	const preset = getPreset('drawer.backdrop');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: SlideoverBackdropProps<E, B> & HTMLAttributes<Element> = $props();

	const backdropProps = $derived({
		...restProps
	});
</script>

<HtmlAtom
	{as}
	{base}
	class={[
		'absolute inset-0 z-0 bg-black/30',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	{...backdropProps}
/>
