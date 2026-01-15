<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'p', B extends Base = Base">
	import { HtmlAtom as Atom, type Base } from '$svelte-atoms/core/components/atom';
	import { StepBond } from './bond.svelte';
	import type { StepDescriptionProps } from './types';

	const bond = StepBond.get();

	if(!bond) {
		throw new Error('StepDescription must be used within a Step component.');
	}

	let {
		class: klass = '',
		preset = 'stepper.step.description',
		as="p",
		children = undefined,
		...restProps
	}: StepDescriptionProps<E, B> = $props();

	const descriptionProps = $derived({
		...bond?.description(),
		...restProps
	});
</script>

<Atom
	{as}
	{preset}
	class={['text-xs text-muted-foreground', '$preset', klass]}
	{...descriptionProps}
>
	{@render children?.({ step: bond })}
</Atom>
