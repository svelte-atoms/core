<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { Stack } from '../stack';
	import { StepperBond } from './bond.svelte';
	import type { StepperBodyProps } from './types';

	const bond = StepperBond.get();

	let {
		class: klass = '',
		base=Stack.Root,
		children = undefined,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		preset = 'stepper.body' as const,
		...restProps
	}: StepperBodyProps<E, B> = $props();

	const bodyProps = $derived({
		...restProps
	});
</script>

<HtmlAtom
	{preset}
	{bond}
	{base}
	class={['stepper-body w-full', '$preset', klass]}
	onmount={onmount?.bind(bond?.state)}
	ondestroy={ondestroy?.bind(bond?.state)}
	enter={enter?.bind(bond?.state)}
	exit={exit?.bind(bond?.state)}
	initial={initial?.bind(bond?.state)}
	animate={animate?.bind(bond?.state)}
	{...bodyProps}
>
	<!-- Custom body content -->
	{@render children?.({ stepper: bond })}
</HtmlAtom>
