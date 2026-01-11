<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { type Base } from '$svelte-atoms/core/components/atom';
	import { StepBond } from './bond.svelte';
	import { StepperBond } from '../bond.svelte';
	import type { StepContentProps } from './types';

	const stepBond = StepBond.get();
	const stepperBond = StepperBond.get();

	let {
		class: klass = '',
		children = undefined,
		preset = 'stepper.step.content' as const,
		...restProps
	}: StepContentProps<E, B> = $props();

	const contentProps = $derived({
		class: klass,
		preset,
		...restProps
	});

	// Register content snippet with props and children with stepper on mount
	$effect(() => {
		if (stepBond && stepperBond && children) {
			const index = stepBond.state.props.index;
			stepperBond.state.registerStepContent(index, contentProps, children);

			return () => {
				stepperBond.state.unregisterStepContent(index);
			};
		}
	});
</script>

<!-- Content is teleported to Stepper.Content, so we don't render anything here -->
