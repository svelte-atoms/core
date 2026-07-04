<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { mergeAtomProps, HtmlAtom, type Base } from '$svelte-atoms/core/components/atom';
	import { createAtomInstance } from '$svelte-atoms/core/shared/bond';
	import { AlertBond, AlertDescriptionAtom } from './bond.svelte';
	import type { AlertDescriptionProps } from './types';

	const bond = AlertBond.get();

	let {
		class: klass = '',
		as = 'p' as E,
		preset = undefined,
		children = undefined,
		...restProps
	}: AlertDescriptionProps<E, B> = $props();

	const atom = createAtomInstance<AlertDescriptionAtom, AlertBond>('description', {
		bond,
		factory: (owner) => new AlertDescriptionAtom(owner).role('description')
	});

	const descriptionProps = $derived(mergeAtomProps(atom, preset, restProps));
</script>

<HtmlAtom
	{bond}
	class={['alert-description border-border mt-1 text-sm leading-relaxed', '$preset', klass]}
	{as}
	{...descriptionProps}
>
	{@render children?.({ alert: bond! })}
</HtmlAtom>
