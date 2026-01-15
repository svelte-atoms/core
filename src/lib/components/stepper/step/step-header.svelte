<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepBond } from './bond.svelte';
	import type { StepHeaderProps } from './types';

	const bond = StepBond.get();

	if(!bond) {
		throw new Error('StepHeader must be used within a Step component.');
	}

	let {
		class: klass = '',
		preset = 'stepper.step.header',
		children = undefined,
		...restProps
	}: StepHeaderProps<E, B> = $props();


	const headerProps = $derived({
		...bond?.header(),
		...restProps
	});
</script>

<Atom
	as="div"
	{bond}
	{preset}
	class={['font-medium text-sm flex flex-col', '$preset', klass]}
	{...headerProps}
>
	{@render children?.({ step: bond })}
</Atom>
