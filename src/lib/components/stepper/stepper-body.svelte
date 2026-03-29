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
	{...bodyProps}
>
	<!-- Custom body content -->
	{@render children?.({ stepper: bond })}
</HtmlAtom>
