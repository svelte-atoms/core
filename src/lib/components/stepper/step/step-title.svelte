<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepBond } from './bond.svelte';
	import type { StepTitleProps } from './types';

	const bond = StepBond.get();

	if(!bond) {
		throw new Error('StepTitle must be used within a Step component.');
	}

	let {
		class: klass = '',
		preset = 'stepper.step.title',
		children = undefined,
		...restProps
	}: StepTitleProps<E, B> = $props();


	const titleProps = $derived({
		...bond?.title(),
		...restProps
	});
</script>

<Atom
	as="div"
	{preset}
	class={['font-medium text-sm', '$preset', klass]}
	{...titleProps}
>
	{@render children?.({ step: bond })}
</Atom>
