<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { PopoverBond } from './bond.svelte';
	import type { PopoverTriggerProps } from './types';

	const bond = PopoverBond.get();

	if (!bond) {
		throw new Error('<PopoverTrigger /> must be used within a <Popover />');
	}

	let {
		class: klass = '',
		as = 'button' as E,
		preset = 'popover.trigger',
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
	{as}
	{bond}
	{preset}
	class={['border-border flex w-fit cursor-pointer rounded-md p-2', '$preset', klass]}
	onmount={onmount?.bind(bond.state)}
	ondestroy={ondestroy?.bind(bond.state)}
	animate={animate?.bind(bond.state)}
	enter={enter?.bind(bond.state)}
	exit={exit?.bind(bond.state)}
	initial={initial?.bind(bond.state)}
	type={as === 'button' ? 'button' : undefined}
	{...triggerProps}
>
	{@render children?.({ popover: bond })}
</HtmlAtom>
