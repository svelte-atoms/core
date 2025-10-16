<script module lang="ts">
	export type TreeHeaderProps<
		E extends keyof HTMLElementTagNameMap = 'div',
		B extends Base = Base
	> = HtmlAtomProps<E, B> & {
		class?: string;
		open?: boolean;
		disabled?: boolean;
		children?: Snippet<[{ tree: TreeBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { TreeBond } from './bond.svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';
	import { getPreset } from '$svelte-atoms/core/context';

	type Element = HTMLElementTagNameMap[E];

	const bond = TreeBond.get();

	const preset = getPreset('tree.header');

	let {
		class: klass = '',
		as = preset?.as ?? 'div',
		base = preset?.base as B,
		children = undefined,
		onpointerdown = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: TreeHeaderProps<E, B> & HTMLAttributes<Element> = $props();

	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});

	function handlePointerDown(ev: PointerEvent) {
		onpointerdown?.(ev);

		if (ev.defaultPrevented) {
			return;
		}

		bond?.state.toggle();
	}
</script>

<HtmlAtom
	class={[
		'cursor-pointer',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	onpointerdown={handlePointerDown}
	{as}
	{base}
	{...headerProps}
>
	{@render children?.({ tree: bond })}
</HtmlAtom>
