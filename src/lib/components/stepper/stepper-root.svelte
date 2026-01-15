<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { defineProperty, defineState } from '$svelte-atoms/core/utils';
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepperBond, StepperState, type StepperStateProps } from './bond.svelte';
	import type { StepperRootProps } from './types';
	import type { Factory } from '$svelte-atoms/core/types';

	let {
		step = $bindable(0),
		linear = false,
		disabled = false,
		class: klass = '',
		children = undefined,
		factory = _factory as Factory<StepperBond>,
		onmount = undefined,
		ondestroy = undefined,
		animate = undefined,
		enter = undefined,
		exit = undefined,
		initial = undefined,
		preset = 'stepper' as const,
		...restProps
	}: StepperRootProps<E, B> = $props();

	const bondProps = defineState<StepperStateProps>([
		defineProperty(
			'step',
			() => step,
			(v) => {
				step = v;
			}
		),
		defineProperty('linear', () => linear),
		defineProperty('disabled', () => disabled)
	]);
	const bond = factory(bondProps).share();

	const rootProps = $derived({
		...bond.root(),
		...restProps
	});

	function _factory(props: typeof bondProps = bondProps) {
		const bondState = new StepperState(() => props);
		return new StepperBond(bondState);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom
	{preset}
	{bond}
	class={['flex flex-col', '$preset', klass]}
	{...rootProps}
>
	{@render children?.({ stepper: bond })}
</HtmlAtom>
