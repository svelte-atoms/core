<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { usePart } from '$ixirjs/ui/shared';
	import { StepBond } from './bond.svelte';
	import { StepperBond } from '../bond.svelte';
	import type { StepSeparatorProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		children = undefined,
		...restProps
	}: StepSeparatorProps<E, B> = $props();

	const part = usePart(StepBond, 'separator', () => restProps, {
		message: 'StepSeparator must be used within a Step component.',
		preset: () => preset
	});
	const stepperBond = StepperBond.getOrThrow(
		'StepSeparator must be used within a Stepper component.'
	);

	const isVertical = $derived(stepperBond?.props?.orientation === 'vertical');
</script>

<HtmlAtom
	bond={part.bond}
	class={[
		'flex-1 data-[active=true]:bg-primary data-[completed=true]:bg-primary/70',
		isVertical ? 'h-8 w-0.5 mx-auto' : 'h-0.5 w-full my-auto',
		'bg-border',
		'$preset',
		klass
	]}
	{...part.props}
>
	{@render children?.({ step: part.bond })}
</HtmlAtom>
