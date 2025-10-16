<script module lang="ts">
	export type PopoverTriggerProps<
		T extends keyof HTMLElementTagNameMap,
		B extends Base = Base
	> = HtmlAtomProps<T, S> & {
		children?: Snippet<[{ popover?: PopoverBond }]>;
	};
</script>

<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import type { Snippet } from 'svelte';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import { PopoverBond } from './bond.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { HtmlAtom, type HtmlAtomProps, type Base } from '$svelte-atoms/core/components/atom';

	const bond = PopoverBond.get();

	if (!bond) {
		throw new Error('');
	}

	const preset = getPreset('popover.trigger');

	let {
		class: klass = '',
		as = preset?.as ?? ('button' as E),
		base = preset?.base as B,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		...restProps
	}: PopoverTriggerProps<E, B> = $props();

	const triggerProps = $derived({
		...bond.trigger(),
		...restProps
	});
</script>

<HtmlAtom
	class={[
		'flex w-fit cursor-pointer rounded-md p-2',
		toClassValue.apply(bond, [preset?.class]),
		toClassValue.apply(bond, [klass])
	]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	type={as === 'button' ? 'button' : undefined}
	{as}
	{base}
	{...triggerProps}
>
	{@render children?.({ popover: bond })}
</HtmlAtom>
