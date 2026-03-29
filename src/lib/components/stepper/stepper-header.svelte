<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepperBond } from './bond.svelte';
	import type { StepperHeaderProps } from './types';

	const bond = StepperBond.get();

	let {
		class: klass = '',
		children = undefined,
		preset = 'stepper.header' as const,
		...restProps
	}: StepperHeaderProps<E, B> = $props();

	const headerProps = $derived({
		...restProps
	});
</script>

<HtmlAtom
	{preset}
	{bond}
	class={['stepper-header w-full', '$preset', klass]}
	{...headerProps}
>
	{@render children?.({ stepper: bond })}
</HtmlAtom>
