<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepperBond } from './bond.svelte';
	import type { StepperContentProps } from './types';

	const bond = StepperBond.get();

	let {
		class: klass = '',
		children = undefined,
		preset = 'stepper.content' as const,
		...restProps
	}: StepperContentProps<E, B> = $props();
	
	const activeStep = $derived(bond?.state?.getStep(bond?.state?.props?.step));
	const activeStepContent = $derived(bond?.state?.activeStepContent);

	const contentKlass = $derived(activeStepContent?.props.class)
	const contentProps = $derived.by(()=> {
		const { class: klass, ...restContentProps } = activeStepContent?.props ?? {};
		return {
			...restContentProps,
			...restProps
		}
	});


</script>

{#if activeStepContent}
	{#key activeStepContent}
		<HtmlAtom
			{preset}
			{bond}
			class={['stepper-content w-full', '$preset', contentKlass, klass]}
			{...contentProps}
		>
			<!-- Render teleported step content -->
			{@render activeStepContent.children({ step: activeStep })}

			<!-- Optional custom content wrapper -->
			<!-- {@render children?.({ stepper: bond })} -->
		</HtmlAtom>
	{/key}
{/if}
